import React from 'react';
import { PotionsResponse } from '../api/types/potions';

export const CardsContext = React.createContext<PotionsResponse['data'] | null>([]);
