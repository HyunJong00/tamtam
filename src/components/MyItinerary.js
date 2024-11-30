import React from "react";
import styles from "./MyItinerary.module.css";
import { useNavigate } from "react-router-dom";

function MyItinerary({ itinerary }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/itinerary/${itinerary.id}`); // 일정 상세 페이지로 이동
  };

  return (
    <div className={styles.card} onClick={handleCardClick}>
      {itinerary.imageUrl && (
        <img
          src={itinerary.imageUrl}
          alt={itinerary.title}
          className={styles.image}
        />
      )}
      <div className={styles.content}>
        <h3 className={styles.title}>{itinerary.title}</h3>
        {itinerary.tags && (
          <div className={styles.tags}>
            {itinerary.tags.split(",").map((tag, index) => (
              <span key={index} className={styles.tag}>
                #{tag.trim()}
              </span>
            ))}
          </div>
        )}
        <div className={styles.date}>{itinerary.date}</div>
      </div>
    </div>
  );
}

export default MyItinerary;
