import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PotionsResponse } from '../../api/types/potions';

interface PotionState {
  potions: PotionsResponse['data'];
  isLoading: boolean;
  error: string;
  limit: number;
  search: string;
  page: number;
  category:
    | 'name'
    | 'characteristics'
    | 'difficulty'
    | 'effect'
    | 'inventors'
    | 'ingredients'
    | 'manufacturers'
    | 'side_effects'
    | 'time';
}

const lsSearch = localStorage.getItem('search');

const initialState: PotionState = {
  potions: [],
  isLoading: false,
  error: '',
  limit: 3,
  page: 1,
  search: lsSearch || '',
  category: 'name',
};

export const potionSlice = createSlice({
  name: 'potion',
  initialState,
  reducers: {
    setLimit(state, action: PayloadAction<PotionState['limit']>) {
      state.limit = action.payload;
    },
    setPage(state, action: PayloadAction<PotionState['limit']>) {
      state.limit = action.payload;
    },
    setCategory(state, action: PayloadAction<PotionState['category']>) {
      state.category = action.payload;
    },
    setSearch(state, action: PayloadAction<PotionState['search']>) {
      state.search = action.payload;
    },
  },
});

export default potionSlice.reducer;
