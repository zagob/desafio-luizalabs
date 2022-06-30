import styles from "./SkeletonLoadingCard.module.scss";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function SkeletonLoadingCard() {
  return (
    <div className={styles.content}>
      <Skeleton
        baseColor="#CBD5E1"
        highlightColor="#c1c9d3"
        height="200px"
        width="200px"
      />
      <br />
      <div className={styles.footer}>
        <Skeleton
          width="120px"
          height="12px"
          baseColor="#CBD5E1"
          highlightColor="#c1c9d3"
        />
        <Skeleton
          width="16px"
          height="16px"
          circle
          baseColor="#CBD5E1"
          highlightColor="#c1c9d3"
        />
      </div>
    </div>
  );
}

export function UseSkeletonLoading() {
  return (
    <>
      <SkeletonLoadingCard />
      <SkeletonLoadingCard />
      <SkeletonLoadingCard />
      <SkeletonLoadingCard />
      <SkeletonLoadingCard />
      <SkeletonLoadingCard />
      <SkeletonLoadingCard />
      <SkeletonLoadingCard />
      <SkeletonLoadingCard />
      <SkeletonLoadingCard />
    </>
  );
}
