import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import styles from "./Main.module.css";
import { ReactComponent as Logo } from "../assets/logo.svg";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import iconUserProfile from "../assets/icon_userprofile.png";

function Main() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    nickname: "", // 기본 닉네임
    profileImage: iconUserProfile, // 기본 이미지
  });

  // localStorage에서 사용자 정보를 가져옵니다.
  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      const parsedUserInfo = JSON.parse(storedUserInfo);
      setUserInfo(parsedUserInfo);
    }
  }, []);

  const handleProfileClick = () => {
    if (!userInfo.nickname) {
      navigate("/kakaoLogin"); // 닉네임이 없으면 로그인 페이지로 이동
    } else {
      navigate("/mypage"); // 닉네임이 있으면 마이페이지로 이동
    }
  };

  const option = {
    height: "270", // 높이
    width: "480", // 너비
    playerVars: {
      autoplay: 0,
      mute: 1,
    },
  };

  return (
    <div className={styles.screen}>
      <div className={styles.Header}>
        <div className={styles.logoContainer}>
          <Logo className={styles.logo} />
          <h2 className={styles.logotitle}>탐라, 탐나</h2>
        </div>
        <div
          className={styles.profileContainer}
          onClick={handleProfileClick} // 프로필 클릭 시 이동
        >
          <img
            src={userInfo.profileImage || iconUserProfile}
            alt="User Profile"
            className={styles.profileImage}
          />
          <span className={styles.profileName}>
            {userInfo.nickname || "로그인이 필요합니다"}
          </span>
        </div>
      </div>

      <div className={styles.mainButtons}>
        <a href="/new" className={styles.button}>
          여행 일정 생성하기
        </a>
        <a href="/mypage" className={styles.button}>
          마이페이지
        </a>
        <a href="/kakaoLogin" className={styles.button}>
          로그인하기
        </a>
      </div>

      {/* YouTube 동영상 */}
      <div className={styles.youtubeContainer}>
        <YouTube
          videoId="ZVmmP0CgpUg" // YouTube 동영상 ID
          opts={option}
          className={styles.youtube}
        />
        <YouTube
          videoId="S39KiBTpIaM" // YouTube 동영상 ID
          opts={option}
          className={styles.youtube}
        />
        <YouTube
          videoId="M87B-PM2JNs" // YouTube 동영상 ID
          opts={option}
          className={styles.youtube}
        />
      </div>

      <Footer />
    </div>
  );
}

export default Main;
