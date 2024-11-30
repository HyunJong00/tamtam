import React, { useState } from "react";
import styles from "./InputModal.module.css";
import { ReactComponent as CloseIcon } from "../assets/icon_x.svg"; // X 아이콘 임포트

// title을 props로 받도록 수정
function InputModal({ title, onClose, onConfirm }) {
  const [nickname, setNickname] = useState(""); // 닉네임 상태

  const handleConfirm = () => {
    if (nickname.trim() === "") {
      alert("닉네임을 입력하세요.");
      return;
    }
    onConfirm(nickname); // 부모 컴포넌트로 닉네임 전달
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{title}</h2>{" "}
          {/* 동적으로 제목 변경 */}
          <CloseIcon onClick={onClose} className={styles.closeIcon} />
        </div>
        <p className={styles.modalDescription}>닉네임 변경</p>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="변경할 닉네임을 입력해주세요."
          className={styles.inputField}
        />
        <div className={styles.buttonContainer}>
          <button onClick={handleConfirm} className={styles.deleteButton}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default InputModal;
