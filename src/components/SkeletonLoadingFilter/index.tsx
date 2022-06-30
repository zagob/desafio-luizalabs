import styles from "./SkeletonLoadingFilter.module.scss";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function SkeletonLoadingFilter() {
  return (
    <div className={styles.contentFilter}>
      <Skeleton width="160px" baseColor="#CBD5E1" highlightColor="#c1c9d3" />

      <div className={styles.filters}>
        <div>
          <span>
            <Skeleton
              width="180px"
              baseColor="#CBD5E1"
              highlightColor="#c1c9d3"
            />
          </span>
          <Skeleton
            width="50px"
            baseColor="#CBD5E1"
            highlightColor="#c1c9d3"
            borderRadius="40px"
          />
        </div>
        <div>
          <span>
            <Skeleton
              width="140px"
              baseColor="#CBD5E1"
              highlightColor="#c1c9d3"
            />
          </span>
          <Skeleton
            width="50px"
            borderRadius="40px"
            baseColor="#CBD5E1"
            highlightColor="#c1c9d3"
          />
        </div>
      </div>
    </div>
  );
}
