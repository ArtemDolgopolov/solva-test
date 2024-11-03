import {
 PreloadedState,
 combineReducers,
 configureStore
} from '@reduxjs/toolkit';
import projectReducer from './features/projectSlice'

const rootReducer = combineReducers({
  project: projectReducer
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
 return configureStore({
   reducer: rootReducer,
   preloadedState,
   middleware: (getDefaultMiddleware) => getDefaultMiddleware()
 });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];