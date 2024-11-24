import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.js";
import styles from "../../styles/Recruit_post.module.css";
import {
  getTeampleDetail,
  getPortfolioList,
  postPortfolio,
} from "../../api/teamApi";
import { formatDate } from "../../utils/dateUtil.js";

// 모달 컴포넌트
const Portfolio = ({
  isOpen,
  onClose,
  portfolios,
  selectedPortfolio,
  handleSelectPortfolio,
  handleSubmit,
  navigate,
}) => {
  if (!isOpen) return null; // 모달이 열릴 때만 표시

  const handleMyPage = () => {
    window.open("/my_page", "_blank");
  };
  const hasSavedResume = () => {
    if (portfolios.length <= 0) {
      return (
        <>
          <div className={styles.portfolios}>
            <p>이력서가 존재하지 않습니다.</p>
            <p>"마이페이지 &gt; MY 포트폴리오 &gt; 추가"</p>
            <p>에서 이력서를 등록해 주세요.</p>
          </div>
          <div className={styles.modalbutton}>
            <button onClick={onClose}>취소</button>
            <button onClick={handleMyPage}>마이페이지</button>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className={styles.portfolios}>
            {portfolios.map((portfolio) => (
              <div
                key={portfolio.id}
                className={`${styles.portfolio_item} ${
                  selectedPortfolio === portfolio.id ? styles.selected : ""
                }`}
                onClick={() => handleSelectPortfolio(portfolio.id)}
              >
                <label className={styles.portfolio_label}>
                  {/* 텍스트를 클릭 했을 때에도 눌리도록 label로 감싸줌 */}
                  <input
                    type="radio"
                    name="portfolio"
                    value={portfolio.id}
                    checked={selectedPortfolio === portfolio.id}
                    onChange={() => handleSelectPortfolio(portfolio.id)}
                    className={styles.radio_input}
                  />
                  <span className={styles.radio_custom}>
                    {selectedPortfolio === portfolio.id ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                      >
                        <circle
                          cx="7.5"
                          cy="7.5"
                          r="6.78814"
                          fill="white"
                          stroke="#8B0B02"
                          stroke-width="1.42373"
                        />
                        <ellipse
                          cx="7.50027"
                          cy="7.50027"
                          rx="4.77273"
                          ry="4.77273"
                          fill="#8B0B02"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                      >
                        <circle cx="7.5" cy="7.5" r="7" stroke="#B3B3B3" />
                      </svg>
                    )}
                  </span>{" "}
                  {/* 라디오 버튼 커스터마이징 */}
                  <div className={styles.portfolio_text}>
                    <h3>{portfolio.title}</h3>
                    <p>마지막 수정일: {portfolio.modified_date}</p>
                  </div>
                </label>
              </div>
            ))}
          </div>
          <div className={styles.modalbutton}>
            <button onClick={onClose}>취소</button>
            <button onClick={handleSubmit}>지원하기</button>
          </div>
        </>
      );
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalhead}>
          <h2>포트폴리오 선택</h2>
        </div>
        {hasSavedResume()}
      </div>
    </div>
  );
};

