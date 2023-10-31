import Link from "next/link";
import { SingleEntry } from "@/types/details";
import { Func } from "@/types/common";

export const slug = (value: string) => value.replace(' ', '-').toLocaleLowerCase();

export const debounce = (fn: any, ms: number) => {
    let timer: any;

    return () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null
            fn.apply(this, fn)
        }, ms)
    };
}

export const range = (start: number, end: number) => {
    var nums = [];

    for (let i = start; i <= end; i++) {
        nums.push(i);
    }

    return nums;
}

export const media = (value: string, fn: Func) => {
    if (typeof fn === 'function' &&
        typeof window !== "undefined" &&
        window.matchMedia(value).matches) fn();
}

export const filterByType = (data: [] = [], keys: string[] = []) => data.filter((v: {type: string}) => keys.includes(v.type));

export const formatAiringDate = (obj: SingleEntry, type = 'from', separator = '/') => 
    `${obj.aired.prop[type].month}${separator}${obj.aired.prop[type].day}${separator}${obj.aired.prop[type].year}`;

export const join = (array: [] = [], key: string = 'name', separator: string = ', ') => array.map((v) => v[key]).join(separator);

export const linkJoin = (array: [] = [], baseLink: string = '', key: string = 'name', separator: string = ', ') => array.map((v: Record<string, string>, i) => (
    <span key={i}><Link href={`${baseLink}${slug(v[key])}/${v.mal_id}/1`}>{v[key]}</Link>{array.length !== (i + 1) ? separator : ''}</span>
));

export const rating = (value: number) => (value / 2);