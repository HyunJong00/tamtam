import React, { useState, useEffect } from "react";
import styles from "./Route.module.css";

function Route() {
  const [itinerary, setItinerary] = useState([]);
  const [activeDay, setActiveDay] = useState("day1");

  useEffect(() => {
    const mockApiData = [
      {
        day: "day1",
        placeName: "서울역",
        latitude: 37.556,
        longitude: 126.972,
      },
      {
        day: "day1",
        placeName: "남산타워",
        latitude: 37.551,
        longitude: 126.988,
      },
      {
        day: "day1",
        placeName: "명동",
        latitude: 37.563,
        longitude: 126.982,
      },
    ];
    setItinerary(mockApiData);
  }, []);

  const filteredPlaces = itinerary.filter((item) => item.day === activeDay);

  const handleRouteClick = (start, end) => {
    const baseUrl = "https://map.kakao.com/link/to";
    const startInfo = `${start.placeName},${start.latitude},${start.longitude}`;
    const endInfo = `${end.placeName},${end.latitude},${end.longitude}`;
    const kakaoLink = `${baseUrl}/${endInfo}/from/${startInfo}`;
    window.open(kakaoLink, "_blank"); // 새 탭에서 링크 열기
  };

  return (
    <div className={styles.app}>
      <h1>여행 일정</h1>

      {/* 날짜별 탭 */}
      <div className={styles.tabs}>
        {["day1"].map((day) => (
          <button
            key={day}
            className={`${styles.tab} ${day === activeDay ? styles.activeTab : ""}`}
            onClick={() => setActiveDay(day)}
          >
            {day.toUpperCase()}
          </button>
        ))}
      </div>

      {/* 여행지 리스트 */}
      <div className={styles.list}>
        {filteredPlaces.map((place, index) => {
          const nextPlace = filteredPlaces[index + 1];
          return nextPlace ? (
            <div
              key={index}
              className={styles.listItem}
              onClick={() => handleRouteClick(place, nextPlace)} // 클릭 시 Kakao 지도 링크로 이동
            >
              {place.placeName} → {nextPlace.placeName}
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
}

export default Route;
