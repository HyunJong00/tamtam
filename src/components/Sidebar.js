import React from "react";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { useNavigate } from "react-router-dom"; // TODO: 나중에 페이지 연결
import styles from "./Sidebar.module.css";

function Sidebar({ children }) {
  const navigate = useNavigate();

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <div className={styles.logoContainer}>
          <Logo className={styles.logo} />
          <h2 className={styles.logotitle}>탐라, 탐나</h2>
        </div>
      </div>
      <div className={styles.content}>
        {children} {/* 중간에 다른 컴포넌트가 들어갈 자리 */}
      </div>
      <div className={styles.navigation}>
        <button
          className={styles.navButton}
          onClick={() => navigate("/mypage")} // 마이페이지로 이동
        >
          마이페이지 이동
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
