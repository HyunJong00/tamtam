import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import PlacePreview from "../components/TamtamPlacePreview";
import styles from "./TamtamPage.module.css";
import iconSend from "../assets/icon_send.png";
import iconGptProfile from "../assets/icon_gptprofile.png";
import iconUserProfile from "../assets/icon_userprofile.png"; // 기본 프로필 이미지
import iconClear from "../assets/icon_clear.png"; // 초기화 아이콘 임포트
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

function TamtamPage() {
  const itinerary = 4; // 4박 5일 일정 (모크)
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false); // 입력창 포커스 상태 관리
  const [messages, setMessages] = useState([]); // 채팅 메시지 상태
  const navigate = useNavigate();

  // 모크 사용자 데이터
  const mockUserData = {
    profileImage: iconUserProfile, // 기본 프로필 이미지 사용
    nickname: "여행이 가고 싶은 예림",
  };

  const addMessage = (text, isUser) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: uuidv4(), sender: isUser ? "user" : "GPT", text },
    ]);
  };

  const handleDetailsClick = () => {
    console.log("Show detailed itinerary");
  };

  const handleSendMessage = async () => {
    if (message.trim() !== "") {
      addMessage(message, true); // 사용자 메시지 추가
      setMessage(""); // 입력창 초기화

      try {
        // 백엔드 서버와 통신하여 GPT 응답 받기
        const response = await axios.post("백엔드 API 실제 주소", {
          prompt: message,
        });

        // GPT로부터 받은 응답을 채팅창에 추가
        if (response.data) {
          addMessage(response.data.responseText || "응답이 없습니다.", false);
        }
      } catch (error) {
        console.error("Error fetching GPT response:", error);
        addMessage("Error: 응답을 가져올 수 없습니다.", false);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Shift + Enter로 줄바꿈, Enter로 전송
      handleSendMessage();
    }
  };

  const handleReset = () => {
    setMessages([]);
  };

  const handleProfileClick = () => {
    navigate("/mypage"); // 마이페이지로 이동
  };

  return (
    <div className={styles.container}>
      <Sidebar>
        <PlacePreview
          itinerary={itinerary}
          onDetailsClick={handleDetailsClick}
        />
      </Sidebar>

      {/* 메인 콘텐츠 영역 */}
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <p className={styles.title}>탐탐이와 여행 계획하기</p>
            <img
              src={iconClear}
              alt="초기화"
              className={styles.resetButton}
              onClick={handleReset}
              title="대화 내역 초기화 하기" // 툴팁 메시지
            />
          </div>
          <div className={styles.profileContainer} onClick={handleProfileClick}>
            <img
              src={mockUserData.profileImage}
              alt="User Profile"
              className={styles.profileImage}
            />
            <span className={styles.profileName}>{mockUserData.nickname}</span>
          </div>
        </div>

        {/* 채팅창 */}
        <div className={styles.chatWindow}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={
                msg.sender === "GPT"
                  ? styles.gptMessageContainer
                  : styles.userMessageContainer
              }
            >
              {msg.sender === "GPT" && (
                <img
                  src={iconGptProfile}
                  alt="GPT Profile"
                  className={styles.gptProfileIcon}
                />
              )}
              <div
                className={
                  msg.sender === "user" ? styles.userBubble : styles.gptBubble
                }
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* 채팅 입력창 */}
        <div className={styles.chatInputContainer}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="메시지 보내기"
            className={`${styles.chatInput} ${isFocused ? styles.focused : ""}`}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            rows={1}
          />
          <img
            src={iconSend}
            alt="send"
            className={styles.sendIcon}
            onClick={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
}

export default TamtamPage;
