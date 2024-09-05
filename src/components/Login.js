import React, { useState } from 'react';
import styles from '../styles/Login.module.css'; // CSS 파일 임포트
import { Link, useNavigate } from 'react-router-dom';


//로그인 컴포넌트
const Login = () => {
  const [email, setEmail] = useState(''); // 이메일 상태 선언 및 초기화
  const [password, setPassword] = useState(''); // 비밀번호 상태 선언 및 초기화
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Logging in with', { email, password });
  };

  const navigateToPrivacy = () => {
    navigate("/privacy_law");
  };

  return (
    <div className={styles.login_container}>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <div>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e-mail"
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
        <button className={styles.login_btn} type="submit">로그인</button>
      </form>
      <div className={styles.login_options}>
        <Link to="/pwFind" className={styles.find_password_link}>비밀번호 찾기</Link>
        <Link to="/signup" className={styles.signup_link}>회원가입</Link>
      </div>

      <button type="button" className={styles.privacy_btn} onClick={navigateToPrivacy}>개인정보처리방침</button>



    </div>
  );
};

export default Login;
