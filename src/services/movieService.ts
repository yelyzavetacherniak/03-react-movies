import type { AxiosResponse } from 'axios';
import axios from 'axios';
import type { Movie } from '../types/movie';

const API_URL = 'https://api.themoviedb.org/3/search/movie';
const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

interface MoviesResponse {
  results: Movie[];
}

export async function fetchMovies(query: string): Promise<Movie[]> {
  try {
    const response: AxiosResponse<MoviesResponse> = await axios.get(API_URL, {
      params: {
        query,
        language: 'en-US',
        page: 1,
        include_adult: false,
      },
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
      },
    });

    return response.data.results;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
}
