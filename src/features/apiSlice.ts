import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface ApiState {
  characters: any[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ApiState = {
  characters: [],
  isLoading: false,
  error: null,
};

export const fetchCharacters = createAsyncThunk(
  'characters/fetchCharacters',
  async () => {
    const response = await axios.get('https://swapi.dev/api/people/');
    return response.data.results;
  }
);

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.characters = action.payload;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to load characters';
      });
  },
});

export default apiSlice.reducer;