import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { APotionsFilter, PotionsReqParams } from '../api/types/potions';
import { lsPotionParams } from '../components/App/data/localStorage';
import React from 'react';
import { getDefaultPotionParams } from '../components/App/data/getDefaultPotionParams';
import { SetURLSearchParams, useSearchParams } from 'react-router-dom';
import { categories } from '../components/App/data/searchCategories';

type TypeSetState<T> = Dispatch<SetStateAction<T>>;

export interface IContext {
  params: PotionsReqParams;
  setParams: TypeSetState<PotionsReqParams>;
  setSearchParams: SetURLSearchParams;
  categories: APotionsFilter[];
}

export const PotionsParamsContext = React.createContext<IContext | null>(null);

export const PotionsParamsProvider = ({ children, ...props }: { children: ReactNode }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState<PotionsReqParams>(
    lsPotionParams && searchParams.size === 0
      ? JSON.parse(lsPotionParams)
      : getDefaultPotionParams(searchParams.get('limit'), searchParams.get('page'))
  );

  return (
    <PotionsParamsContext.Provider
      value={{
        params,
        setParams,
        setSearchParams,
        categories,
      }}
      {...props}
    >
      {children}
    </PotionsParamsContext.Provider>
  );
};
