import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import SidebarTabs from "../components/SidebarTabs";
import TravelSummary from "../components/TravelSummary";
import DetailedSchedule from "../components/DetailedSchedule";
import Route from "../components/Route";
import Checklist from "../components/Checklist";
import Modal from "../components/Modal";
import styles from "./DetailedItineraryPage.module.css";
import KakaoMap from "../components/KakaoMap";

function DetailedItineraryPage() {
  const [activeTab, setActiveTab] = useState("여행 요약");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const tabs = [
    { label: "여행 요약", content: <TravelSummary /> },
    { label: "상세 일정", content: <DetailedSchedule /> },
    { label: "길찾기", content: <Route /> },
    { label: "체크리스트", content: <Checklist /> },
  ];

  // 모달 열기
  const handleConfirmClick = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기 (X 버튼용)
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // 일정 확정 (확인 버튼용)
  const handleConfirm = () => {
    setIsModalOpen(false); // 모달 닫기
    navigate("/mypage"); // 마이페이지로 이동
  };

  return (
    <div className={styles.detailedItineraryPage}>
      {/* 왼쪽 사이드바 영역 */}
      <div className={styles.sidebarContainer}>
        <Sidebar>
          <SidebarTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabClick={setActiveTab}
          />
        </Sidebar>
      </div>

      {/* 오른쪽 지도 영역 */}
      <div className={styles.mapContainer}>
        <KakaoMap />
        <button className={styles.confirmButton} onClick={handleConfirmClick}>
          일정 확정하기
        </button>
      </div>

      {/* 모달 컴포넌트 */}
      {isModalOpen && (
        <Modal
          title="일정 확정"
          message="일정이 확정되면 마이페이지로 이동됩니다. 일정을 확정하시겠습니까?"
          onClose={handleModalClose}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}

export default DetailedItineraryPage;
