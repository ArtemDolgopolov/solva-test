// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// interface Character {
//   name: string;
//   // Добавьте остальные свойства персонажа
// }

// interface CharactersState {
//   characters: Character[];
//   isLoading: boolean;
//   error: string | null;
// }

// const initialState: CharactersState = {
//   characters: [],
//   isLoading: false,
//   error: null,
// };

// // Асинхронное действие для получения персонажей из API
// export const fetchCharacters = createAsyncThunk(
//   'characters/fetchCharacters',
//   async () => {
//     const response = await axios.get('https://swapi.dev/api/people/');
//     return response.data.results;
//   }
// );

// const charactersSlice = createSlice({
//   name: 'characters',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCharacters.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchCharacters.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.characters = action.payload;
//       })
//       .addCase(fetchCharacters.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.error.message || 'Произошла ошибка';
//       });
//   },
// });

// export default charactersSlice.reducer;