// Modal.js
import React from 'react';

const modalData = {
  first: {
    title: '첫 번째 제목',
    content: '첫 번째 내용입니다.',
  },
  second: {
    title: '두 번째 제목',
    content: '두 번째 내용입니다.',
  },
};

const Modal = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  const { title, content } = modalData[type] || {};

  return (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        <h2>{title}</h2>
        <p>{content}</p>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

// 스타일 정의
const modalStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalContentStyle = {
  background: 'white',
  padding: '20px',
  borderRadius: '5px',
};

export default Modal;
