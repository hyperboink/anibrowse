import Link from "next/link";
import { slug } from "@/utils/utils";
import { getGenres } from "@/utils/api";

type PageProps = {
    results: {
        data: {
            mal_id: number,
            name: string,
            count: number
        }[]
    }
}

export const getStaticProps = async() => {
    const promise = await getGenres();
    const response = await promise.json();

    return {
        props: {
            results: response
        }
    }
}

export default function GenreLinks({results}: PageProps) {
  return (
    <div className="bg-slate-950 p-6 py-12">
      <div className="container max-w-6xl mx-auto py-4">
            <div className='title-wrap flex justify-between'>
                <h3 className="self-start text-3xl font-bold pb-8 capitalize">Genres</h3>
            </div>

            <div>
                <ul className="list-genres p-6 grid grid-cols-5 gap-7">
                    {results?.data?.map((genre) => (
                        <li key={genre.mal_id}>
                            <Link href={`/genre/${slug(genre.name)}/1`} className="link hover:text-white">{genre.name} ({genre.count})</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
  )
}
