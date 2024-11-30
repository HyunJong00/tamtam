import React from "react";
import styles from "./Modal.module.css";
import { ReactComponent as CloseIcon } from "../assets/icon_x.svg";

function Modal({ title, message, onClose, onConfirm }) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        {/* X 버튼 */}
        <CloseIcon onClick={onClose} className={styles.closeIcon} />
        <h2 className={styles.modalTitle}>{title}</h2>
        <p className={styles.modalMessage}>{message}</p>
        {/* 확인 버튼 */}
        <button onClick={onConfirm} className={styles.modalButton}>
          확인
        </button>
      </div>
    </div>
  );
}

export default Modal;
