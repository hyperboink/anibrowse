export type PageContextProps = {
    loading?: boolean
}

export type Props = {
    id: number,
    mal_id: number,
    name: string,
    title: string,
    type: string,
}

export type PathParams = {
    params: {
        id: number,
        pageNum: number,
        slug: string[]
    }
}

export type Func = () => void;