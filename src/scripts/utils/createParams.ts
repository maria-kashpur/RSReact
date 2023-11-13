import { APotionsFilter, PotionsReqParams } from '../api/types/potions';

export function createParams(
  searchCategory: APotionsFilter,
  paginationLimit: number,
  paginationPage: number,
  searchValue: string
) {
  const params: PotionsReqParams = {
    sort: {
      param: 'ASC',
      attribute: 'name',
    },
    pagination: {
      limit: paginationLimit,
      page: paginationPage,
    },
    filters:
      searchValue === ''
        ? undefined
        : [
            {
              predicate: 'cont_any',
              attribute: searchCategory,
              what: searchValue,
            },
          ],
  };
  return params;
}
