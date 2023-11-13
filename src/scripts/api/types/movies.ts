import { Links, Meta, Predicate } from './general';

export interface AMovies {
  box_office: string;
  budget: string;
  cinematographers: string[];
  directors: string[];
  distributors: string[];
  editors: string[];
  music_composers: string[];
  poster: string;
  producers: string[];
  rating: string;
  release_date: Date;
  running_time: string;
  screenwriters: string[];
  slug: string;
  summary: string;
  title: string;
  trailer: string;
  wiki: string;
}

export type AMoviesFilter =
  | 'box_office'
  | 'budget'
  | 'cinematographers'
  | 'directors'
  | 'distributors'
  | 'editors'
  | 'music_composers'
  | 'producers'
  | 'rating'
  | 'release_date'
  | 'running_time'
  | 'screenwriters'
  | 'summary'
  | 'title';

export interface MovieResponse {
  data: {
    attributes: AMovies;
    id: string;
    links: Pick<Links, 'self'>;
    type: 'movie';
  }[];
  links: Links;
  meta: Meta;
}

export interface MoviesReqParams {
  sort?: {
    param: 'ASC' | 'DESC';
    attribute: AMoviesFilter;
  };
  pagination?: {
    limit: number;
    page?: number;
  };
  filters?: {
    attribute: AMoviesFilter;
    predicate: Predicate;
    what: string | null;
  }[];
}
