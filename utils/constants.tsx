import { PaginationDevice } from "@/types/pagination";

export const BASE_API: string = 'https://api.jikan.moe/v4';

export const DAYS_OF_THE_WEEK: string[] = ['sunday', 'monday', 'tuesday', 'wednesday' , 'thursday', 'friday', 'saturday', 'sunday'];

export const PAGE_LIMIT: number = 10;

export const PAGINATION_DEVICE: PaginationDevice = {
    desktop: {
        breakpoint: 980,
        count: 10
    },
    smallDesktop: {
        breakpoint: 979,
        count: 7
    },
    tablet: {
        breakpoint: 800,
        count: 5
    },
    mobile: {
        breakpoint: 480,
        count: 3
    },
    smallMobile: {
        breakpoint: 320,
        count: 2
    }
}
