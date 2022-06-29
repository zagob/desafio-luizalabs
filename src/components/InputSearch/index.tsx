import { MagnifyingGlass } from "phosphor-react";
import { InputHTMLAttributes } from "react";
import styles from "./InputSearch.module.scss";

export function InputSearch({
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={styles.search}>
      <MagnifyingGlass />
      <input {...rest} placeholder="Procure por heróis" />
    </div>
  );
}
