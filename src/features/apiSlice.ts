import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface ApiState {
  characters: any[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
}

const initialState: ApiState = {
  characters: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  totalPages: 0
};

export const fetchCharacters = createAsyncThunk(
  'characters/fetchCharacters',
  async (page: number) => {
    const response = await axios.get(`https://swapi.dev/api/people/?page=${page}`);
    return {
     characters: response.data.results,
     totalPages: Math.ceil(response.data.count / 10)
    } 
  }
);

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.characters = action.payload.characters;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to load characters';
      });
  },
});

export const { setCurrentPage } = apiSlice.actions
export default apiSlice.reducer