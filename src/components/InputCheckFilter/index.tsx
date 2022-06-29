import { InputHTMLAttributes } from "react";
import styles from "./InputCheckFilter.module.scss";

export function InputCheckFilter({
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={styles.switch}>
      <input type="checkbox" {...rest} />
      <span className={`${styles.slider} ${styles.round}`}></span>
    </label>
  );
}
