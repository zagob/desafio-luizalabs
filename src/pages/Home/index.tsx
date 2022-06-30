import styles from "./home.module.scss";
import { Heart, MagnifyingGlass } from "phosphor-react";
import { CardHeroes } from "../../components/CardHeroes";
import { useEffect, useState } from "react";
import { api } from "../../services/axios";
import { useDebouncedCallback } from "use-debounce";
import { InputSearch } from "../../components/InputSearch";
import { InputCheckFilter } from "../../components/InputCheckFilter";
import { useFavoriteContextProvider } from "../../contexts/FavoriteCharacterContext";
import { generateHash, timestamp } from "../../utils/generateHashUrl";

import logo from "/src/assets/logo.svg";
import heroi from "/src/assets/ic_heroi.svg";
import {
  SkeletonLoadingCard,
  UseSkeletonLoading,
} from "../../components/SkeletonLoadingCard";
import { SkeletonLoadingFilter } from "../../components/SkeletonLoadingFilter";

interface CharactersParams {
  id: number;
  name: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

export function Home() {
  const { favoriteName } = useFavoriteContextProvider();

  const [characters, setCharacters] = useState<CharactersParams[]>([]);
  const [checkFilterOrderName, setCheckFilterOrderName] = useState(false);
  const [checkFilterFavorite, setCheckFilterFavorite] = useState(false);

  const [loading, setLoading] = useState(false);

  async function getCharacters(orderByName: boolean) {
    setLoading(true);
    const result = await api.get(
      `/characters?orderBy=${
        orderByName ? "-name" : "name"
      }&ts=${timestamp}&apikey=${
        import.meta.env.VITE_PUBLIC_KEY
      }&hash=${generateHash}`
    );

    if (result) {
      setLoading(false);
    }

    setCharacters(result.data.data.results);
  }

  useEffect(() => {
    if (!checkFilterFavorite) {
      getCharacters(checkFilterOrderName);
    }
  }, [checkFilterOrderName, checkFilterFavorite]);

  useEffect(() => {
    if (checkFilterFavorite) {
      setCharacters((old) =>
        old.filter((item) => favoriteName.some((name) => name === item.name))
      );
    }
  }, [checkFilterFavorite, favoriteName]);

  const debounced = useDebouncedCallback(async (value: string) => {
    if (value.trim() === "") {
      getCharacters(checkFilterOrderName);
      return;
    }
    const result = await api.get(
      `/characters?name=${value}&ts=${timestamp}&apikey=${
        import.meta.env.VITE_PUBLIC_KEY
      }&hash=${generateHash}`
    );
    setCharacters(result.data.data.results);
  }, 500);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img src={logo} alt="Logo da marvel" />

        <h1>Explore o universo</h1>
        <span>
          Mergulhe no domínio deslumbrante de todos os personagens clássicos que
          você ama - e aqueles que você descobrirá em breve!
        </span>
      </header>

      <InputSearch onChange={(e) => debounced(e.target.value)} />

      <main className={styles.main}>
        {loading ? (
          <>
            <SkeletonLoadingFilter />
            <div className={styles.contentCards}>
              <UseSkeletonLoading />
            </div>
          </>
        ) : (
          <>
            <div className={styles.contentFilter}>
              <span>Encontrados {characters.length} heróis</span>

              <div className={styles.filters}>
                <div>
                  <span>
                    <img src={heroi} alt="icone heroi" />
                    ordenar por nome - A/Z
                  </span>
                  <InputCheckFilter
                    onChange={(e) => setCheckFilterOrderName(e.target.checked)}
                  />
                </div>
                <div>
                  <span>
                    <Heart weight="fill" size={22} />
                    Somente favoritos
                  </span>
                  <InputCheckFilter
                    onChange={(e) => setCheckFilterFavorite(e.target.checked)}
                  />
                </div>
              </div>
            </div>

            <div className={styles.contentCards}>
              {characters.map((character) => (
                <CardHeroes
                  id={character.id}
                  key={character.id}
                  image={character.thumbnail}
                  name={character.name}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
