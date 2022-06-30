import styles from "./CardHeroes.module.scss";
import { Heart } from "phosphor-react";
import { Link } from "react-router-dom";
import { useFavoriteContextProvider } from "../../contexts/FavoriteCharacterContext";

interface CardHeroesProps {
  id: number;
  image: {
    path: string;
    extension: string;
  };
  name: string;
}

export function CardHeroes({ id, image, name }: CardHeroesProps) {
  const { favoriteName, handleAddFavorite, handleRemoveFavorite } =
    useFavoriteContextProvider();
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
            onClick={() => handleRemoveFavorite(name)}
          />
        ) : (
          <Heart
            weight={numberOfFavoriteLimit < 5 ? "bold" : "thin"}
            className={
              numberOfFavoriteLimit === 5
                ? styles.blockFavorite
                : styles.Favorite
            }
            onClick={() => numberOfFavoriteLimit < 5 && handleAddFavorite(name)}
          />
        )}
      </div>
    </div>
  );
}
