import { BASE_API } from "./constants";

export const getAnime = async() => await fetch(`${BASE_API}/anime`);

export const getAnimeById = async(id: string) => await fetch(`${BASE_API}/anime${id && '/' + id}/full`);

export const getGenre = async(id: string, pageId: string) => await fetch(`${BASE_API}/anime?genres=${id}&page=${pageId}`);

export const getGenres = async() => await fetch(`${BASE_API}/genres/anime`);

export const getSeason = async(id: string = '') => await fetch(`${BASE_API}/seasons/now${id && '?&page=' + id}`);

export const getTopRated = async(id: string = '') => await fetch(`${BASE_API}/top/anime${id && '?&page=' + id}`);

export const getUpcoming = async(id: string = '') => await fetch(`${BASE_API}/seasons/upcoming${id && '?&page=' + id}`);

export const getAnimeByLimit = async(segment:string = '', limit: number = 25) => await fetch(`${BASE_API}/${segment}?limit=${limit}`);

export const search = async(query: string, pageId: string) => await fetch(`${BASE_API}/anime?q=${query}&page=${pageId}`);