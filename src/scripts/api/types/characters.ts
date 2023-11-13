import { Links, Meta, Predicate } from './general';

export interface ACharacters {
  alias_names: string[] | [];
  animagus: string | null;
  blood_status: string | null;
  boggart: string | null;
  born: string | null;
  died: string | null;
  eye_color: string | null;
  family_member: string[];
  gender: string | 'Male' | 'Female' | null;
  hair_color: string | null;
  height: string | null;
  house: string | null;
  image: string | null;
  jobs: string[] | [];
  name: string;
  nationality: string | null;
  patronus: string | null;
  romances: string[] | [];
  skin_color: string | [];
  slug: string;
  species: string | 'Human' | null;
  titles: string[] | [];
  wand: string[] | [];
  weight: string | null;
  wiki: string;
}

export type ACharactersFilter =
  | 'alias_names'
  | 'animagus'
  | 'blood_status'
  | 'boggart'
  | 'born'
  | 'died'
  | 'eye_color'
  | 'family_member'
  | 'gender'
  | 'hair_color'
  | 'height'
  | 'house'
  | 'jobs'
  | 'name'
  | 'nationality'
  | 'patronus'
  | 'romances'
  | 'skin_color'
  | 'species'
  | 'titles'
  | 'wand'
  | 'weight';

export interface CharacterReqParams {
  sort?: {
    param: 'ASC' | 'DESC';
    attribute: ACharactersFilter;
  };
  pagination?: {
    limit: number;
    page?: number;
  };
  filters?: {
    attribute: ACharactersFilter;
    predicate: Predicate;
    what: string | null;
  }[];
}

export interface CharactersResponse {
  data: {
    attributes: ACharacters;
    id: string;
    links: Pick<Links, 'self'>;
    type: 'character';
  }[];
  links: Links;
  meta: Meta;
}

export interface CharacterResponse {
  data: {
    attributes: ACharacters;
    id: string;
    links: Pick<Links, 'self'>;
    type: 'character';
  }[];
  links: Pick<Links, 'self'>;
  meta: {
    copyright: string;
    generated_at: Date;
  };
}
