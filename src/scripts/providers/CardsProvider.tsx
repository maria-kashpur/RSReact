import React, { ReactNode } from 'react';
import { PotionsResponse } from '../api/types/potions';
import { useLocation } from 'react-router';

interface IContext {
  data?: PotionsResponse['data'] | null;
  variant?: 'full' | 'mini';
}

export const CardsContext = React.createContext<IContext>({});

export const CardsContextProvider = ({
  children,
  data,
  ...props
}: {
  children: ReactNode;
  data: PotionsResponse['data'] | null;
}) => {
  const location = useLocation();
  const variant = location.pathname === '/' ? 'full' : 'mini';

  return (
    <CardsContext.Provider value={{ data, variant }} {...props}>
      {children}
    </CardsContext.Provider>
  );
};
