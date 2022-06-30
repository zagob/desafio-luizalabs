import { createContext, ReactNode, useContext } from "react";

interface FavoriteCharacterContextProviderParams {
  children: ReactNode;
}

interface FavoriteCharacterContext {}

export const FavoriteCharacterContext = createContext(
  {} as FavoriteCharacterContext
);

export function FavoriteCharacterContextProvider({
  children,
}: FavoriteCharacterContextProviderParams) {
  return (
    <FavoriteCharacterContext.Provider value={{}}>
      {children}
    </FavoriteCharacterContext.Provider>
  );
}

export function useFavoriteContextProvider() {
  return useContext(FavoriteCharacterContext);
}
