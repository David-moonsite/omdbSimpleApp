import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../store';
import axios from 'axios';
import Config from 'react-native-config';

export interface MoviesStoreState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  movies: any | null;
  movieInfo: any | null;
}

const initialState: MoviesStoreState = {
  status: 'idle',
  error: null,
  movies: null,
  movieInfo: null,
};

const API_URL = `${Config.BASE_URL}?i=${Config.IMDB_ID}&apikey=${Config.API_KEY}&s=`;

export const fetchMovies = createAsyncThunk(
  'moviesStore/fetchMovies',
  async (title: string) => {
    const response = await axios.get(API_URL + title + '&plot=full');
    return response.data;
  },
);
export const fetchMovieInfo = createAsyncThunk(
  'moviesStore/fetchMoreMovies',
  async (imdbID: string) => {
    const temp_URL = `${Config.BASE_URL}?i=${imdbID}&apikey=${Config.API_KEY}&s=`;

    const response = await axios.get(temp_URL);
    return response.data;
  },
);

export const moviesStoreSlice = createSlice({
  name: 'moviesStore',
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<string | null>) => {
      state.movies = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMovies.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(fetchMovieInfo.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchMovieInfo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movieInfo = action.payload;
      })
      .addCase(fetchMovieInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export const selectMoviesStore = (state: RootState) => state.moviesStore;

export default moviesStoreSlice.reducer;
