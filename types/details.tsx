export type Genres = {
    mal_id: number,
    name: string,
    type: string,
    url: string,
}

export type Relations = {
    relation: string,
    entry: {
        mal_id: number,
        name: string,
        type: string,
    }[],
}

export type SingleEntry = {
    mal_id: number,
    title: string,
    images: {
        jpg: {
            image_url: string,
            large_image_url: string
        }
    },
    type: string,
    titles: [],
    aired: any,
    synopsis: string,
    status: string,
    airing: boolean,
    duration: string,
    episodes: number,
    themes: [],
    genres: [],
    producers: [],
    studios: [],
    licensors: [],
    relations: Relations[],
    rating: number,
    score: number
    popularity: number,
    favorites: number,
    trailer: {
        youtube_id: string
    }
}

export type Entries = {
    data: SingleEntry[]
}