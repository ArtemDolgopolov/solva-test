import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from '../store'
import { useContext } from 'react'
import { AppContext } from '../components/Context/Context'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const usePlaceholdersContext = () => {
 const context = useContext(AppContext);
 if (!context) {
   throw new Error('usePlaceholders must be used within a PlaceholderProvider');
 }
 return context;
};