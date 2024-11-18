import styles from "./pageNation.module.css";
import React, { useState } from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pages = [];
  const maxPagesToShow = 5; // 최대 페이지 번호 표시 수
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = startPage + maxPagesToShow - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <span
        key={i}
        className={`${styles.pageNumber} ${
          currentPage === i ? styles.active : ""
        }`}
        onClick={() => onPageChange(i)}
      >
        {i}
      </span>
    );
  }

  return (
    <div className={styles.pagination}>
      <span
        className={`${styles.arrow} ${
          currentPage === 1 ? styles.disabled : ""
        }`}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
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
      {pages}
      <span
        className={`${styles.arrow} ${
          currentPage === totalPages ? styles.disabled : ""
        }`}
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
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
