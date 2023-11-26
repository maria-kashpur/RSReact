import { potionApi } from '@/store/reducers/hpApi';
import { vi } from 'vitest';
import { fakePotions } from './fakePotions';
import { fakePotion } from './fakePotion';

export function getMockPotions() {
  vi.spyOn(potionApi, 'useGetPotionsQuery').mockReturnValue({
    data: fakePotions,
    refetch: vi.fn(),
    isFetching: false,
  });
}

export function getMockNoPotions() {
  vi.spyOn(potionApi, 'useGetPotionsQuery').mockReturnValue({
    data: {
      potions: [],
      page: 1,
      pages: 1,
    },
    refetch: vi.fn(),
  });
}

export function getMockPotion() {
  vi.spyOn(potionApi, 'useGetPotionQuery').mockReturnValue({
    data: fakePotion,
    refetch: vi.fn(),
  });
}
