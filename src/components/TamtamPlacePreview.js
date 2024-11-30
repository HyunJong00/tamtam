import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
import TravelSpot from "./TravelSpot";
import styles from "./TamtamPlacePreview.module.css";

function TamtamPlacePreview() {
  const [selectedDay, setSelectedDay] = useState("Day 1");
  const [days, setDays] = useState([]);
  const [travelSpotsByDay, setTravelSpotsByDay] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTravelSpots() {
      try {
        // JSON 파일에서 데이터 가져오기 (추후 API 연결 예정)
        const response = await fetch("/mockdata/mockItinerary.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        // 날짜별 키 (Day 1, Day 2 등)를 추출
        const dayKeys = Object.keys(data);
        setDays(dayKeys);
        setSelectedDay(dayKeys[0]); // 첫 번째 날짜 기본값으로 설정
        setTravelSpotsByDay(data);
      } catch (error) {
        console.error("Error fetching travel spots:", error);
      }
    }

    fetchTravelSpots();
  }, []);

  return (
    <div className={styles.previewContainer}>
      <div className={styles.previeTitle}>
        <p>추천 장소 미리보기</p>
      </div>
      <div className={styles.previewSection}>
        <div className={styles.dropdownContainer}>
          <Dropdown
            options={days}
            selectedOption={selectedDay}
            onOptionSelect={setSelectedDay}
          />
          <button
            className={styles.detailButton}
            onClick={() => navigate("/detailed-itinerary")}
          >
            여행 상세 일정 확인하기
          </button>
        </div>
        <div className={styles.placeList}>
          {travelSpotsByDay[selectedDay]?.map((spot, index) => (
            <TravelSpot key={index} spotData={spot} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TamtamPlacePreview;
