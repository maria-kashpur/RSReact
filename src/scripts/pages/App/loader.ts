import HpApi from '../../api/HpApi';
import { Potion, PotionsReqParams } from '../../api/types/potions';
import defineNumberOfPages from '../../utils/defineNumberOfPages';

export async function loader(params: PotionsReqParams) {
  const res = await HpApi.getPotions(params);
  let items: Potion[] = [];
  let pagination = null;

  if (res) {
    items = res.data;
    pagination = {
      current: res.meta.pagination.current,
      pages: res.meta.pagination.records
        ? defineNumberOfPages(res.meta.pagination.records, params.pagination?.limit)
        : 0,
    };
  }
  return { items, pagination };
}
