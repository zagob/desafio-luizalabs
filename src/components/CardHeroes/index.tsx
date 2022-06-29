import { Heart } from "phosphor-react";
import styles from "./CardHeroes.module.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

interface CardHeroesProps {
  id: number;
  image: {
    path: string;
    extension: string;
  };
  name: string;
  favoriteName: string[];
  onHandleAddFavorite: (name: string) => void;
  onHandleRemoveFavorite: (name: string) => void;
}

export function CardHeroes({
  id,
  image,
  name,
  onHandleAddFavorite,
  onHandleRemoveFavorite,
  favoriteName,
}: CardHeroesProps) {
  const getNameFavorite = localStorage.getItem(name);
  const hasFavorite =
    favoriteName.some((oldName) => oldName === name) ||
    getNameFavorite === name;
  const numberOfFavoriteLimit = favoriteName.length;

  return (
    <div className={styles.content}>
      <Link to={`/details/${id}`}>
        <img src={`${image.path}/standard_xlarge.${image.extension}`} />
      </Link>

      <div className={styles.footerCard}>
        <span>{name}</span>

        {hasFavorite ? (
          <Heart
            className={styles.Favorite}
            weight="fill"
            onClick={() => onHandleRemoveFavorite(name)}
          />
        ) : (
          <Heart
            weight={numberOfFavoriteLimit < 5 ? "bold" : "thin"}
            className={
              numberOfFavoriteLimit === 5
                ? styles.blockFavorite
                : styles.Favorite
            }
            onClick={() =>
              numberOfFavoriteLimit < 5 && onHandleAddFavorite(name)
            }
          />
        )}
      </div>
    </div>
  );
}
