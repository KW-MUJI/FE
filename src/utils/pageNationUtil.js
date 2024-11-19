import styles from "./pageNation.module.css";
import React, { useState } from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pages = [];
  const maxPagesToShow = 5; // 최대 페이지 번호 표시 수
  const displayPage = currentPage + 1;
  // 시작 페이지와 끝 페이지 계산
  let startPage = Math.floor(currentPage / maxPagesToShow) * maxPagesToShow + 1;
  let endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <span
        key={i}
        className={`${styles.pageNumber} ${
          displayPage === i ? styles.active : ""
        }`}
        onClick={() => onPageChange(i - 1)}
      >
        {i}
      </span>
    );
  }

  return (
    <div className={styles.pagination}>
      {/* 이전 버튼 */}
      <span
        className={`${styles.arrow} ${
          displayPage === 1 ? styles.disabled : ""
        }`}
        onClick={() => displayPage > 1 && onPageChange(displayPage - 2)}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16 5L16 19L5 12L16 5Z" fill="#1D1B20" />
        </svg>
      </span>
      {/* 페이지 번호 */}

      <div className={styles.pageNumberDiv}>{pages}</div>
      {/* 다음 버튼 */}
      <span
        className={`${styles.arrow} ${
          displayPage === totalPages ? styles.disabled : ""
        }`}
        onClick={() => displayPage < totalPages && onPageChange(displayPage)}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 19V5L19 12L8 19Z" fill="#1D1B20" />
        </svg>
      </span>
    </div>
  );
};

export default Pagination;