// {
//     "code": 200,
//     "data": {
//       "name": "팀플 구합니다.",
//       "description": "백엔드 1명, 프론트엔드 1명",
//       "createdAt": "2024-10-01T16:35:09.414446",
//       "deadLineAt": "2024-10-15T07:09:38.461",
//       "image": "https://kwmuji.s3.ap-northeast-2.amazonaws.com/projectImage%2F%EC%B1%85%5C%ED%8C%80%ED%94%8C+%EA%B5%AC%ED%95%A9%EB%8B%88%EB%8B%A4.%5C20241001.jpg",
//       "role": "CREATOR",
//       "onGoing": true
//     }
//   }
const RecruitPost = () => {
  const { projectId } = useParams(); //URL에서ID받아옴
  const { accessToken } = useAuth();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [deadlineAt, setDeadlineAt] = useState("");
  const [image, setImage] = useState("");
  const [role, setRole] = useState("");
  const [onGoing, setOnGoing] = useState(true);
  const [portfolios, setPortfolios] = useState([]);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false); //지원여부
  const navigate = useNavigate(); // useNavigate 훅 선언

  const today = new Date();

  useEffect(() => {
    if (!accessToken) {
      alert("로그인 상태가 아닙니다. 로그인 페이지로 이동합니다.");
      navigate("/login");
    }

    fetchProjectDetails(projectId);
    fetchPortFolios(accessToken);
  }, [projectId, accessToken, navigate]);

  const fetchProjectDetails = async (projectId) => {
    try {
      const response = await getTeampleDetail(projectId, accessToken);
      setName(response.data.name);
      setDescription(response.data.description);
      setCreatedAt(response.data.createdAt);
      setDeadlineAt(response.data.deadlineAt);
      setImage(response.data.image);
      setRole(response.data.role);
      setOnGoing(response.data.onGoing);
      console.log(
        "프로젝트세부내용 확인 : ",
        response.data.name,
        response.data.description,
        response.data.createdAt,
        response.data.deadlineAt,
        response.data.image,
        response.data.role,
        response.data.onGoing
      );
    } catch (error) {
      console.error("fetchProjectDetails 에러", error);
    }
  };

  const fetchPortFolios = async (accessToken) => {
    try {
      const response = await getPortfolioList(accessToken);
      setPortfolios(response.data.resumes);
      console.log("이력서 확인 : ", response.data.resumes);
    } catch (error) {
      console.error("fetchPortFolios 에러", error);
    }
  };


  const location = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
  const [selectedPortfolio, setSelectedPortFolid] = useState(null);
  let isDisableButton = false;

  const navigateToMain = () => {
    navigate("/team"); // 새로운 창이 아닌 현재 창에서 페이지 이동
  };

  const handleOpenModal = () => {
    if (role === "CREATOR") {
      window.open("/my_page", "_blank");
    } else {
      setIsModalOpen(true); // 모달 열기
    }
  };

  const handleCloseModal = () => {
    setSelectedPortFolid(null);
    setIsModalOpen(false); // 모달 닫기
  };

  const handleSelectPortfolio = (portfolioID) => {
    setSelectedPortFolid(portfolioID); //선택된 포트폴리오 업데이트

    console.log(`${portfolioID} 선택됨`);
  };

  const handleSubmit = async () => {
    if (!selectedPortfolio) {
      alert("포트폴리오를 선택해주세요");
      return;
    }
    console.log("선택된 포트폴리오 ID:", selectedPortfolio);
    console.log("프로젝트 ID:", projectId);
    console.log("Access Token:", accessToken);
    console.log("Resume ID:", selectedPortfolio);
    console.log("Project ID:", projectId);

    try {
      const result = await postPortfolio(
        accessToken,
        selectedPortfolio,
        projectId
      );
      if (result) {
        alert("신청이 완료되었습니다.");
        setApplicationSubmitted(true); // 신청 상태 업데이트
        handleCloseModal(); // 모달 닫기
      } else {
        alert("신청에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("handleSubmit 에러:", error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const calculateDDay = (targetDate) => {
    // targetDate를 Date 객체로 변환
    const target = new Date(targetDate);

    // 날짜 차이를 일 단위로 계산
    const diffTime = target - today; // 밀리초 차이
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // 일 단위로 변환
    return diffDays;
  };

  const handleDisableButton = () => {
    let buttonDescript = "";

    const calculateDay = calculateDDay(deadlineAt);

    if (isDisableButton === false) {
      buttonDescript = "팀플신청";
      isDisableButton = false;
    }
    if (onGoing === false || calculateDay < 0) {
      buttonDescript = "마감";
      isDisableButton = true;
    }
    if (role === "CREATOR") {
      // 글쓴이인 경우
      buttonDescript = "지원자보기";
      isDisableButton = false;
    }
    if (applicationSubmitted) {
      // 이미 신청한 경우
      buttonDescript = "지원완료";
      isDisableButton = true;
    }

    //마감된 날짜인 경우에도 추가해야함..

    return (
      <>
        <button
          onClick={() => handleOpenModal(buttonDescript)}
          disabled={isDisableButton}
        >
          {buttonDescript}
        </button>
      </>
    );
  };

  return (
    <div className={styles.top}>
      <div className={styles.recruit_post}>
        <div className={styles.recruit_menu}>
          <label onClick={navigateToMain}>팀플모집</label>
        </div>

        <div className={styles.recruit_header}>
          <h>{name}</h>
          <p>마감일 {deadlineAt}</p>
        </div>

        <p className={styles.date}>작성일: {createdAt}</p>
        <div className={styles.recruit_contents}>
          <div
            className={styles.post_contents}
            dangerouslySetInnerHTML={{
              __html: description.replace(/\n/g, "<br />"),
            }} // 줄바꿈 처리
          />

          {image && (
            <img src={image} alt="미리보기" className={styles.post_image} />
          )}
        </div>
      </div>
      <div className={styles.button_container}>{handleDisableButton()}</div>

      {/* 모달 컴포넌트 호출 */}
      <Portfolio
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        portfolios={portfolios}
        selectedPortfolio={selectedPortfolio}
        handleSelectPortfolio={handleSelectPortfolio}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};
export default RecruitPost;
