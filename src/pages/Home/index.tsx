import styles from "./home.module.scss";
import { ArrowFatLinesUp, Heart } from "phosphor-react";
import { CardHeroes } from "../../components/CardHeroes";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { InputSearch } from "../../components/InputSearch";
import { InputCheckFilter } from "../../components/InputCheckFilter";
import { useFavoriteContextProvider } from "../../contexts/FavoriteCharacterContext";
import { generateHash, timestamp } from "../../utils/generateHashUrl";

import logo from "/src/assets/logo.svg";
import heroi from "/src/assets/ic_heroi.svg";
import { UseSkeletonLoading } from "../../components/SkeletonLoadingCard";
import {
  getCharactersAPI,
  getCharacterWithName,
  getMoreCharacters,
} from "../../requestsAPI/characters";

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
  const [listPaginate, setListPaginate] = useState(20);

  const [loading, setLoading] = useState(false);
  const [loadingMoreHeroes, setLoadingMoreHeroes] = useState(false);
  const [errorRequest, setErrorRequest] = useState(false);

  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  async function getCharacters(orderByName: boolean) {
    try {
      setLoading(true);

      const result = await getCharactersAPI(
        orderByName,
        timestamp,
        generateHash
      );

      if (result) {
        setErrorRequest(false);
      }

      setCharacters(result.data.data.results);
    } catch (err) {
      setErrorRequest(true);
    } finally {
      setLoading(false);
    }
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
    const result = await getCharacterWithName(value, timestamp, generateHash);

    setCharacters(result.data.data.results);
  }, 500);

  async function handleLoadedMoreHeroes() {
    try {
      setLoadingMoreHeroes(true);
      const result = await getMoreCharacters(
        checkFilterOrderName,
        listPaginate,
        timestamp,
        generateHash
      );

      const data = result.data.data.results;

      setListPaginate((paginate) => paginate + 20);
      setCharacters((characters) => [...characters, ...data]);
    } finally {
      setLoadingMoreHeroes(false);
    }
  }

  return (
    <div className={styles.container}>
      {scrollPosition > 1000 && (
        <div className={styles.pageUp}>
          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
              })
            }
          >
            <ArrowFatLinesUp size={26} />
          </button>
        </div>
      )}
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
                  checked={checkFilterOrderName}
                  onChange={(e) => setCheckFilterOrderName(e.target.checked)}
                />
              </div>
              <div>
                <span>
                  <Heart weight="fill" size={22} />
                  Somente favoritos
                </span>
                <InputCheckFilter
                  checked={checkFilterFavorite}
                  onChange={(e) => setCheckFilterFavorite(e.target.checked)}
                />
              </div>
            </div>
          </div>

          {loading ? (
            <div className={styles.contentCards}>
              <UseSkeletonLoading />
            </div>
          ) : (
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
          )}
          {loadingMoreHeroes ? (
            <div className={styles.contentCards}>
              <UseSkeletonLoading />
            </div>
          ) : (
            <>
              {checkFilterFavorite ? (
                ""
              ) : (
                <>
                  {!errorRequest && (
                    <div className={styles.loadingMoreHeroes}>
                      <button onClick={handleLoadedMoreHeroes}>
                        Carregar mais personagens
                      </button>
                    </div>
                  )}
                </>
              )}
            </>
          )}
          {checkFilterFavorite && favoriteName.length === 0 && (
            <div className={styles.noneCharacterFavorite}>
              <span>Nenhum personagem encontrado</span>
            </div>
          )}
          {errorRequest && (
            <div className={styles.noneCharacterFavorite}>
              <span>Nenhum personagem encontrado</span>
            </div>
          )}
        </>
      </main>
    </div>
  );
}
