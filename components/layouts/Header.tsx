import { Func } from "@/types/common";
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { useState } from "react";

export default function Header() {
    const [search, setSearch] = useState('');
    const router = useRouter();

    const searchHandler = (e: {preventDefault: Func}) => {
        e.preventDefault();
        router.push(`/search/${search}/1`);
    }

    return (
        <div className="header">
            <div className="navigation">
                <ul className="block content-center justify-center font-bold pt-5">
                    <li><Link href="/">HOME</Link></li>
                    <li><Link href="/season/1">LATEST</Link></li>
                    <li><Link href="/upcoming/1">UPCOMING</Link></li>
                    <li><Link href="/top-rated/1">TOP RATED</Link></li>
                    <li><Link href="/genres">GENRES</Link></li>
                </ul>
            </div>

            <div className="text-center pt-20 pb-10">
                <h2 className="font-extrabold text-4xl">Browse Anime</h2>

                <p className="my-4">Enter anime title here</p>

                <div className="search-wrap relative text-gray-600 w-96 m-auto">
                    <form onSubmit={searchHandler}>
                        <input type="text" name="search" placeholder='Example: "One Piece" or "Naruto"' className="search bg-white py-2 px-5 pr-10 rounded-full text-gray-600 focus:outline-none w-full" onChange={(e)=>{setSearch(e.target.value)}}/>
                        <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </button>
                    </form>
                </div>

                
            </div>

            
        </div>
    )
}
