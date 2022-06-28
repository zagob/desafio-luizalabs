import { Heart } from "phosphor-react";
import styles from "./CardHeroes.module.scss";
import { Link } from "react-router-dom";
import { useState } from "react";

interface CardHeroesProps {
  id: number;
  image: {
    path: string;
    extension: string;
  };
  name: string;
}

export function CardHeroes({
  id,
  image,
  name
}: CardHeroesProps) {
  return (
    <div className={styles.content}>
      <Link to={`/details/${id}`}>
        <img src={`${image.path}/portrait_xlarge.${image.extension}`} />
      </Link>

      <div className={styles.footerCard}>
        <span>{name}</span>
        <Heart weight="fill" onClick={() => console.log("favoriteee")} />
      </div>
    </div>
  );
}
