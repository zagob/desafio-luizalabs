import styles from "./home.module.scss";
import { MagnifyingGlass } from "phosphor-react";
import { CardHeroes } from "../../components/CardHeroes";

export function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img src="src/assets/logo.svg" alt="Logo da marvel" />

        <h1>Explore o universo</h1>
        <span>
          Mergulhe no domínio deslumbrante de todos os personagens clássicos que
          você ama - e aqueles que você descobrirá em breve!
        </span>
      </header>

      <div className={styles.search}>
        <MagnifyingGlass />
        <input placeholder="Procure por heróis" />
      </div>

      <main className={styles.contentCards}>
        <CardHeroes />
        <CardHeroes />
        <CardHeroes />
        <CardHeroes />
        <CardHeroes />
        <CardHeroes />
        <CardHeroes />
      </main>
    </div>
  );
}
