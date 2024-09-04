import React, { useState } from 'react';
import styles from'../styles/Login.module.css'; // CSS 파일 임포트
import { Link } from 'react-router-dom';


//로그인 컴포넌트
const Login = () => {
  const [email, setEmail] = useState(''); // 이메일 상태 선언 및 초기화
  const [password, setPassword] = useState(''); // 비밀번호 상태 선언 및 초기화
  const [isPolicyOpen, setIsPolicyOpen] = useState(false)//개인정보처리방침

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Logging in with', { email, password });
  };


  const togglePrivacyPolicy = () => setIsPolicyOpen(!isPolicyOpen);

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
        <Link to="/pwFind" className="find-password-link">비밀번호 찾기</Link>
        <Link to="/signup" className="signup-link">회원가입</Link>
      </div>

      <button className={styles.privacy_btn} onClick={togglePrivacyPolicy}>개인정보처리방침</button>

      {isPolicyOpen && (
        <div id="privacyPolicyModal" className={styles.modal} onClick={togglePrivacyPolicy}>
          <div className={styles.Policy_content} onClick={(e) => e.stopPropagation()}>
            <span className={styles.close} onClick={togglePrivacyPolicy}>&times;</span>
            <h2>개인정보처리방침</h2>
            <p>여기에 개인정보처리방침 내용을 작성합니다...</p>
          </div>
        </div>
      )}

    </div>
  );
};

export default Login;
