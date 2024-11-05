import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import logo from "./assets/logo.png";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import PwFind from "./components/PwFind";
import PwReset from "./components/PwResrt";
import Privacy_law from "./components/Privacy_law";
import RecruitWrite from "./components/Recruit_write";
import RecruitPost from "./components/Recruit_post";
import RecruitMain from "./components/Recruit_main";
import Survey from "./components/Survey";
import SurveyWrite from "./components/Survey_write";
import SurveyJoin from "./components/Survey_join";
import MyTeam from "./components/MyTeam/My_team";
import MyRecruitTeam from "./components/MyTeam/My_recruit_team";
import MyTeamApplicant from "./components/MyTeam/My_team_applicant";
import SurveyComplete from "./components/Survey_complete";
import MySurvey from "./components/My_survey";
import SurveyResult from "./components/survet_result";
import Schedule from "./components/Schedule";
import MyPage from "./components/My_page";
import CheckPw from "./components/CheckPw";
import Update from "./components/Update";
import MainPage from "./components/mainpage";
import Notice from "./components/Notice";

// import Login from './components/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

  //로그아웃처리
  const handleLogout = () => {
    setIsLoggedIn(false); // 로그아웃 시 로그인 상태를 false로 변경
  };

  return (
    <Router>
      <div className="App">
        <Banner isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<MainPage />} />{" "}
          {/* 기본 경로를 Login으로 설정 */}
          <Route path="/home" element={<MainPage />} />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/pwFind" element={<PwFind />} />
          <Route path="/pwReset" element={<PwReset />} />
          <Route path="/privacy_law" element={<Privacy_law />} />
          <Route path="/recruit_write" element={<RecruitWrite />} />
          <Route path="/recruit_main" element={<RecruitMain />} />
          <Route path="/recruit_post/:id" element={<RecruitPost />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/survey_write" element={<SurveyWrite />} />
          <Route path="/My_survey" element={<MySurvey />} />
          <Route path="/survey_result" element={<SurveyResult />} />
          <Route path="/survey_join" element={<SurveyJoin />} />
          <Route path="/survey_complete" element={<SurveyComplete />} />
          <Route path="/my_team" element={<MyTeam />} />
          <Route path="/my_recruit_team" element={<MyRecruitTeam />} />
          <Route path="/my_team_applicant/:id" element={<MyTeamApplicant />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/my_page" element={<MyPage />} />
          <Route path="/checkPw" element={<CheckPw />} />
          <Route path="/update" element={<Update />} />
          <Route path="/notice" element={<Notice />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
