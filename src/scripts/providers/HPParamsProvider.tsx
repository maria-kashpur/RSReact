import { Dispatch, ReactNode, SetStateAction, useMemo, useState } from 'react';
import { APotionsFilter, PotionsReqParams } from '../api/types/potions';
import { lsPotionParams } from '../utils/localStorage';
import React from 'react';
import { getDefaultPotionParams } from '../utils/getDefaultPotionParams';
import { SetURLSearchParams, useSearchParams } from 'react-router-dom';

type TypeSetState<T> = Dispatch<SetStateAction<T>>;

export interface IContext {
  searchCategory: APotionsFilter;
  setSearchCategory?: TypeSetState<IContext['searchCategory']>;

  searchValue: string;
  setSearchValue?: TypeSetState<IContext['searchValue']>;

  paginationLimit: number;
  setPaginationLimit?: TypeSetState<IContext['paginationLimit']>;

  paginationPage: number;
  setPaginationPage?: TypeSetState<IContext['paginationPage']>;

  setSearchParams?: SetURLSearchParams;
}

const defaultContext: IContext = {
  searchCategory: 'name',
  searchValue: '',
  paginationLimit: 30,
  paginationPage: 1,
};

export const PotionsParamsContext = React.createContext<IContext>(defaultContext);

export const PotionsParamsProvider = ({ children, ...props }: { children: ReactNode }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const defParams: PotionsReqParams =
    lsPotionParams && searchParams.size === 0
      ? JSON.parse(lsPotionParams)
      : getDefaultPotionParams(searchParams.get('limit'), searchParams.get('page'));

  const [searchCategory, setSearchCategory] = useState<APotionsFilter>(
    defParams.filters && defParams.filters.length === 1 ? defParams.filters[0].attribute : 'name'
  );
  const [searchValue, setSearchValue] = useState(
    defParams?.filters && defParams.filters.length === 1 && defParams.filters[0].what
      ? defParams.filters[0].what
      : ''
  );
  const [paginationLimit, setPaginationLimit] = useState(defParams.pagination.limit);
  const [paginationPage, setPaginationPage] = useState(defParams.pagination.page);

  const paginationLimitMemo = useMemo(
    () =>
      ({
        paginationLimit,
        setPaginationLimit,
      }) as IContext,
    [paginationLimit]
  );
  const searchCategoryMemo = useMemo(
    () => ({
      searchCategory,
      setSearchCategory,
    }),
    [searchCategory]
  );
  const paginationPageMemo = useMemo(
    () =>
      ({
        paginationPage,
        setPaginationPage,
        setSearchParams,
      }) as IContext,
    [paginationPage, setSearchParams]
  );

  const searchValueMemo = useMemo(
    () =>
      ({
        searchValue,
        setSearchValue,
        setSearchParams,
      }) as IContext,
    [searchValue, setSearchParams]
  );

  return (
    <PotionsParamsContext.Provider
      value={{
        ...searchCategoryMemo,
        ...paginationLimitMemo,
        ...paginationPageMemo,
        ...searchValueMemo,
      }}
      {...props}
    >
      {children}
    </PotionsParamsContext.Provider>
  );
};
