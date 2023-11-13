import { Predicate } from './general';

export interface ASpells {
  category: string;
  creator: string;
  effect: string;
  hand: string;
  image: string;
  incantation: string;
  light: string;
  name: string;
  slug: string;
  wiki: string;
}

export type ASpellsFilter =
  | 'category'
  | 'creator'
  | 'effect'
  | 'hand'
  | 'incantation'
  | 'light'
  | 'name';

export interface SpellsReqParams {
  sort?: {
    param: 'ASC' | 'DESC';
    attribute: ASpellsFilter;
  };
  pagination?: {
    limit: number;
    page?: number;
  };
  filters?: {
    attribute: ASpellsFilter;
    predicate: Predicate;
    what: string | null;
  }[];
}
