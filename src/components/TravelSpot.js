import React from "react";
import styles from "./TravelSpot.module.css";

function TravelSpot({ spotData }) {
  const { imageUrl, name, category, info, address } = spotData; // spotData에서 필요한 데이터 추출

  return (
    <div className={styles.spotContainer}>
      <img src={imageUrl} alt={name} className={styles.image} />
      <div className={styles.description}>
        <span className={styles.name}>{name}</span>
        <span className={styles.category}>{category}</span>
        <span className={styles.info}>{info}</span>
        <span className={styles.address}>{address}</span>
      </div>
    </div>
  );
}

export default TravelSpot;
