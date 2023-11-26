interface IQuery {
  page?: string | string[];
  limit?: string | string[];
  search?: string | string[];
  category?: string | string[];
}

function getValue(
  el: string | string[] | undefined,
  defaultValue: string | number,
  converToNum: boolean
) {
  const result = el ? `${el}` : defaultValue;
  return converToNum ? +result : result;
}

export function getQuery(query: IQuery): {
  page: number;
  limit: number;
  search: string;
  category: string;
} {
  return {
    page: getValue(query.page, 1, true) as number,
    limit: getValue(query.limit, 3, true) as number,
    category: getValue(query.category, 'name', false) as string,
    search: getValue(query.search, '', false) as string,
  };
}

export function getQueryForLink(query: IQuery) {
  const page = getValue(query.page, 1, true);
  const limit = getValue(query.limit, 3, true);
  const category = getValue(query.category, 'name', false);
  const search = getValue(query.search, '', false);

  const result: {
    page: number;
    limit: number;
    search?: string;
    category?: string;
  } = { page: page as number, limit: limit as number };
  if (category !== 'name') {
    result.category = category as string;
  }
  if (search !== search) {
    result.search = search as string;
  }

  return result;
}
