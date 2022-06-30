import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface FavoriteCharacterContextProviderParams {
  children: ReactNode;
}

interface FavoriteCharacterContext {
  favoriteName: string[];
  handleAddFavorite: (name: string) => void;
  handleRemoveFavorite: (name: string) => void;
}

export const FavoriteCharacterContext = createContext(
  {} as FavoriteCharacterContext
);

export function FavoriteCharacterContextProvider({
  children,
}: FavoriteCharacterContextProviderParams) {
  const [favoriteName, setFavoriteName] = useState<string[]>([]);

  useEffect(() => {
    setFavoriteName(
      JSON.parse(localStorage.getItem("favoriteNameMarvelDeveloper") || "")
    );
  }, []);

  function handleAddFavorite(name: string) {
    if (favoriteName.length === 5) {
      return alert("Número maximo de favoritos é 5");
    }
    let getFav = JSON.parse(
      localStorage.getItem("favoriteNameMarvelDeveloper")!
    );
    setFavoriteName((arr) => [...arr, name]);
    if (!getFav) {
      localStorage.setItem(
        "favoriteNameMarvelDeveloper",
        JSON.stringify([name])
      );
    } else {
      getFav.push(name);
      localStorage.setItem(
        "favoriteNameMarvelDeveloper",
        JSON.stringify(getFav)
      );
    }
  }

  function handleRemoveFavorite(name: string) {
    setFavoriteName((arr) => arr.filter((old) => old !== name));
    let getFav = JSON.parse(
      localStorage.getItem("favoriteNameMarvelDeveloper")!
    );
    const returnAllFavorite = getFav.filter((arr: string) => arr !== name);
    localStorage.setItem(
      "favoriteNameMarvelDeveloper",
      JSON.stringify(returnAllFavorite)
    );
  }

  return (
    <FavoriteCharacterContext.Provider
      value={{ favoriteName, handleAddFavorite, handleRemoveFavorite }}
    >
      {children}
    </FavoriteCharacterContext.Provider>
  );
}

export function useFavoriteContextProvider() {
  return useContext(FavoriteCharacterContext);
}
