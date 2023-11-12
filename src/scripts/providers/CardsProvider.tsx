import React, { ReactNode, useMemo } from 'react';
import { PotionsResponse } from '../api/types/potions';

export interface IContext {
  data: PotionsResponse['data'];
}

export const CardsContext = React.createContext<IContext | null>(null);

export const CardsContextProvider = ({
  children,
  data,
  ...props
}: {
  children: ReactNode;
  data: PotionsResponse['data'];
}) => {
  const value = useMemo(() => ({ data }) as IContext, [data]);

  return (
    <CardsContext.Provider value={value} {...props}>
      {children}
    </CardsContext.Provider>
  );
};
