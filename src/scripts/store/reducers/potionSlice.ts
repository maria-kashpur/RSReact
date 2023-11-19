import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PotionsResponse } from '../../api/types/potions';

interface PotionState {
  potions: PotionsResponse['data'];
  potionsIsLoading: boolean;
  error: string;
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

const lsSearch = localStorage.getItem('search');

const initialState: PotionState = {
  potions: [],
  potionsIsLoading: false,
  error: '',
  limit: 10,
  page: 1,
  pages: 1,
  search: lsSearch || '',
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
    setPotionsIsLoading(state, action: PayloadAction<PotionState['potionsIsLoading']>) {
      state.potionsIsLoading = action.payload;
    },
    setPotions(state, action: PayloadAction<PotionState['potions']>) {
      state.potions = action.payload;
    },
  },
});
export const { setLimit, setPage, setSearch, setPages, setPotionsIsLoading, setPotions } =
  potionSlice.actions;

export default potionSlice.reducer;
