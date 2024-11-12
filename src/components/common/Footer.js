import React from "react";
import styles from "../../styles/Footer.module.css"; // CSS 파일 임포트

const navigateToPrivacy = () => {
  window.open("/privacy_law", "_blank");
};

const Footer = () => (
  <footer id={styles.footer}>
    <div className={styles.footer_logo}>
      <p id={styles.teamTitle}>광운 대학 생활 도우미</p>
      <p id={styles.teamName}>광운 무인양품</p>
    </div>

    <div className={styles.footer_info}>
      <p className={styles.Email}>Email</p>
      <p className={styles.Email_content}>kwumuji@gmail</p>
      <p className={styles.Project}> Project </p>
      <a
        href="http://github.com/KW-MUJI"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.github_link}
      >
        http://github.com/KW-MUJI
      </a>
    </div>

    <div className={styles.footer_developer}>
      <p className={styles.division}>Front-end </p>
      <p className={styles.name}>김민곤 조은향</p>
      <p className={styles.division}>Back-end</p>
      <p className={styles.name}>김정윤 최지훈</p>
      <p className={styles.division}>Designer</p>
      <p className={styles.name}>신승은</p>
    </div>

    <div className={styles.footer_Privacy}>
      {/* 클릭 이벤트로 페이지 이동 */}
      <button onClick={navigateToPrivacy} className={styles.privacy_link}>
        개인정보처리방침
      </button>
    </div>
  </footer>
);

export default Footer;
