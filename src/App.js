import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import logo from './assets/logo.png';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Banner from './components/Banner';
import Footer from './components/Footer';
import PwFind from './components/PwFind';
// import Login from './components/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Banner />
        <Routes>
          <Route path="/" element={<Login />} /> {/* 기본 경로를 Login으로 설정 */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/pwFind" element={<PwFind />} />
        </Routes>


        <Footer />
      </div>
    </Router>
  );
}

export default App;
