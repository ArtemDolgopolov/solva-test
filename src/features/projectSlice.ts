import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { auth } from '../services/firebaseAuth'
interface ProjectState {
  isUserSignIn: boolean | null;
  firebaseErrors: string | null;
  userEndpoint: string;
  request: {
   query: string;
   userVariables: object;
   userHeaders: object;
  };
  response: object;
}

const initialState: ProjectState = {
  isUserSignIn: null,
  firebaseErrors: null,
  userEndpoint: 'https://swapi.dev/api/people/',
  request: {
   query: '',
   userVariables: {},
   userHeaders: {}
  },
  response: {}
};

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
    updateUserStatus(state, { payload }: PayloadAction<boolean>) {
      state.isUserSignIn = payload;
    },
    setFirebaseErrors(state, { payload }: PayloadAction<string | null>) {
      state.firebaseErrors = payload;
    },
    clearFirebaseErrors(state) {
      state.firebaseErrors = null;
    },
    updateUserRequest(
     state,
     {
       payload
     }: PayloadAction<{
       query: string;
       userVariables: object;
       userHeaders: object;
     }>
    ) {
     state.request = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserAuthStatus.fulfilled, (state, { payload }) => {
      state.isUserSignIn = payload;
    });
  },
});


export const { 
 updateUserStatus, 
 setFirebaseErrors, 
} = formSlice.actions
export default formSlice.reducer