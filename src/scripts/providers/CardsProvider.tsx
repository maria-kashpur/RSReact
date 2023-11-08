import React, { ReactNode } from 'react';
import { PotionsResponse } from '../api/types/potions';
import { useLocation } from 'react-router';

interface IContext {
  data: PotionsResponse['data'];
  variant: 'full' | 'mini';
}

export const CardsContext = React.createContext<IContext>({ data: [], variant: 'full' });

export const CardsContextProvider = ({
  children,
  data,
  ...props
}: {
  children: ReactNode;
  data: PotionsResponse['data'];
}) => {
  const location = useLocation();
  const variant = location.pathname === '/' ? 'full' : 'mini';

  return (
    <CardsContext.Provider value={{ data, variant }} {...props}>
      {children}
    </CardsContext.Provider>
  );
};
