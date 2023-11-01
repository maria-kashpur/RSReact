import { Links, Meta, Predicate } from './general';

export interface ABook {
  author: string;
  cover: string;
  dedication: string;
  pages: number;
  release_date: Date;
  summary: string;
  slug: string;
  title: string;
  wiki: string;
}

export type ABookFilter = 'author' | 'dedication' | 'pages' | 'release_date' | 'summary' | 'title';

export interface BooksReqParams {
  sort?: {
    param: 'ASC' | 'DESC';
    attribute: ABookFilter;
  };
  pagination?: {
    limit: number;
    page?: number;
  };
  filters?: {
    attribute: ABookFilter;
    predicate: Predicate;
    what: string | null;
  }[];
}

export interface BooksResponse {
  data: {
    attributes: ABook;
    id: string;
    links: Pick<Links, 'self'>;
    type: 'book';
    relationships: {
      chapters: { id: string; type: 'chapter' }[];
      type: 'chapter';
    };
  }[];
  links: Links;
  meta: Meta;
}

export interface BookResponse {
  data: {
    attributes: ABook;
    id: string;
    links: Pick<Links, 'self'>;
    type: 'book';
    relationships: {
      chapters: { id: string; type: 'chapter' }[];
      type: 'chapter';
    };
  }[];
  links: Pick<Links, 'self'>;
  meta: {
    copyright: string;
    generated_at: Date;
  };
}
