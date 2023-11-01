import Link from 'next/link';
import Image from 'next/image';
import Pagination from '@/components/Pagination';
import Star from '@/components/Star';
import { rating, slug } from '../../utils/utils';
import { PaginationPropsWithOpts, PaginationControl } from '@/types/pagination';
import { PathParams, Props } from '@/types/common';
import { SingleEntry } from '@/types/details';
import { getGenre } from '@/utils/api';
import { INITIAL_GENRE } from '@/utils/constants';

type PageProps = {
    anime: {
        data: SingleEntry[],
        slug: string[],
        pagination: PaginationControl
    }
}

export const getStaticPaths = async() => {
    const promise = await getGenre('1', '1');
    const response = await promise.json();

    const paths = response?.data?.map(() => {
        return {
            params: {
                slug: ['action', '1', '1']
            }
        }
    }) || [];

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async(context: PathParams) => {
    const { slug } = context.params;
    const promise = await getGenre(slug[1]|| '1', slug[2] || '1');
    const response = await promise.json();
    const anime = {...context.params, ...response};

    if(response?.pagination?.last_visible_page < slug[2]){
        return {
            notFound: true
        }
    }

    return {
        props: {
            anime: anime,
        },
        revalidate: 10
    }
}

const Genre = ({anime}: PageProps) => {
    const paginationOpts: PaginationPropsWithOpts = {
        totalPages: anime.pagination?.last_visible_page,
        baseLink: `/genre/${slug(anime.slug[0])}`,
        name: slug(anime.slug[0]),
        id: anime.slug[1] || '1',
        pageId: anime.slug[2] || '1',
        responsiveNav: {
            desktop: 10,
            smallDesktop: 7,
            tablet: 5,
            mobile: 3,
        }
    };

    return (
        <div className="bg-slate-950 p-6 py-12">
            <div className="container max-w-6xl mx-auto py-4">
                <div className='title-wrap flex justify-between'>
                    <h3 className="self-start text-3xl font-bold pb-8 capitalize">{anime.slug[0]} Animes</h3>

                    <div className="pagination-wrap mb-10">
                        <Pagination data={paginationOpts}/>
                    </div>
                </div>

                <div className="card-con grid grid-cols-5 gap-7">
                    {anime?.data?.map((data) => (
                        <div key={data.mal_id}  className="anime-cards">
                            <Link href={`/anime/${data.mal_id}`}>
                                <div className="list-image">
                                    <Image src={data.images?.jpg?.image_url} width={200} height={300} alt="" className="list-image w-full rounded-md border-white"/>
                                </div>

                                <div className="title font-bold pt-4 text-2xl">{data.title}</div>
                            </Link>

                            <div className="badge-genre pt-2 pb-1">
                                {data.genres.map((genre: Props, i: number) => (
                                    <Link href={`/genre/${slug(genre.name)}/${genre.mal_id}`} key={i} className="inline-flex items-center justify-center px-2 mr-1 py-1 text-xs font-bold leading-none text-red-100 bg-purple-800 rounded-md">{genre.name}</Link>
                                ))}
                            </div>

                            <div className="ratings flex items-baseline pt-2">
                                <div className="score mr-2 font-bold text-2xl">{data.score?.toFixed(2) || 'NA'}</div>
                                
                                <div className="stars flex items-baseline space-x-1">
                                    {data?.score && [...Array(5)].map((x, i) => {
                                        let index = i + 1;
                                        let floorRating = Math.floor(rating(data.score));

                                        return (
                                            <svg key={index} xmlns="http://www.w3.org/2000/svg" className="rating-star text-yellow-500 w-5 h-auto fill-current" viewBox="0 0 16 16">

                                            {floorRating + 1 === index ? (
                                                <path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z" />
                                            ) : floorRating >= index ? (
                                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                            ) : (
                                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                            )}
                                        </svg>
                                        )
                                    }) || <Star display={5}/>}

                                </div>     
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Genre;