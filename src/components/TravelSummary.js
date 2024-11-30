import React, { useEffect, useState } from "react";
import TravelSpot from "./TravelSpot";
import styles from "./TravelSummary.module.css";

function TravelSummary({ userName = "예림", itineraryDays = 2 }) {
  const [itinerarySummary, setItinerarySummary] = useState({
    totalDistance: "",
    totalPlaces: 0,
    tags: [],
  });
  const [sampleHighlights, setSampleHighlights] = useState([]);

  useEffect(() => {
    async function fetchItineraryData() {
      try {
        // mock 데이터 사용 (추후 API 연결 예정)
        const response = await fetch("../mockdata/mockItinerary.json");
        const data = await response.json();

        // 총 요약 정보 계산
        const totalPlaces = Object.values(data).flat().length; // 모든 장소의 수
        const tags = ["#액티비티", "#테마파크", "#바다"]; // 샘플 태그
        const totalDistance = "70km"; // 이동거리 샘플 데이터

        setItinerarySummary({
          totalDistance,
          totalPlaces,
          tags,
        });

        // 하이라이트 데이터 변환
        const highlights = Object.keys(data).map((dayKey) => ({
          day: dayKey,
          highlights: data[dayKey],
        }));

        setSampleHighlights(highlights);
      } catch (error) {
        console.error("Error fetching itinerary data:", error);
      }
    }

    fetchItineraryData();
  }, []);

  return (
    <div className={styles.container}>
      {/* 요약 카드 */}
      <div className={styles.itinerarySummary}>
        <p>
          <b>{userName}</b>님을 위한 {itineraryDays}박 {itineraryDays + 1}일
          여행코스
        </p>
        <p>
          <b>총 이동거리</b> | {itinerarySummary.totalDistance}
        </p>
        <p>총 {itinerarySummary.totalPlaces}개 여행지/음식점/카페/숙소</p>
        <p>{itinerarySummary.tags.join(" ")}</p>
      </div>

      {/* 하이라이트 */}
      <div className={styles.highlights}>
        {sampleHighlights.map((day) => (
          <div key={day.day} className={styles.dayHighlights}>
            <h3>{day.day}</h3>
            <div className={styles.places}>
              {day.highlights.map((spot, index) => (
                <TravelSpot key={index} spotData={spot} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TravelSummary;
