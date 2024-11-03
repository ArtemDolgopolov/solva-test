import { createContext } from 'react'
import { ContextProps, PlaceholderKeys } from '../../types'
import placeholders from '../../utils/placeholders.json'

interface PlaceholderContextProps {
  t: (key: PlaceholderKeys) => string
}

export const AppContext = createContext<PlaceholderContextProps | undefined>(undefined);

export function AppContextProvider({ children }: ContextProps) {
  const t = (key: PlaceholderKeys) => {
    return placeholders[key] || key
  };

  return (
    <AppContext.Provider value={{ t }}>
      {children}
    </AppContext.Provider>
  );
};