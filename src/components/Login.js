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


  const handleSubmit = (event) => {
    event.preventDefault();
    // 로그인 처리 로직 추가
    console.log('Logging in with', { email, password });
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <div>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default Login;
