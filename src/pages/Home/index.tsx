import styles from "./home.module.scss";
import { MagnifyingGlass } from "phosphor-react";
import { CardHeroes } from "../../components/CardHeroes";
import { useEffect, useState } from "react";
import { api } from "../../services/axios";

interface CharactersParams {
  id: number;
  name: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

export function Home() {
  const [characters, setCharacters] = useState<CharactersParams[]>([]);
  const [idCharacter, setIdCharacter] = useState(0);

  useEffect(() => {
    async function getCharacters() {
      const result = await api.get(
        "/characters?ts=2&apikey=7de223381da2a01ec37a15c920c7dc57&hash=72d736266e3888d5923aecb9b3b0c8b6"
      );

      console.log(result.data.data.results);

      setCharacters(result.data.data.results);
    }

    getCharacters();
  }, []);

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
        {characters.map((character) => (
          <CardHeroes
            id={character.id}
            key={character.id}
            image={character.thumbnail}
            name={character.name}
          />
        ))}
      </main>
    </div>
  );
}
