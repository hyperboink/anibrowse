import { PaginationControl } from '@/types/pagination';
import { PathParams } from '@/types/common';
import { SingleEntry } from '@/types/details';
import PaginatedPage from '@/components/PaginatedPage';
import { getTopRated } from '@/utils/api';

type PageProps = {
    results: {
        data: SingleEntry[],
        pagination: PaginationControl,
        id: number,
        loading: boolean
    }
}

export const getStaticPaths = async() => {
    const promise = await getTopRated();
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
    const promise = await getTopRated(id);
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

const TopRated = ({results}: PageProps) => {
    return <PaginatedPage title="Top Rated Anime" results={results}/>
}

export default TopRated;