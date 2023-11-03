import { PaginationControl } from '@/types/pagination';
import { PathParams } from '@/types/common';
import { SingleEntry } from '@/types/details';
import PaginatedPage from '@/components/PaginatedPage';
import { getUpcoming } from '@/utils/api';
import { REVALIDATION_TIME } from '@/utils/constants';

type PageProps = {
    results: {
        data: SingleEntry[],
        pagination: PaginationControl,
        id: number
    }
}

export const getStaticPaths = async() => {
    const promise = await getUpcoming();
    const response = await promise.json();

    const paths = response?.data?.map((anime: SingleEntry) => {
        return {
            params: {
                id: anime.mal_id.toString()
            }
        }
    }) || [];

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async(context: PathParams) => {
    const id = context?.params?.id.toString() || '1';
    const promise = await getUpcoming(id);
    const response = await promise.json();
    const results = {...context.params, ...response};

    if(response?.pagination?.last_visible_page < id){
        return {
            notFound: true
        }
    }

    return {
        props: {
            results,
        },
        revalidate: REVALIDATION_TIME
    }
}

const Upcoming = ({results}: PageProps) => {
    return <PaginatedPage title="Upcoming Anime" results={results}/>
}

export default Upcoming;