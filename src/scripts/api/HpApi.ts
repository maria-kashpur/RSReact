import { load } from './load';
import { BooksReqParams, BooksResponse } from './types/books';
import { ChaptersReqParams } from './types/chapters';
import { CharacterReqParams } from './types/characters';
import { Predicate } from './types/general';
import { MoviesReqParams } from './types/movies';
import { PotionResponse, PotionsReqParams } from './types/potions';
import { SpellsReqParams } from './types/spells';

export default class HpApi {
  private static baseURL = 'https://api.potterdb.com/';

  private static root = {
    books: `${this.baseURL}/v1/books`,
    characters: `${this.baseURL}/v1/characters`,
    movies: `${this.baseURL}/v1/movies`,
    potions: `${this.baseURL}/v1/potions`,
    spells: `${this.baseURL}/v1/spells`,
  };

  private static endpoints = {
    books: {
      getList: () => `${this.root.books}`,
      getForId: (booksID: string | number) => `${this.root.books}/${booksID}`,
      getChapters: (booksID: string | number) => `${this.root.books}/${booksID}/chapters`,
      getChapter: (booksID: string | number, chapterID: string | number) =>
        `${this.root.books}/${booksID}/chapters/${chapterID}`,
    },
    characters: {
      getList: () => `${this.root.characters}`,
      getForId: (characterID: string | number) => `${this.root.characters}/${characterID}`,
    },
    movies: {
      getList: () => `${this.root.movies}`,
      getForID: (movieID: string | number) => `${this.root.movies}/${movieID}`,
    },
    potions: {
      getList: () => `${this.root.potions}`,
      getForID: (potionID: string | number) => `${this.root.potions}/${potionID}`,
    },
    spells: {
      getList: () => `${this.root.spells}`,
      getForID: (spellID: string | number) => `${this.root.spells}/${spellID}`,
    },
  };

  private static params = {
    pagination: {
      limit: (num: string | number) => `page[size]=${num}`,
      page: (num: string | number) => `page[number]=${num}`,
    },
    filter: (attribute: string, what: string | null, predicate: Predicate) =>
      what
        ? `filter[${attribute}_${predicate}]=${what.split(' ').join('%20')}`
        : `filter[${attribute}_${predicate}]`,
    sort: (sortParam: 'ASC' | 'DESC', attribute: string) =>
      sortParam === 'ASC' ? `sort=${attribute}` : `sort=-${attribute}`,
  };

  private static getArrParams(
    params:
      | BooksReqParams
      | CharacterReqParams
      | MoviesReqParams
      | PotionsReqParams
      | SpellsReqParams
      | ChaptersReqParams
  ) {
    const paramsArr = [];

    const sort =
      params && params.sort ? this.params.sort(params.sort.param, params.sort.attribute) : null;

    const limit =
      params && params.pagination?.limit
        ? this.params.pagination.limit(params.pagination.limit)
        : null;

    const page =
      params && params.pagination?.page
        ? this.params.pagination.page(params.pagination.page)
        : null;

    const filters =
      params && params.filters && params.filters.length > 0
        ? params.filters.map(
            (el: { attribute: string; what: string | null; predicate: Predicate }) =>
              this.params.filter(el.attribute, el.what, el.predicate)
          )
        : null;

    if (sort) paramsArr.push(sort);
    if (limit) paramsArr.push(limit);
    if (page) paramsArr.push(page);
    if (filters) paramsArr.push(...filters);
    return paramsArr;
  }

  private static generateUrlWithParams = (endpoint: string, params: string[]) => {
    return `${endpoint}?${params.join('&')}`;
  };

  static async getBooks(params?: BooksReqParams): Promise<BooksResponse> {
    const endpoint = this.endpoints.books.getList();
    const paramsArr = params ? this.getArrParams(params) : [];

    const url = paramsArr.length > 0 ? this.generateUrlWithParams(endpoint, paramsArr) : endpoint;
    console.log(url);
    const res = await load(url);
    return res;
  }

  static async getBook(booksID: string): Promise<BooksResponse> {
    const url = this.endpoints.books.getForId(booksID);
    const res = await load(url);
    return res;
  }

  static async getCharacters(params?: CharacterReqParams) {
    const endpoint = this.endpoints.characters.getList();
    const paramsArr = params ? this.getArrParams(params) : [];

    const url = paramsArr.length > 0 ? this.generateUrlWithParams(endpoint, paramsArr) : endpoint;
    console.log(url);
    const res = await load(url);
    return res;
  }

  static async getCharacter(characterID: string): Promise<BooksResponse> {
    const url = this.endpoints.characters.getForId(characterID);
    const res = await load(url);
    return res;
  }

  static async getMovies(params?: MoviesReqParams) {
    const endpoint = this.endpoints.movies.getList();
    const paramsArr = params ? this.getArrParams(params) : [];

    const url = paramsArr.length > 0 ? this.generateUrlWithParams(endpoint, paramsArr) : endpoint;
    console.log(url);
    const res = await load(url);
    return res;
  }

  static async getMovie(movieID: string) {
    const url = this.endpoints.movies.getForID(movieID);
    const res = await load(url);
    return res;
  }

  static async getPotions(params?: PotionsReqParams) {
    const endpoint = this.endpoints.potions.getList();
    const paramsArr = params ? this.getArrParams(params) : [];

    const url = paramsArr.length > 0 ? this.generateUrlWithParams(endpoint, paramsArr) : endpoint;
    //console.log(url);
    const res = await load(url);
    return res;
  }

  static async getPotion(id: string): Promise<PotionResponse> {
    const url = this.endpoints.potions.getForID(id);
    console.log(url);
    const res = await load(url);
    return res;
  }

  static async getSpells(params?: SpellsReqParams) {
    const endpoint = this.endpoints.spells.getList();
    const paramsArr = params ? this.getArrParams(params) : [];

    const url = paramsArr.length > 0 ? this.generateUrlWithParams(endpoint, paramsArr) : endpoint;
    console.log(url);
    const res = await load(url);
    return res;
  }

  static async getSpell(id: string) {
    const url = this.endpoints.spells.getForID(id);
    const res = await load(url);
    return res;
  }

  static async getChapters(booksID: string | number, params: ChaptersReqParams) {
    const endpoint = this.endpoints.books.getChapters(booksID);
    const paramsArr = params ? this.getArrParams(params) : [];

    const url = paramsArr.length > 0 ? this.generateUrlWithParams(endpoint, paramsArr) : endpoint;
    console.log(url);
    const res = await load(url);
    return res;
  }

  static async getChapter(booksID: string | number, chapterID: string | number) {
    const url = this.endpoints.books.getChapter(booksID, chapterID);
    const res = await load(url);
    return res;
  }
}
