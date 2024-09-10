import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import logo from './assets/logo.png';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Banner from './components/Banner';
import Footer from './components/Footer';
import PwFind from './components/PwFind';
import PwReset from './components/PwResrt';
import Privacy_law from './components/Privacy_law';
import RecruitWrite from './components/Recruit_write';
import Survey from './components/Survey';
import SurveyWrite from './components/Survey_write';
// import Login from './components/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Banner />
        <Routes>
          <Route path="/" element={<RecruitWrite />} /> {/* 기본 경로를 Login으로 설정 */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/pwFind" element={<PwFind />} />
          <Route path="/pwReset" element={<PwReset />} />
          <Route path="/privacy_law" element={<Privacy_law />} />
          <Route path="/recruit_write" element={<RecruitWrite />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/survey_write" element={<SurveyWrite />} />
        </Routes>


        <Footer />
      </div>
    </Router>
  );
}

export default App;
