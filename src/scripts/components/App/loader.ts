import HpApi from '../../api/HpApi';
import { PotionsReqParams } from '../../api/types/potions';
import defineNumberOfPages from '../Pagination/defineNumberOfPages';

export async function loader(params: PotionsReqParams) {
  const res = await HpApi.getPotions(params);
  let items = null;
  let pagination = null;

  if (res) {
    items = res.data;
    pagination = {
      current: res.meta.pagination.current,
      last: res.meta.pagination.last ? res.meta.pagination.last : 0,
      next: res.meta.pagination.next ? res.meta.pagination.next : 0,
      pages: res.meta.pagination.records
        ? defineNumberOfPages(res.meta.pagination.records, params.pagination?.limit)
        : 0,
    };
  }

  return { items, pagination };
}
