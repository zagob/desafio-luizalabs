import { Heart } from "phosphor-react";
import styles from "./CardHeroes.module.scss";

export function CardHeroes() {
  return (
    <div className={styles.content}>
      <img src="https://terrigen-cdn-dev.marvel.com/content/prod/1x/038mmk_com_crd_01.jpg" />
      {/* <img src="asd" /> */}
      <div className={styles.footerCard}>
        <span>Star-Lord</span>
        <Heart />
      </div>
    </div>
  );
}
