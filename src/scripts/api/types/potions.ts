import { Links, Meta, Predicate } from './general';

export interface APotions {
  characteristics: string | null;
  difficulty: string | null;
  effect: string | null;
  image: string | null;
  inventors: string | null;
  ingredients: string | null;
  manufacturers: string | null;
  name: string;
  side_effects: string | null;
  slug: string;
  time: string | null;
  wiki: string;
}

export type APotionsFilter =
  | 'characteristics'
  | 'difficulty'
  | 'effect'
  | 'inventors'
  | 'ingredients'
  | 'manufacturers'
  | 'name'
  | 'side_effects'
  | 'time';

export interface Potion {
  id: string;
  type: string;
  attributes: APotions;
  links: {
    self: string;
  };
}
export interface PotionsResponse {
  data: Potion[] | [];
  links: Links;
  meta: Meta;
}

export interface PotionsReqParams {
  sort?: {
    param: 'ASC' | 'DESC';
    attribute: APotionsFilter;
  };
  pagination: {
    limit: number;
    page: number;
  };
  filters?: {
    attribute: APotionsFilter;
    predicate: Predicate;
    what: string | null;
  }[];
}
