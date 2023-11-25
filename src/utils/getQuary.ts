interface IQuery {
  page?: string | string[];
  limit?: string | string[];
  search?: string | string[];
  category?: string | string[];
}

export const getQuery = (
  query: IQuery
): { page: number; limit: number; search: string; category: string } => {
  function getValue(
    el: string | string[] | undefined,
    defaultValue: string | number,
    converToNum: boolean
  ) {
    const result = el ? `${el}` : defaultValue;
    return converToNum ? +result : result;
  }
  return {
    page: getValue(query.page, 1, true) as number,
    limit: getValue(query.limit, 3, true) as number,
    category: getValue(query.category, 'name', false) as string,
    search: getValue(query.search, '', false) as string,
  };
};
