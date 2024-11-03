import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { auth } from '../services/firebaseAuth';

// Определяем состояние для формы
interface FormState {
  isUserSignIn: boolean | null; // Статус аутентификации пользователя
  firebaseErrors: string | null; // Сообщения об ошибках из Firebase
}

const initialState: FormState = {
  isUserSignIn: null,
  firebaseErrors: null,
};

// Асинхронное действие для проверки статуса пользователя
export const getUserAuthStatus = createAsyncThunk(
  'form/getAuthStatus',
  async () => {
    await auth.authStateReady();
    return Boolean(auth.currentUser);
  }
);

const formSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    // Действие для обновления статуса аутентификации пользователя
    updateUserStatus(state, { payload }: PayloadAction<boolean>) {
      state.isUserSignIn = payload;
    },
    // Действие для установки ошибок аутентификации из Firebase
    setFirebaseErrors(state, { payload }: PayloadAction<string | null>) {
      state.firebaseErrors = payload;
    },
    // Действие для очистки ошибок
    clearFirebaseErrors(state) {
      state.firebaseErrors = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserAuthStatus.fulfilled, (state, { payload }) => {
      state.isUserSignIn = payload;
    });
  },
});


export const { updateUserStatus, setFirebaseErrors, clearFirebaseErrors } = formSlice.actions;
export default formSlice.reducer;