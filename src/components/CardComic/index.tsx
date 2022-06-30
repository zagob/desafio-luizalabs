import styles from "./CardComic.module.scss";

interface ComicProps {
  image: {
    path: string;
    extension: string;
  };
  title: string;
}

export function CardComic({ image, title }: ComicProps) {
  return (
    <div className={styles.cardComic}>
      <img
        src={`${image.path}/portrait_medium.${image.extension}`}
        alt={title}
      />
      <span>{title}</span>
    </div>
  );
}
