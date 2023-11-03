// import { Links, Meta, Predicate } from './general';

import { Predicate } from './general';

export interface AChapters {
  order: number;
  slug: string;
  summery: string;
  title: string;
}

export type AChaptersFilter = 'order' | 'summery' | 'title';

export interface ChaptersReqParams {
  sort?: {
    param: 'ASC' | 'DESC';
    attribute: AChaptersFilter;
  };
  pagination?: {
    limit: number;
    page?: number;
  };
  filters?: {
    attribute: AChaptersFilter;
    predicate: Predicate;
    what: string;
  }[];
}
