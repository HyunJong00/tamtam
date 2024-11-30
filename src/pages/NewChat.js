import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import PlacePreview from "../components/TamtamPlacePreview";
import Calendar from "../components/Calendar";
import WithWhom from "../components/WithWhom";
import Thema from "../components/Thema";
import styles from "./NewChat.module.css";
import iconSend from "../assets/icon_send.png";
import iconGptProfile from "../assets/icon_gptprofile.png";
import iconUserProfile from "../assets/icon_userprofile.png";
import iconClear from "../assets/icon_clear.png";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

function NewChat() {
  const itinerary = 4;
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [messages, setMessages] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [selectedCompanion, setSelectedCompanion] = useState(null);
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false); // 일정 생성 중 상태
  const navigate = useNavigate();
  const chatWindowRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [isGreetingAccepted, setIsGreetingAccepted] = useState(false); // 첫 트리거
  const [greetingMessage, setGreetingMessage] = useState(""); // 서버에서 받은 인삿말
  const [isWaitingForModify, setIsWaitingForModify] = useState(false); // Modify 대기
  const ngrokUrl = "http://your-ngrok-url.ngrok.io"; // 백엔드 서버 (ngrok URL)

  const mockUserData = {
    profileImage: iconUserProfile,
    nickname: "여행이 가고 싶은 예림",
  };

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Observe chatWindow size change
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      scrollToBottom(); // chatWindow 크기 변경 시 아래로 스크롤
    });
    if (chatWindowRef.current) {
      observer.observe(chatWindowRef.current);
    }
    return () => {
      if (chatWindowRef.current) {
        observer.unobserve(chatWindowRef.current); // cleanup observer
      }
    };
  }, []);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // greeting API 연결
  const handleGreeting = async () => {
    if (greetingMessage) return; // 이미 메시지가 존재하면 함수 종료

    try {
      const response = await axios.post(`${ngrokUrl}/greeting`, {
        front_input: "탐탐이와 여행 일정 시작",
      });
      const generateResponse = response.data.response;

      // 상태 업데이트 및 메시지 추가
      setGreetingMessage(generateResponse);
      setIsGreetingAccepted(true);
    } catch (error) {
      console.error("Greeting 요청 오류:", error);
      addMessage("탐탐이가 응답하지 않습니다. 다시 시도해주세요.", false);
    }
  };

  // plan API 연결
  const handleConfirm = () => {
    const requestData = {
      travel_date: `${dateRange[0].toLocaleDateString()} ~ ${dateRange[1].toLocaleDateString()}`,
      travel_days: Math.ceil(
        (dateRange[1] - dateRange[0]) / (1000 * 60 * 60 * 24)
      ),
      travel_mate: selectedCompanion,
      travel_theme: selectedThemes.join(", "),
    };

    setIsGenerating(true); // 로딩 시작

    axios
      .post(`${ngrokUrl}/plan`, requestData)
      .then((response) => {
        const planResponse = response.data.response;
        const followUp = response.data.follow_up;

        // Plan 응답 버블
        addMessage(planResponse, false);
        addMessage(followUp, false);

        // Modify 입력 대기 상태
        setIsWaitingForModify(true);
      })
      .catch((error) => {
        console.error("Plan 요청 오류:", error);
        addMessage(
          "Error: 일정 생성에 실패했습니다. 다시 시도해주세요.",
          false
        );
      })
      .finally(() => {
        setIsGenerating(false); // 로딩 상태 종료
      });
  };

  // modify API 연결
  const handleModifyRequest = (modifyRequest) => {
    setIsGenerating(true); // 로딩 시작
    axios
      .post(`${ngrokUrl}/modify`, { modify_request: modifyRequest })
      .then((response) => {
        const modifyResponse = response.data.response;
        const followUp = response.data.follow_up;

        // Modify 응답 버블 추가
        addMessage(modifyResponse, false);
        addMessage(followUp, false);

        // Modify 대기 상태
        setIsWaitingForModify(true);
      })
      .catch((error) => {
        console.error("Modify 요청 오류:", error);
        addMessage(
          "Error: 일정 수정에 실패했습니다. 다시 시도해주세요.",
          false
        );
      })
      .finally(() => {
        setIsGenerating(false); // 로딩 종료
      });
  };

  const addMessage = (text, isUser) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: uuidv4(), sender: isUser ? "user" : "GPT", text },
    ]);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    addMessage(message, "user");

    if (isWaitingForModify) {
      handleModifyRequest(message); // 수정 요청 처리
    }

    setMessage("");
  };

  const handleReset = () => {
    setMessages([]);
    setDateRange([null, null]);
    setSelectedCompanion(null);
    setSelectedThemes([]);
    setIsGenerating(false); // 초기화 시 일정 생성 상태도 리셋
    setIsGreetingAccepted(false); // Greeting 초기화
    setGreetingMessage(""); // Greeting 메시지 초기화
  };

  const handleProfileClick = () => {
    navigate("/mypage");
  };

  const handleCompanionSelect = (companion) => {
    setSelectedCompanion(companion);
  };

  const handleThemeSelectionChange = (themes) => {
    setSelectedThemes(themes);
  };

  const isDateRangeSelected = dateRange[0] && dateRange[1];

  return (
    <div className={styles.container}>
      {/* Sidebar 영역 */}
      <Sidebar>
        <PlacePreview itinerary={itinerary} />
      </Sidebar>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <p className={styles.title}>탐탐이와 여행 계획하기</p>
            <img
              src={iconClear}
              alt="초기화"
              className={styles.resetButton}
              onClick={handleReset}
              title="대화 초기화"
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

        {/* Greeting 버튼 및 아이콘 */}
        {!isGreetingAccepted && (
          <div className={styles.greetingContainer}>
            <img
              src={iconGptProfile}
              alt="GPT Profile"
              className={styles.gptProfileIconLarge}
            />
            <button className={styles.greetingButton} onClick={handleGreeting}>
              탐탐이와 대화 시작하기
            </button>
          </div>
        )}

        {/* Chat Window - Greeting 후 표시 */}
        {isGreetingAccepted && (
          <div className={styles.chatWindow} ref={chatWindowRef}>
            {/* 서버에서 받은 인삿말 표시 */}
            {greetingMessage && (
              <div className={styles.gptMessageContainer}>
                <img
                  src={iconGptProfile}
                  alt="GPT Profile"
                  className={styles.gptProfileIcon}
                />
                <div className={styles.gptBubble}>{greetingMessage}</div>
              </div>
            )}

            {/* 날짜 선택 UI */}
            <div className={styles.questionStyle}>
              <div className={styles.calendarStyle}>
                <Calendar dateRange={dateRange} onChange={setDateRange} />
                <span className={styles.gptBubble}>
                  언제 여행을 떠나시나요?
                </span>
              </div>
              <span className={styles.userBubble}>
                {dateRange[0] ? dateRange[0].toLocaleDateString() : null}
                {dateRange[1] && dateRange[0] !== dateRange[1]
                  ? ` ~ ${dateRange[1].toLocaleDateString()}`
                  : ""}
              </span>
            </div>

            {/* 동반자 선택 */}
            {isDateRangeSelected && (
              <div className={styles.questionStyle}>
                <div>
                  <span className={styles.gptBubble}>
                    누구와 함께 여행을 떠나시나요?
                  </span>
                  <WithWhom onCompanionSelect={handleCompanionSelect} />
                </div>
                {selectedCompanion && (
                  <span className={styles.userBubble}>{selectedCompanion}</span>
                )}
              </div>
            )}

            {/* 테마 선택 */}
            {selectedCompanion && (
              <div className={styles.questionStyle}>
                <div>
                  <span className={styles.gptBubble}>
                    여행의 테마를 골라주세요! (다중 선택 가능)
                  </span>
                  <Thema
                    onSelectionChange={(themes) => {
                      setSelectedThemes(themes);
                    }}
                  />
                </div>
                {/* 선택한 테마 표시 */}
                <div className={styles.bubbleContainer}>
                  {selectedThemes.map((theme, index) => (
                    <span key={index} className={styles.bubble}>
                      #{theme}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 테마 선택 이후에 확정 버튼 표시 */}
            {selectedThemes.length > 0 && (
              <div className={styles.leftButtonContainer}>
                <button
                  className={styles.confirmButton}
                  onClick={handleConfirm}
                >
                  이 정보를 바탕으로 탐탐이에게 일정 추천받기
                </button>
              </div>
            )}

            {/* 로딩 메세지 */}
            {isGenerating && (
              <div className={styles.gptMessageContainer}>
                <img
                  src={iconGptProfile}
                  alt="GPT Profile"
                  className={styles.gptProfileIcon}
                />
                <div className={styles.gptBubble}>
                  탐탐이가 일정을 짜고 있어요😊! 잠시만 기다려주세요
                  <span className={styles.dots}></span>
                </div>
              </div>
            )}

            {/* 기존 채팅 메시지 */}
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
            {/* 스크롤 기준점 */}
            <div ref={messagesEndRef} />
          </div>
        )}
        {/* 메시지 입력창 */}
        <div className={styles.chatInputContainer}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="메시지 보내기"
            className={`${styles.chatInput} ${isFocused ? styles.focused : ""}`}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            rows={1}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault(); // Enter 시 기본 동작 차단
                handleSendMessage(); // 메시지 전송
              }
            }}
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
export default NewChat;
