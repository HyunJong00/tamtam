import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import iconUserProfile from "../assets/icon_userprofile.png";

function RedirectPage() {
  const navigate = useNavigate();

  //useEffect(() => {
  // Spring Boot API에서 회원 정보 가져오기
  //   axios
  //     .get("주소 입려부분")
  //     .then((response) => {
  //       const userInfo = response.data;

  //       // 회원 정보 저장
  //       localStorage.setItem("userInfo", JSON.stringify(userInfo));

  //       // 메인 페이지로 이동
  //       navigate("/");
  //     })
  //     .catch((error) => {
  //       console.error("회원 정보 가져오기 실패:", error);
  //     });
  // }, [navigate]);
  const mockUserInfo = {
    nickname: "Hyunjong",
    profileImage: iconUserProfile,
  };

  // 회원 정보를 localStorage에 저장하고 메인 페이지로 이동
  useEffect(() => {
    // 회원 정보 저장
    try {
      localStorage.setItem("userInfo", JSON.stringify(mockUserInfo));
      console.log("회원 정보 저장 완료");

      // 저장 성공 후 메인 페이지로 이동
      navigate("/MyPage");
    } catch (error) {
      console.error("회원 정보 저장 중 오류 발생:", error);
    }
  }, [navigate]);

  return (
    <div>
      <h1>회원가입 성공!</h1>
      <p>잠시만 기다려 주세요. 페이지로 이동 중입니다...</p>
    </div>
  );
}
export default RedirectPage;
