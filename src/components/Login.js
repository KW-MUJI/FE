import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/Login.module.css"; // CSS 파일 임포트
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../services/Service.js";

// 로그인 컴포넌트
const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState(""); // 이메일 상태 선언 및 초기화
  const [password, setPassword] = useState(""); // 비밀번호 상태 선언 및 초기화

  const mockUser = {
    email: "test@kw.ac.kr",
    password: "123456",
  };

  const navigate = useNavigate();

  const inputRef = useRef(null); // 입력 필드 참조
  const fixedDomain = "@kw.ac.kr"; // 고정 도메인

  useEffect(() => {
    setIsLoggedIn(false); //'/login'으로 들어오면 자동 로그아웃
    // 이메일 입력 필드에 기본적으로 '@kw.ac.kr'을 포함
    setEmail(fixedDomain);
  }, [setIsLoggedIn]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("id : " + email);
    console.log("pw : " + password);

    const result = await signIn(email, password);
    const textElement = document.querySelector(`.${styles.checkLogin}`);

    if (email === mockUser.email && password === mockUser.password) {
      setIsLoggedIn(true); // 로그인 상태로 변경
      navigate("/home");
    } else {
      alert("잘못된 아이디/비밀번호 입니다.");
      setIsLoggedIn(false); // 로그인 상태로 변경

      setEmail("" + fixedDomain);

      setPassword("");
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
