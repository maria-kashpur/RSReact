import { lsPotionParams } from './localStorage';

export function getDefaultPotionParams(limit: string | null, page: string | null) {
  const ls = JSON.parse(`${lsPotionParams}`);
  const filters = ls?.filters;
  return {
    sort: { param: 'ASC', attribute: 'name' },
    filters: filters ? filters : undefined,
    pagination: {
      limit: limit && typeof +limit === 'number' ? +limit : 30,
      page: page && typeof +page === 'number' ? +page : 1,
    },
  };
}
