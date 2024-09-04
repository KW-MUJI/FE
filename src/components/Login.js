import React, { useState } from 'react';
import styles from '../styles/Login.module.css'; // CSS 파일 임포트
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
        <Link to="/pwFind" className={styles.find_password_link}>비밀번호 찾기</Link>
        <Link to="/signup" className={styles.signup_link}>회원가입</Link>
      </div>

      <button className={styles.privacy_btn} onClick={togglePrivacyPolicy}>개인정보처리방침</button>

      {isPolicyOpen && (
        <div id="privacyPolicyModal" className={styles.modal} onClick={togglePrivacyPolicy}>
          <div className={styles.Policy_content} onClick={(e) => e.stopPropagation()}>
            <span className={styles.close} onClick={togglePrivacyPolicy}>&times;</span>
            <div className={styles.h2_title_box}>
              <h1>개인정보처리방침</h1>
              <br></br>
              <div className={styles.common_rule_box}>
                <h4>제1조(목적)</h4>
                <p>광운 무인양품(이하 '회사'라고 함)은 회사가 제공하고자 하는 서비스(이하 '회사 서비스')를 이용하는 개인(이하 '이용자' 또는 '개인')의 정보(이하 '개인정보')를 보호하기 위해, 개인정보보호법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률(이하 '정보통신망법') 등 관련 법령을 준수하고, 서비스 이용자의 개인정보 보호 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보처리방침(이하 '본 방침')을 수립합니다.</p>
                <br></br>
                <h4>제2조(개인정보 처리의 원칙)</h4>
                <p>개인정보 관련 법령 및 본 방침에 따라 회사는 이용자의 개인정보를 수집할 수 있으며 수집된 개인정보는 개인의 동의가 있는 경우에 한해 제3자에게 제공될 수 있습니다. 단, 법령의 규정 등에 의해 적법하게 강제되는 경우 회사는 수집한 이용자의 개인정보를 사전에 개인의 동의 없이 제3자에게 제공할 수도 있습니다.</p>
                <br></br>
                <h4>제3조(본 방침의 공개)</h4>
                <p>1.	회사는 이용자가 언제든지 쉽게 본 방침을 확인할 수 있도록 회사 홈페이지 첫 화면 또는 첫 화면의 연결화면을 통해 본 방침을 공개하고 있습니다.</p>                <br></br>
                <p>2.	회사는 제1항에 따라 본 방침을 공개하는 경우 글자 크기, 색상 등을 활용하여 이용자가 본 방침을 쉽게 확인할 수 있도록 합니다.</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Login;
