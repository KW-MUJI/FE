import React, { useState, useEffect } from "react";
import styles from "../../styles/Recruit_write.module.css";
import { useParams, useNavigate } from "react-router-dom"; //URL에서 글 ID 가져오기 위한

import { getProjectDetails, updateProject } from "../../api/myteamApi.js";

import { registerTeam } from "../../api/teamApi.js";
import { useAuth } from "../../contexts/AuthContext.js";
import { formatDate } from "../../utils/dateUtil.js";

const RecruitWrite = () => {
  const { projectId } = useParams(); //URL에서ID받아옴
  const isEditMode = Boolean(projectId); // projectId가 있으면 수정 모드
  const { accessToken } = useAuth(); // AuthContext에서 accessToken 가져오기

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [image, setImage] = useState(null);
  const [deleteImage, setDeleteImage] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const today = new Date();
  const formattedToday = formatDate(today);
  const [deadlineAt, setDeadlineAt] = useState(formattedToday);

  useEffect(() => {
    console.log("글쓰기 토큰 있냐?", accessToken);
    if (!accessToken) {
      alert("로그인 상태가 아닙니다. 로그인 페이지로 이동합니다.");
      navigate("/login");
    }

    // 수정모드
    if (isEditMode) {
      fetchProjectDetails(projectId);
    }
  }, [isEditMode, projectId, accessToken, navigate]);

  const fetchProjectDetails = async (projectId) => {
    try {
      const response = await getProjectDetails(projectId, accessToken);
      setName(response.data.name);
      setDescription(response.data.description);
      setDeadlineAt(response.data.deadLineAt);
      setImage(response.data.image);
      setImagePreview(response.data.image);
    } catch (error) {
      console.error("fetchProjectDetail 에러", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 필드 유효성 검사
    if (!name) {
      alert("제목을 입력해주세요.");
      return;
    }
    if (!description) {
      alert("내용을 입력해주세요.");
      return;
    }
    console.log("이미지 상태 확인:", image);
    const updateData = {
      name,
      description,
      image: image, // 이미지 파일 이름
      deleteImage, // 기존 이미지 삭제 여부
    };

    const postData = {
      name,
      description,
      deadlineAt,
      image: image,
      ProjectImage: image,
      deleteImage,
    };

    try {
      // 수정 모드
      if (isEditMode) {
        const response = await updateProject(
          projectId,
          updateData,
          accessToken
        );

        if (response?.code === 200) {
          alert("수정이 완료되었습니다!");
          navigate("/team"); // 팀 목록 페이지로 이동
        } else {
          alert("수정에 실패했습니다. 다시 시도해주세요.");
        }
      } else {
        // 글쓰기
        const response = await registerTeam(postData, accessToken);
        if (response.code === 200) {
          alert(
            "글이 성공적으로 등록되었습니다. \n작성하신 글은 마이페이지에서 확인 가능합니다."
          );
        }
        navigate("/team");
      }
    } catch (error) {
      console.error("Error updating project:", error);
      alert("수정 중 오류가 발생했습니다.");
    }
  };

  //이미지 미리보기.초기화
  const handleImageReset = () => {
    setImagePreview(null); // 이미지 미리보기 초기화
    document.getElementById("file-upload").value = ""; // input 값 초기화
  };

  //이미지 미리보기
  const handleImageChange = (e) => {
    const file = e.target.files[0]; //이미지는 하나만 있음
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setImage(file); // 실제 파일 객체 저장
      console.log("이미지 파일:", URL.createObjectURL(file));
      return () => URL.revokeObjectURL(previewUrl);
    } else {
      console.log("파일이 선택되지 않았습니다.");
      e.target.value = ""; //파일 없을 때 초기화
    }
  };

  // 마감일 설정
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;

    if (selectedDate < formattedToday) {
      alert(`마감일은 오늘 이후로 설정해야 합니다. ${deadlineAt}`);
      return;
    }

    setDeadlineAt(selectedDate);

    console.log("오늘 날짜:", formattedToday);
    console.log("선택된 마감일:", selectedDate);
  };

  //발행 기능
  // const handlePublish = async (e) => {
  //   e.preventDefault();

  //   if (!title || !content || !selectDate) {
  //     alert('제목, 내용, 마감일을 모두 입력해주세요.');
  //     return;
  //   }

  //   const postData = {
  //     name: title,
  //     description: content,
  //     deadlineAt: selectDate,
  //     image: imagePreview, // 업로드된 이미지
  //   };

  //   try {
  //     if(id){
  //       const response = await
  //     }
  //     const response = await updateProjectWithMock(id, {
  //       title,
  //       description: content,
  //       deadLineAt: selectDate,
  //       image: imagePreview,
  //     });
  //     if (response.code === 200) {
  //       alert("수정이 완료되었습니다!");
  //     } else {
  //       alert("수정에 실패했습니다.");
  //     }
  //   } catch (error) {
  //     console.error("Error updating:", error);
  //   }
  // };

  // //폼 유효성 검사
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!title || !content || !selectDate) {
  //     alert("제목, 내용, 마감일을 모두 입력해주세요.");
  //     return;
  //   }
  //   console.log("제목:", title);
  //   console.log("내용:", content);
  //   console.log("마감일:", selectDate);
  //   await handlePublish(); //발행 기능 호출
  // };

  return (
    <div className={styles.recuit_write_page}>
      <h4>{isEditMode ? "팀플모집 글쓰기 수정" : "팀플모집 글쓰기"}</h4>
      <form onSubmit={handleSubmit}>
        <div className={styles.form_contain}>
          <div className={styles.title_group}>
            <input
              type="text"
              id="name"
              value={name}
              className={styles.title_group}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="제목"
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
            {!description && (
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
              value={description} //상태연결
              onChange={(e) => setDescription(e.target.value)} // 상태 업데이트
            />
          </div>

          {/* 마감일, 사진 업로드, 발행 */}
          <div className={styles.option_menu}>
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
                value={deadlineAt}
                onChange={handleDateChange}
              />
            </div>
            <button
              type="button"
              className={styles.publication_btn}
              onClick={handleSubmit}
            >
              발행
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RecruitWrite;
