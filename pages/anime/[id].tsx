import { formatAiringDate, filterByType, join, linkJoin } from '../../utils/utils';
import { PathParams, Props } from '@/types/common';
import { SingleEntry } from '@/types/details';
import Image from 'next/image'
import Link from 'next/link';
import { getAnime, getAnimeById } from '@/utils/api';

type PageProps = {
    anime: SingleEntry
}

export const getStaticPaths = async() => {
    const promise = await getAnime();
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
    const promise = await getAnimeById(id);
    const response = await promise.json();

    if(response.error){
        return {
            notFound: true
        }
    }

    return {
        props: {
            anime: response?.data || {}
        },
        revalidate: 10
    }
}

const Anime = ({anime}: PageProps) => {
    return anime && (
        <div className="details bg-slate-950 p-6 py-12 min-h-screen">
            <div className="container max-w-6xl mx-auto py-4">

                <h3 className="text-3xl font-bold pb-4 title title-border border-gray-700">{anime.title}</h3>

                <div className="details-container flex">
                    <div className="details-sidebar w-72 mr-7 mb-7">
                        <div className="details-img">
                            <Image src={anime.images?.jpg?.large_image_url} width={250} height={405} alt="" className="featured-img w-full border-white rounded border border-violet-900" unoptimized/>
                        </div>

                        <ul className="details-info p-5 box-border text-sm">
                            <li>
                                <span className="font-bold">Title(s): </span>
                                {anime.titles && filterByType(anime.titles, ['Default', 'Japanese']).map((v: Props) => v.title).join(', ')}
                            </li>
                            <li><span className="font-bold">Status: </span> {anime.status}</li>
                            <li><span className="font-bold">Aired: </span> {anime.aired?.from
                                ? formatAiringDate(anime)
                                : ''} - {anime.aired?.to ? formatAiringDate(anime, 'to') : '??'}
                            </li>
                            <li><span className="font-bold">Type: </span>{anime.type}</li>
                            <li><span className="font-bold">Episodes: </span>{anime.episodes}</li>
                            <li><span className="font-bold">Duration: </span>{anime.duration}</li>
                            <li><span className="font-bold">Genres: </span>{linkJoin(anime.genres, '/genre/')}</li>
                            <li><span className="font-bold">Themes: </span>{linkJoin(anime.themes, '/genre/')}</li>
                            <li><span className="font-bold">Producer(s): </span>{join(anime.producers)}</li>
                            <li><span className="font-bold">Studios: </span>{join(anime.studios)}</li>
                            <li><span className="font-bold">Licensors: </span>{join(anime.licensors)}</li>
                            <li><span className="font-bold">Rating Type: </span>{anime.rating}</li>
                            <li><span className="font-bold">Score: </span>{anime.popularity}</li>
                            <li><span className="font-bold">Favorites: </span>{anime.favorites}</li>
                        </ul>
                    </div>

                    <div className="details-content content p-9 w-3/4 border border-gray-700">
                       
                        <h3 className="text-3xl font-bold pb-4 title border-gray-700">Sypnosis</h3>

                        <div className="sypnosis leading-normal">{anime.synopsis}</div>

                        <div className="pt-10">
                            <h3 className="text-3xl font-bold pb-8">Trailer</h3>
                            <iframe width="100%" height="450" src={`https://www.youtube.com/embed/${anime.trailer?.youtube_id}`} title={anime.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                        </div>

                        <fieldset className="mt-10 border border-solid border-gray-700 p-5 pt-2 pb-4 rounded">
                            <legend className="text-2xl font-bold px-3">Related info</legend>

                            <div className="related-links text-sm">
                                {anime?.relations?.map((values, i) => (
                                    <div key={i} className="mb-1">
                                        <span className="font-bold">{values.relation}: </span>
                                        <span>{values?.entry?.map((item, index) => 
                                                item.type === 'anime' ? (
                                                    <Link key={index} href={`/anime/${item.mal_id}`}>{item.name}</Link>
                                                ) : 'Manga'
                                        )}</span>
                                    </div>
                                ))}
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Anime;