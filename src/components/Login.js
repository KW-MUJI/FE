import React, { useState } from 'react';
import logo from '../assets/logo.png';
import '../styles/Login.css'; // CSS 파일 임포트





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
        <button type="submit">로그인</button>
      </form>

      <div class="login-options">
        <a href="/find-id">ID 찾기</a>
        <a href="/find-password">비밀번호 찾기</a>
        <a href="/signup">회원가입</a>
      </div>
    </div>
  );
};

export default Login;
