import {
  ArrowArcLeft,
  ArrowBendDoubleUpLeft,
  ArrowDownLeft,
  CaretLeft,
  Heart,
  Star,
} from "phosphor-react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import { CardComic } from "../../components/CardComic";
import { Footer } from "../../components/Footer";
import { api } from "../../services/axios";

import styles from "./CharacterDetail.module.scss";
import { useFavoriteContextProvider } from "../../contexts/FavoriteCharacterContext";

interface CharacterDetailProps {
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  comics: {
    available: number;
  };
  series: {
    available: number;
  };
}

interface ComicProps {
  id: number;
  title: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

export function CharactersDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { favoriteName, handleAddFavorite, handleRemoveFavorite } =
    useFavoriteContextProvider();
  const [dataCharacter, setDataCharacter] = useState<CharacterDetailProps>();
  const [dataComics, setDataComics] = useState<ComicProps[]>([]);
  const [finalDateComic, setDateComic] = useState("");

  const isCharacterFavorite = favoriteName.some(
    (favorite) => favorite === dataCharacter?.name
  );
  const isFavoriteBlock = !isCharacterFavorite && favoriteName.length === 5;

  useEffect(() => {
    async function getCharacters() {
      try {
        const resultCharacter = await api.get(
          `/characters/${id}?ts=2&apikey=7de223381da2a01ec37a15c920c7dc57&hash=72d736266e3888d5923aecb9b3b0c8b6`
        );
        const resultComics = await api.get(
          `/characters/${id}/comics?orderBy=-onsaleDate&limit=10&ts=2&apikey=7de223381da2a01ec37a15c920c7dc57&hash=72d736266e3888d5923aecb9b3b0c8b6`
        );

        const endDateComic: string =
          resultComics.data.data.results[0].dates.filter(
            (date: { type: string }) => date.type === "onsaleDate"
          )[0].date;

        setDateComic(format(new Date(endDateComic), "dd MMM'.'  y"));

        setDataCharacter(resultCharacter.data.data.results[0]);
        setDataComics(resultComics.data.data.results);
      } catch (err) {
        navigate("/");
      } finally {
      }
    }

    getCharacters();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <header>
          <div>
            <button onClick={() => navigate("/")}>
              <CaretLeft size={32} weight="fill" />
              <span>voltar</span>
            </button>
          </div>
          <img src="/src/assets/logo_menor.svg" />
        </header>
        <section className={styles.containerDetail}>
          <div className={styles.contentInfo}>
            <div className={styles.info}>
              <div className={styles.headerInfo}>
                <h1>{dataCharacter?.name}</h1>

                {isCharacterFavorite ? (
                  <Heart
                    weight="fill"
                    size={32}
                    onClick={() => handleRemoveFavorite(dataCharacter?.name!)}
                  />
                ) : (
                  <Heart
                    className={isFavoriteBlock ? styles.block : ""}
                    weight={isFavoriteBlock ? "thin" : "regular"}
                    size={32}
                    onClick={
                      isFavoriteBlock
                        ? () => {}
                        : () => handleAddFavorite(dataCharacter?.name!)
                    }
                  />
                )}
              </div>
              <p>
                {dataCharacter?.description === ""
                  ? "Nenhuma descrição encontrada"
                  : dataCharacter?.description}
              </p>
            </div>

            <div className={styles.contentStatus}>
              <div className={styles.status}>
                <div>
                  <span>Quadrinhos</span>
                  <span>
                    <img src="/src/assets/ic_quadrinhos.svg" alt="" />
                    {dataCharacter?.comics.available}
                  </span>
                </div>
                <div>
                  <span>Filmes</span>
                  <span>
                    <img src="/src/assets/ic_trailer.svg" alt="" />
                    {dataCharacter?.series.available}
                  </span>
                </div>
              </div>

              <span className={styles.rating}>
                Rating:
                <Star size={16} weight="fill" color="red" />
                <Star size={16} weight="fill" color="red" />
                <Star size={16} weight="regular" color="red" />
                <Star size={16} weight="regular" color="red" />
                <Star size={16} weight="regular" color="red" />
              </span>
              <span>Último quadrinho: {finalDateComic}</span>
            </div>
          </div>
          <div className={styles.image}>
            <img
              src={`${dataCharacter?.thumbnail.path}/detail.${dataCharacter?.thumbnail.extension}`}
              alt=""
            />
          </div>
        </section>

        <section className={styles.sectionComics}>
          <h2>Últimos lançamentos</h2>

          <div className={styles.comics}>
            {dataComics.map((comic) => (
              <CardComic
                key={comic.id}
                image={comic.thumbnail}
                title={comic.title}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
