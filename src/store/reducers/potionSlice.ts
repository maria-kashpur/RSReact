import { PotionsResponse } from '@/types/potions';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

interface PotionState {
  potions: PotionsResponse['data'];
  potionDetail: object | null;
  limit: number;
  search: string;
  page: number;
  pages: number;
  category:
    | 'name'
    | 'characteristics'
    | 'difficulty'
    | 'effect'
    | 'inventors'
    | 'ingredients'
    | 'manufacturers'
    | 'side effects'
    | 'time';
}

export const initialState: PotionState = {
  potions: [],
  potionDetail: null,
  limit: 3,
  page: 1,
  pages: 1,
  search: '',
  category: 'name',
};

export const potionSlice = createSlice({
  name: 'potion',
  initialState,
  reducers: {
    setLimit(state, action: PayloadAction<PotionState['limit']>) {
      state.limit = action.payload;
      state.page = 1;
    },
    setPage(state, action: PayloadAction<PotionState['limit']>) {
      state.page = action.payload;
    },
    setSearch(
      state,
      action: PayloadAction<{
        currentSearch: PotionState['search'];
        currentCategory: PotionState['category'];
      }>
    ) {
      state.search = action.payload.currentSearch;
      state.category = action.payload.currentCategory;
      state.page = 1;
      localStorage.setItem('search', action.payload.currentSearch);
    },
    setPages(state, action: PayloadAction<PotionState['pages']>) {
      state.pages = action.payload;
    },
    setPotions(state, action: PayloadAction<PotionState['potions']>) {
      state.potions = action.payload;
    },
    setPotion(state, action: PayloadAction<PotionState['potionDetail']>) {
      state.potionDetail = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export default potionSlice.reducer;
export const { setLimit, setPage, setSearch, setPages, setPotions, setPotion } =
  potionSlice.actions;
