import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import "./App.css";
import Login from "./components/authPage/Login";
import Signup from "./components/Signup";
import Banner from "./components/common/Banner";
import Footer from "./components/common/Footer";
import PwFind from "./components/PwFind";
import PwReset from "./components/PwResrt";
import Privacy from "./components/common/Privacy_law";
import RecruitWrite from "./components/team/Recruit_write";
import RecruitPost from "./components/team/Recruit_post";
import RecruitMain from "./components/team/Recruit_main";
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
// import NotFound from "./components/common/NotFound";
// import Login from './components/Login';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <Banner />
          <Routes>
            <Route path="/" element={<MainPage />} />
            {/* 기본 경로를 Login으로 설정 */}
            <Route path="/home" element={<MainPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/pwFind" element={<PwFind />} />
            <Route path="/pwReset" element={<PwReset />} />
            <Route path="/privacy_law" element={<Privacy />} />
            <Route
              path="/recruit_write/:projectId"
              element={<RecruitWrite />}
            />
            <Route path="/recruit_write" element={<RecruitWrite />} />
            <Route path="/team" element={<RecruitMain />} />
            <Route path="/team/:projectId" element={<RecruitPost />} />
            <Route path="/survey" element={<Survey />} />
            <Route path="/survey_write" element={<SurveyWrite />} />
            <Route path="/My_survey" element={<MySurvey />} />
            <Route path="/survey_result/:surveyId" element={<SurveyResult />} />
            <Route path="/survey_join/:surveyId" element={<SurveyJoin />} />
            <Route
              path="/survey_complete/:surveyId"
              element={<SurveyComplete />}
            />
            <Route path="/my_team" element={<MyTeam />} />
            <Route path="/my_recruit_team" element={<MyRecruitTeam />} />
            <Route
              path="/my_team_applicant/:id"
              element={<MyTeamApplicant />}
            />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/my_page" element={<MyPage />} />
            <Route path="/checkPw" element={<CheckPw />} />
            <Route path="/update" element={<Update />} />
            <Route path="/notice" element={<Notice />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>

          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
