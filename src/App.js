import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Login from './components/Login'; // Login 컴포넌트 임포트

function App() {
  return (
    <div className="App">
      <Login />  {/* Login 컴포넌트만 렌더링 */}
    </div>
  );
}

export default App;
