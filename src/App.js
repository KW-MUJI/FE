import React from 'react';
import logo from './assets/logo.png';
import './App.css';
import Login from './components/Login'; // Login 컴포넌트 임포트
import {Banner} from './components/Login';

function App() {
  return (
    <div className="App">
      <Banner />{/* Login 컴포넌트만 렌더링 */}
      <Login />  {/* Login 컴포넌트만 렌더링 */}
    </div>
  );
}

export default App;
