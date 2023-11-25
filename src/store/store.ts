import { configureStore } from '@reduxjs/toolkit';
import potionReducer from './reducers/potionSlice';
import { potionApi } from './reducers/hpApi';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';
import { combineReducers } from '@reduxjs/toolkit';

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof reducers>;
export type PreloadState = Partial<RootState>;

export const reducers = combineReducers({
  cards: potionReducer,
  [potionApi.reducerPath]: potionApi.reducer,
});

export const setupStore = (preloadedState?: PreloadState) =>
  configureStore({
    preloadedState,
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(potionApi.middleware),
  });

export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const wrapper = createWrapper<AppStore>(() => setupStore());
