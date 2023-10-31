import React, { useContext } from 'react'
import Link from 'next/link';
import { PageContext } from '@/context/PageContext';
import { range, debounce, media } from '@/utils/utils';
import { PAGE_LIMIT, PAGINATION_DEVICE } from '@/utils/constants';
import { useState, useEffect } from 'react';
import { Breakpoints, PaginationProps } from '@/types/pagination';
import { PageContextProps } from '@/types/common';

export default function Pagination({data}: PaginationProps) {
    const [limit, setLimit] = useState(PAGE_LIMIT);
    const { loading }: PageContextProps = useContext(PageContext);

    const paginationResponsive = () => {
        const { responsiveNav } = data;
        const responsiveNavLimit: Breakpoints = responsiveNav || {};

        for(let device in PAGINATION_DEVICE){
            console.log(device === 'desktop');
            media(`(${device === 'desktop' ? 'min' : 'max'}-width: ${PAGINATION_DEVICE[device].breakpoint}px)`, () => {
                setLimit(responsiveNavLimit[device] || PAGINATION_DEVICE[device].count);
            });
        }
    }

    const paginationResize = () => {
        paginationResponsive();

        if(typeof window !== "undefined"){
            window.addEventListener('resize', debounce(paginationResponsive, 200));
    
            return () => {
                window.removeEventListener('resize', debounce(paginationResponsive, 200));
            }
        }
        
    }

    useEffect(() => {
        paginationResize();
    }, [limit]);

    const id = data?.id || '';
    const currentIndex = parseInt(data.pageId);
    let paginationTotal = data.totalPages;
    const moveTrigger = Math.ceil(limit / 2);
    const offset = currentIndex + moveTrigger;

    const paginationLink = () => {

        let minActive = currentIndex - (limit - 2);
        let maxActive = (currentIndex) + moveTrigger;

        if(currentIndex < moveTrigger){
            minActive = 1;
            maxActive = limit;
        }

        if(currentIndex >= 5){
            minActive = (currentIndex + 1) - moveTrigger;
            maxActive = currentIndex + moveTrigger;
        }

        if(offset >= paginationTotal){
            minActive = (paginationTotal + 1) - limit;
            maxActive = paginationTotal;
        }

        if(limit > paginationTotal){
            minActive = 1;
            maxActive = paginationTotal;
        }

        return range(minActive, maxActive).map((num: number) =>
            <li key={num} >
                <Link href={`${data.baseLink}${id ? '/' + id : ''}/${num}`} className={`page-item relative block rounded text-white px-2 py-1.5 text-sm mx-1 ${currentIndex} ${num} ${currentIndex === num ? 'current': ''}`}>{num}</Link>
            </li>
        )
    }
    
    return (
        
        <ul className={`pagination list-style-none flex ${loading ? 'pointer-events-none' : ''}`}>

            {paginationTotal ? (
                <>
                    {currentIndex !== 1 ? (
                        <>
                            <li>
                                <Link href={`${data.baseLink}${id && ('/' + id)}/1`} className="first control relative block rounded text-white px-2 py-1.5 text-sm transition-all duration-300 mx-1">{'<<'}</Link>
                            </li>
                            <li>
                                <Link className='prev control relative block rounded text-white px-2 py-1.5 text-sm transition-all duration-300 mx-1' href={`${data.baseLink}${id ? '/' + id : ''}/${(currentIndex - 1)}`}>{'<'}</Link>
                            </li>
                        </>
                    ) : ''}

                    {paginationLink()}

                    {currentIndex < paginationTotal ? (
                        <>
                            <li>
                                <Link className='next control relative block rounded text-white px-2 py-1.5 text-sm transition-all duration-300 bg-gray-800 mx-1 text-white' href={`${data.baseLink}${id ? '/' + id : ''}/${currentIndex + 1}`}>{'>'}</Link>
                            </li>
                            <li>
                                <Link href={`${data.baseLink}${id ? '/' + id : ''}/${paginationTotal}`} className="last control relative block rounded text-white px-2 py-1.5 text-sm transition-all duration-300 mx-1">{'>>'}</Link>
                            </li>
                        </>
                    ) : ''}
        
                </>
            ) : ''}
        </ul>
        
    )
}
