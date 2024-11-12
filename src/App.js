import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/authPage/Login";
import Signup from "./components/Signup";
import Banner from "./components/common/Banner";
import Footer from "./components/common/Footer";
import PwFind from "./components/PwFind";
import PwReset from "./components/PwResrt";
import Privacy from "./components/common/Privacy_law";
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    // 토큰이 있으면 로그인 상태
    // 토큰이 없으면 로그아웃 상태
    // - localStorage
    // 브라우저를 닫아도 데이터가 유지
    // 민감한 데이터를 저장하는 것은 보안상 권장X

    // - sessionStorage:
    // 브라우저 탭이 닫히면 데이터가 사라짐
    // 짧은 세션 동안 토큰을 유지하고 싶을 때 적합

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false); // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
    }
  }, []);

  //로그아웃처리
  const handleLogout = () => {
    localStorage.removeItem("token");
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
          <Route path="/privacy_law" element={<Privacy />} />
          <Route path="/recruit_write/:id" element={<RecruitWrite />} />
          <Route path="/recruit_main" element={<RecruitMain />} />
          <Route path="/recruit_post/:id" element={<RecruitPost />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/survey_write" element={<SurveyWrite />} />
          <Route path="/My_survey" element={<MySurvey />} />
          <Route path="/survey_result" element={<SurveyResult />} />
          <Route path="/survey_join/:surveyId" element={<SurveyJoin />} />
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
