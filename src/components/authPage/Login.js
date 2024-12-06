import React, { useState, useRef, useEffect } from "react";
import styles from "../../styles/Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../../api/authApi";
import { useAuth } from "../../contexts/AuthContext";

// 로그인 컴포넌트
const Login = () => {
  const [email, setEmail] = useState(""); // 이메일 상태 선언 및 초기화
  const [password, setPassword] = useState(""); // 비밀번호 상태 선언 및 초기화
  const [error, setError] = useState(null);
  const { setAccessToken } = useAuth();

  const inputRef = useRef(null); // 입력 필드 참조
  const fixedDomain = "@kw.ac.kr"; // 고정 도메인
  const navigate = useNavigate();

  useEffect(() => {
    // 이메일 입력 필드에 기본적으로 '@kw.ac.kr'을 포함
    setEmail(fixedDomain);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // console.log("로그인 요청 시작:", { email, password });
    try {
      // API 호출
      const response = await signIn({ email, password });
      // console.log("로그인 성공:", response);

      const { accessToken, refreshToken } = response.data; // 서버에서 반환한 토큰
      // console.log("Access Token:", accessToken);
      // console.log("Refresh Token:", refreshToken);

      if (!accessToken || !refreshToken) {
        throw new Error("토큰이 응답에 포함되지 않았습니다.");
      }

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      setAccessToken(accessToken); // 로그인 상태로 변경

      navigate("/home"); // 대시보드로 이동
    } catch (error) {
      // 에러 처리
      setAccessToken(null); // 로그아웃 상태로 변경
      // setEmail("" + fixedDomain);
      setPassword("");
      const errorMessage = "잘못된 이메일/비밀번호 입니다.";
      // 백엔드에서 반환된 메시지 처리
      if (error.response && error.response.data) {
        console.error("로그인 실패:", error.response.data.data); // 서버 메시지 출력
        setError(errorMessage); // 사용자에게 표시할 오류 메시지
      } else {
        console.error("로그인 에러:", error.message);
        setError("로그인 중 문제가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;

    // 이메일 앞부분만 수정하고 '@kw.ac.kr'을 고정
    if (value.endsWith(fixedDomain)) {
      setEmail(value);
    }
  };

  const handleFocus = () => {
    // 커서를 항상 고정된 도메인 앞에 위치시키기 위한 설정
    const inputElement = inputRef.current;
    const end = email.length - fixedDomain.length;
    inputElement.setSelectionRange(end, end);
  };

  const navigateToPrivacy = () => {
    window.open("/privacy_law", "_blank");
  };

  return (
    <div className={styles.login_container}>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={email}
            onChange={handleEmailChange}
            ref={inputRef}
            onFocus={handleFocus}
            onClick={handleFocus} //클릭 할 때도 커서를 도메인 앞
            placeholder="이메일을 입력하세요"
            required
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>} {/* 에러 메시지 */}
        {/* <p className={styles.checkLogin}>　</p> */}
        <button className={styles.login_btn} type="submit">
          로그인
        </button>
      </form>
      <div className={styles.login_options}>
        <Link to="/pwFind" className={styles.find_password_link}>
          비밀번호 찾기
        </Link>
        <Link to="/signup" className={styles.signup_link}>
          회원가입
        </Link>
      </div>
      <button
        type="button"
        className={styles.privacy_btn}
        onClick={navigateToPrivacy}
      >
        개인정보처리방침
      </button>
    </div>
  );
};

export default Login;
