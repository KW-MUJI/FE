import React, { useState, useEffect } from "react";
import styles from "../styles/Recruit_write.module.css";
import { useParams } from "react-router-dom"; //URL에서 글 ID 가져오기 위한
import { updateProjectWithMock } from "../api/Service.js";
const RecruitWrite = () => {
  const { id } = useParams(); //URL에서ID받아옴
  // 상태 관리
  const [title, setTitle] = useState(""); // 제목
  const [content, setContent] = useState(""); // 내용
  const [imagePreview, setImagePreview] = useState(null); //이미지
  const [selectDate, setSelectDate] = useState(null); //날짜

  useEffect(() => {
    if (id) {
      updateProjectWithMock(id)
        .then((data) => {
          setTitle(data.data.name);
          setContent(data.data.description);
          setSelectDate(formatDate(new Date(data.data.deadLineAt)));
          setImagePreview(data.data.image);
        })
        .catch((error) => console.error("Error loading data:", error));
    }
  }, [id]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  //이미지 미리보기
  const handleImageChange = (e) => {
    const file = e.target.files[0]; //이미지는 하나만 있음
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      e.target.value = ""; //파일 없을 때 초기화
    }
  };

  //이미지 미리보기.초기화
  const handleImageReset = () => {
    setImagePreview(null); // 이미지 미리보기 초기화
    document.getElementById("file-upload").value = ""; // input 값 초기화
  };

  //선택 날짜 유효성 검사
  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    console.log("선택된 마감일:", selectedDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 오늘의 시간 부분을 초기화

    if (selectedDate < today) {
      alert(`마감일은 오늘 이후로 설정해야 합니다. ${selectDate}`);
      setSelectDate(null); // 잘못된 날짜일 경우 상태 초기화
      return;
    }

    setSelectDate(selectedDate); // 상태 값 업데이트
  };

  //발행 기능
  const handlePublish = async () => {
    try {
      const response = await updateProjectWithMock(id, {
        title,
        description: content,
        deadLineAt: selectDate,
        image: imagePreview,
      });
      if (response.code === 200) {
        alert("수정이 완료되었습니다!");
      } else {
        alert("수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error updating:", error);
    }
  };

  //폼 유효성 검사
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !selectDate) {
      alert("제목, 내용, 마감일을 모두 입력해주세요.");
      return;
    }
    console.log("제목:", title);
    console.log("내용:", content);
    console.log("마감일:", selectDate);
    await handlePublish(); //발행 기능 호출
  };

  return (
    <div className={styles.recuit_write_page}>
      <h4>팀플모집 글쓰기</h4>
      {/* 제목 */}
      <div className={styles.form_contain}>
        <div className={styles.title_group}>
          <input
            type="text"
            id="title"
            name="title"
            className={styles.title_group}
            placeholder="제목"
            value={title} // 상태연결
            onChange={(e) => setTitle(e.target.value)} //상태 업데이트
          />
        </div>
        {/* 내용 */}
        <div className={styles.content_group}>
          {imagePreview && (
            <div className={styles.image_preview_container}>
              <img
                src={imagePreview}
                alt="Preview"
                className={styles.image_preview}
              />
              <button
                type="button"
                onClick={handleImageReset}
                className={styles.image_delete}
              >
                이미지 삭제
              </button>
            </div>
          )}
          {!content && (
            <div className={styles.overlay_text}>
              <p>공고 마감</p>
              <p>- 모집기간이 끝난경우</p>
              <p>
                - 신청한 인원중 팀원 선택 완료 후, 팀플 시작 버튼을 누른 경우
              </p>
            </div>
          )}
          <textarea
            id="content"
            name="content"
            className={styles.content_group}
            placeholder="내용을 입력하세요"
            value={content} //상태연결
            onChange={(e) => setContent(e.target.value)} // 상태 업데이트
          />
        </div>

        <div className={styles.option_menu}>
          {/* 사진업로드 */}
          <div className={styles.image_upload}>
            <input
              type="file"
              id="file-upload"
              className={styles.file_input}
              accept="image/*"
              onChange={handleImageChange} // 이미지 변경 핸들러
            />

            <label htmlFor="file-upload" className={styles.upload_button}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                className={styles.upload_icon}
              >
                <path
                  d="M28.75 23.75C28.75 24.413 28.4866 25.0489 28.0178 25.5178C27.5489 25.9866 26.913 26.25 26.25 26.25H3.75C3.08696 26.25 2.45107 25.9866 1.98223 25.5178C1.51339 25.0489 1.25 24.413 1.25 23.75V10C1.25 9.33696 1.51339 8.70107 1.98223 8.23223C2.45107 7.76339 3.08696 7.5 3.75 7.5H8.75L11.25 3.75H18.75L21.25 7.5H26.25C26.913 7.5 27.5489 7.76339 28.0178 8.23223C28.4866 8.70107 28.75 9.33696 28.75 10V23.75Z"
                  stroke="#1E1E1E"
                  strokeWidth="2.4375" // 수정된 부분
                  strokeLinecap="round" // 수정된 부분
                  strokeLinejoin="round" // 수정된 부분
                />

                <path
                  d="M15 21.25C17.7614 21.25 20 19.0114 20 16.25C20 13.4886 17.7614 11.25 15 11.25C12.2386 11.25 10 13.4886 10 16.25C10 19.0114 12.2386 21.25 15 21.25Z"
                  stroke="#1E1E1E"
                  strokeWidth="2.4375" // 수정된 부분
                  strokeLinecap="round" // 수정된 부분
                  strokeLinejoin="round" // 수정된 부분
                />
              </svg>
              사진 업로드
            </label>
          </div>

          {/* 마감일 설정 */}
          <div className={styles.date_group}>
            <label htmlFor="date-select" className={styles.date_button}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                className={styles.date_icon}
              >
                <path
                  d="M20 2.5V7.5M10 2.5V7.5M3.75 12.5H26.25M6.25 5H23.75C25.1307 5 26.25 6.11929 26.25 7.5V25C26.25 26.3807 25.1307 27.5 23.75 27.5H6.25C4.86929 27.5 3.75 26.3807 3.75 25V7.5C3.75 6.11929 4.86929 5 6.25 5Z"
                  stroke="#1E1E1E"
                  strokeWidth="2.4375" // 수정된 부분
                  strokeLinecap="round" // 수정된 부분
                  strokeLinejoin="round" // 수정된 부분
                />
              </svg>
              마감일 설정
            </label>

            <input
              type="date"
              className={styles.date_select}
              style={{ width: "110px" }} // 입력 필드를 숨김
              value={selectDate}
              onChange={handleDateChange}
            />
          </div>
          <button
            type="button"
            className={styles.publication_btn}
            onClick={handlePublish}
          >
            발행
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecruitWrite;
