import { PaginationControl } from '@/types/pagination';
import { PathParams } from '@/types/common';
import { SingleEntry } from '@/types/details';
import PaginatedPage from '@/components/PaginatedPage';
import { getSeason } from '@/utils/api';

type PageProps = {
    results: {
        data: SingleEntry[],
        pagination: PaginationControl,
        id: number
    }
}

export const getStaticPaths = async() => {
    const promise = await getSeason();
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
    const promise = await getSeason(id);
    const response = await promise.json();
    const results = {...context.params, ...response};

    if(response?.pagination?.last_visible_page < id){
        return {
            notFound: true
        }
    }

    return {
        props: {
            results
        },
        revalidate: 10
    }
}

const SeasonNow = ({results}: PageProps) => {
    return <PaginatedPage title="Latest Season Release" results={results}/>
}

export default SeasonNow;