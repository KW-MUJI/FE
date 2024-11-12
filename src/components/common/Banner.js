import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/kwlogo1.jpg";
import styles from "../../styles/Banner.module.css";

const Banner = ({ isLoggedIn, handleLogout }) => {
  const navigate = useNavigate(); // useNavigate 훅 사용

  //광운대 로고 클릭 시
  const handleKWLogiClick = () => {
    // navigate("https://www.kw.ac.kr"); // navigate는 외부 링크로 이동 못함
    window.location.href = "https://www.kw.ac.kr"; // 광운대학교 홈페이지로 이동
  };

  const handleLogoutClick = () => {
    handleLogout(); //로그아웃 처리
    navigate("/login");
  };

  const isLoginTrueBanner = () => {
    if (isLoggedIn) {
      return (
        <>
          <li>
            <Link to="/my_page">MY</Link>
          </li>
          <li>
            <Link
              onClick={handleLogoutClick}
              to="/login"
              className={styles.Logout_button}
            >
              LOGOUT
            </Link>
          </li>
        </>
      );
    }
  };

  const isLoginFalseBanner = () => {
    if (!isLoggedIn) {
      return (
        <>
          <li>
            <Link to="/login">LOGIN</Link>
          </li>
          <li>
            <Link to="https://www.kw.ac.kr" className={styles.k_menu}>
              광운대학교
            </Link>
          </li>
        </>
      );
    }
  };
  return (
    <div className={styles.banner_container}>
      <img
        src={logo}
        className={styles.logo}
        alt="logo"
        onClick={handleKWLogiClick}
      />
      <div className={styles.title}>
        <h2>광운대학교 생활 도우미</h2>
        <h1>광운 무인양품</h1>
      </div>
      <nav className={styles.navbar}>
        <ul className={styles.navbar_menu}>
          <li>
            <Link to="/home">HOME</Link>
          </li>
          {isLoginTrueBanner()}
          {isLoginFalseBanner()}
        </ul>
      </nav>
    </div>
  );
};

export default Banner;
