export type PaginationPropsWithOpts = PaginationProps | PaginationOptions;

export type PaginationProps = {
    data:  {
        pagination?: PaginationControl,
        totalPages: number,
        baseLink: string,
        name: string,
        id: string,
        pageId: string,
        responsiveNav: Breakpoints
    },
}

export type PaginationItems = {
    count: number,
    total: number,
    per_page: number
}

export type PaginationOptions = {
    totalPages: number,
    baseLink: string,
    name: string,
    id: string,
    pageId: string,
    responsiveNav: Breakpoints
}

export type PaginationControl = {
    last_visible_page: number,
    has_next_page: boolean,
    current_page: number,
    items: PaginationItems
}

export type PaginationDeviceProps = {
    breakpoint: number;
    count: number;
}

export type PaginationDevice = {
    [key: number]: {
        breakpoint?: number,
        count?: number,
    },
    desktop?: PaginationDeviceProps,
    smallDesktop?: PaginationDeviceProps,
    tablet?: PaginationDeviceProps,
    smallTablet?: PaginationDeviceProps,
    mobile?: PaginationDeviceProps,
    smallMobile?: PaginationDeviceProps,
}


export type Breakpoints = {
    [key: string]: any,
    desktop?: number,
    smallDesktop?: number,
    tablet?: number,
    mobile?: number,
    smallMobile?: number
}