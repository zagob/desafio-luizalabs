import { Heart } from "phosphor-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { api } from "../../services/axios";

import styles from "./CharacterDetail.module.scss";

interface CharacterDetailProps {
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

export function CharactersDetail() {
  const { id } = useParams<{ id: string }>();
  const [dataCharacter, setDataCharacter] = useState<CharacterDetailProps>();

  useEffect(() => {
    async function getCharacters() {
      const result = await api.get(
        `/characters/${id}?ts=2&apikey=7de223381da2a01ec37a15c920c7dc57&hash=72d736266e3888d5923aecb9b3b0c8b6`
      );

      console.log(result.data.data.results[0]);

      setDataCharacter(result.data.data.results[0]);
    }

    getCharacters();
  }, []);

  console.log("id", id);
  return (
    <>
      <section className={styles.containerDetail}>
        <div className={styles.info}>
          <div className={styles.headerInfo}>
            <h1>{dataCharacter?.name}</h1>
            <Heart size={22} />
          </div>
          <p>{dataCharacter?.description}</p>

          <div className={styles.status}>
            <div>
              <span>Quadrinhos</span>
              <span>
                <img src="/src/assets/ic_quadrinhos.svg" alt="" />
                3.000
              </span>
            </div>
            <div>
              <span>Filmes</span>
              <span>
                <img src="/src/assets/ic_trailer.svg" alt="" />
                40
              </span>
            </div>
          </div>

          <span>Rating: </span>
          <span>Último quadrinho: 13 fev. 2020</span>
        </div>
        <div className={styles.image}>
          <img
            src={`${dataCharacter?.thumbnail.path}/portrait_xlarge.${dataCharacter?.thumbnail.extension}`}
            alt=""
          />
        </div>
      </section>
    </>
  );
}
