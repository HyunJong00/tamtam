import React, { useState, useEffect } from "react";
import TravelSpot from "./TravelSpot";
import styles from "./DetailedSchedule.module.css"; // CSS 스타일 모듈

const DetailedSchedule = () => {
  const [activeDay, setActiveDay] = useState(1); // 현재 활성화된 날짜
  const [itineraryDays, setItineraryDays] = useState([]); // 여행 일정 데이터

  // JSON 데이터를 fetch로 가져오기
  useEffect(() => {
    async function fetchItineraryData() {
      try {
        const response = await fetch("/mockdata/mockItinerary.json");
        if (!response.ok) {
          throw new Error("Failed to fetch itinerary data");
        }
        const data = await response.json();

        // 데이터를 배열 형식으로 변환하여 상태 업데이트
        const formattedData = Object.keys(data).map((dayKey) => ({
          day: dayKey,
          spots: data[dayKey],
        }));
        setItineraryDays(formattedData);
      } catch (error) {
        console.error("Error fetching itinerary data:", error);
      }
    }

    fetchItineraryData();
  }, []);

  const handleTabClick = (dayIndex) => {
    setActiveDay(dayIndex);
  };

  return (
    <div className={styles.detailedSchedule}>
      {/* 탭 버튼 */}
      <div className={styles.tabs}>
        {itineraryDays.map((day, index) => (
          <button
            key={index}
            className={`${styles.tabButton} ${
              activeDay === index + 1 ? styles.active : ""
            }`}
            onClick={() => handleTabClick(index + 1)}
          >
            {index + 1}일차
          </button>
        ))}
      </div>

      {/* 선택된 날짜의 여행 스팟 렌더링 */}
      <div className={styles.spotList}>
        {itineraryDays[activeDay - 1]?.spots.map((spot, idx) => (
          <TravelSpot key={idx} spotData={spot} />
        )) || <p>데이터를 불러오는 중입니다...</p>}
      </div>
    </div>
  );
};

export default DetailedSchedule;
