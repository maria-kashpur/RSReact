// import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import potionReducer from './reducers/potionSlice';
// import { potionApi } from './reducers/hpApi';
// import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// const rootReducer = combineReducers({
//   potionReducer,
//   [potionApi.reducerPath]: potionApi.reducer,
// });

// export const setupStore = () => {
//   return configureStore({
//     reducer: rootReducer,
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(potionApi.middleware),
//   });
// };

// export type RootState = ReturnType<typeof rootReducer>;
// export type AppStore = ReturnType<typeof setupStore>;
// export type AppDispatch = AppStore['dispatch'];

// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

import { configureStore } from '@reduxjs/toolkit';
import potionReducer from './reducers/potionSlice';
import { potionApi } from './reducers/hpApi';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    potionReducer,
    [potionApi.reducerPath]: potionApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(potionApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
