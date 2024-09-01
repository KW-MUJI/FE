import React, { useState } from 'react';
import logo from '../assets/logo.png';
import '../styles/Login.css'; // CSS 파일 임포트


// 헤드 컴포넌트
export const Banner = () => {
  return (

    <div className="banner-container">

      <img src={logo} className="logo" alt="logo" />
      <div className='title'>
        <h2>광운대학교 생활 도우미</h2>
        <h1>광운 무인양품</h1>
      </div>

      <nav class="navbar">
        <ul class="navbar-menu">
          <li><a href="#home">HOME</a></li>
          <li><a href="#login">LOGIN</a></li>
          <li><a href="#kw" class="k-menu">광운대학교</a></li>
        </ul>
      </nav>

    </div>


  );
}


//로그인 컴포넌트
const Login = () => {
  const [email, setEmail] = useState(''); // 이메일 상태 선언 및 초기화
  const [password, setPassword] = useState(''); // 비밀번호 상태 선언 및 초기화
  const [isPolicyOpen, setIsPolicyOpen] = useState(false)//개인정보처리방침

  const handleSubmit = (event) => {
    event.preventDefault();
    // 로그인 처리 로직 추가
    console.log('Logging in with', { email, password });
  };

  //모달 열기 함수
  const openPrivacyPolicy = () => {
    setIsPolicyOpen(true);
    console.log('열림');
  };

  //모달 닫기 함수
  const closePrivacyPolicy = () => {
    setIsPolicyOpen(false);
  }


  return (
    <div className="login-container">
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <div>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} placeholder="e-mail"
            required
          />
        </div>
        <div>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} placeholder="password"
          />
        </div>
        <button className="login-btn" type="submit">로그인</button>
      </form>

      <div className="login-options">
        <a href="/find-id">ID 찾기</a>
        <a href="/find-password">비밀번호 찾기</a>
        <a href="/signup">회원가입</a>
      </div>

      {/* 개인정보처리방침 버튼 */}
      <button className="privacy-btn" onClick={openPrivacyPolicy}>개인정보처리방침</button>

     {/* 모달 */}
      {isPolicyOpen && (
        <div id="privacyPolicyModal" className="modal" onClick={closePrivacyPolicy}>
          <div className="Policy-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closePrivacyPolicy}>&times;</span>
            <h2>개인정보처리방침</h2>
            <p>여기에 개인정보처리방침 내용을 작성합니다...</p>
          </div>
        </div>
      )

      }

    </div>
  );
};

export default Login;
