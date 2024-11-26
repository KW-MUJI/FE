import React, { useState, useEffect } from "react";
import styles from "../../styles/Recruit_main.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getTeampleList } from "../../api/teamApi";
import { formatDate } from "../../utils/dateUtil";
import Pagination from "../../utils/pageNationUtil";
import { useSearchParams } from "react-router-dom";

/// start 가 true가 되면 마감처리.

const RecruitMain = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")); // page 값을 가져오고 기본값 설정
  const searchQuery = String(searchParams.get("search") || "");
  // const { page } = useParams(); // 동적 URL에서 페이지 번호 가져오기
  const [projectList, setProjectList] = useState([]);

  const [currentPage, setCurrentPage] = useState(page);

  const [search, setSearch] = useState(searchQuery);
  const [totalPages, setTotalPages] = useState(); // 총 페이지 수
  const navigate = useNavigate();

  const today = new Date();
  const formattedToday = formatDate(today);

  // const getImageUrl = (imagePath) => {
  //   if (!imagePath) return ""; // 이미지 경로가 없을 때 처리
  //   const normalizedPath = imagePath.replace(/\\/g, "/");
  //   console.log(`${BASE_URL}/${normalizedPath}`);
  //   return `${BASE_URL}/${normalizedPath}`;
  // };
  const fetchProjectLists = async (page, search) => {
    try {
      const response = await getTeampleList(page, search);
      setProjectList(response.data.projects);
      setTotalPages(response.data.totalPages);
      console.log(response.data);

      //******백에서 수정하면 추가하기  */
      //   setTotalPages(response.totalPages || 10);
    } catch (error) {
      console.error("fetchProjectList 에러", error);
    }
  };
  // URL 또는 currentPage 변경 시 데이터 요청
  useEffect(() => {
    fetchProjectLists(currentPage, searchQuery);
    setSearchParams({ page: currentPage, search: searchQuery });
  }, [currentPage, search]);

  useEffect(() => {
    setCurrentPage(page); // URL 변경 시 상태 동기화
    console.log("setCurrentPage : ", currentPage);
  }, [page]);

  // currentPage 변경 시 URL 업데이

  //글쓰기 버튼 페이지 이동
  const navigateToWriting = () => {
    window.open("/recruit_write");
  };

  // 페이지 변경 핸들러
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage); // 상태 업데이트
    // navigate(`/recruit_main/${newPage}`); // URL 업데이트
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    console.log("검색내용: ", search);
    projectList.forEach((project) => {
      console.log(`프로젝트 이름: '${project.name}'`);
    });

    const filteredProjects = projectList.filter((project) =>
      project.name.toLowerCase().includes(search.toLowerCase())
    );
    console.log("필터프로젝트: ", filteredProjects);
    setCurrentPage(0);
    setSearchParams({ page: 0, search }); // 검색어를 URL에 반영
    fetchProjectLists(0, search); // 검색 API 호출
  };

  // 엔터 키 이벤트 핸들러
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // 검색 필터링

  const calculateDDay = (targetDate) => {
    // targetDate를 Date 객체로 변환
    const target = new Date(targetDate);
    const today = new Date(formattedToday);

    // 날짜 차이를 일 단위로 계산
    const diffTime = target - today; // 밀리초 차이
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // 일 단위로 변환

    if (diffDays === 0) {
      return "D-day";
    } else if (diffDays < 0) {
      return false;
    } else {
      return `D-${diffDays}`;
    }
  };

  //   "id": 13,
  //   "name": "프로젝트2",
  //   "start": false,
  //   "deadlineAt": "2024-11-15T07:09:38.461",
  //   "image": "projectImage/책\\프로젝트2\\20241010.jpg",
  //   "onGoing": true

  return (
    <div className={styles.recruit_main}>
      {/* 제목, 글쓰기버튼 */}
      <div className={styles.recruit_header}>
        <h2
          className={styles.title}
          onClick={() => {
            setSearchParams({ page: 0, search: "" }); // URL 상태 초기화
            setSearch(""); // 검색어 초기화
            setCurrentPage(0); // 페이지 상태 초기화
            fetchProjectLists(0, ""); // 초기 상태 데이터 로드
          }}
        >
          팀플모집
        </h2>

        <button
          htmlFor="writing_button" // 라벨 클릭 시 이 아이디를 가진 <input> 요소와 연결, 없애도 될 듯?
          className={styles.writing_button}
          onClick={navigateToWriting}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="29"
            viewBox="0 0 28 29"
            fill="none"
            className={styles.writing_icon}
          >
            <path
              d="M14 23.6331H24.5M19.25 4.38308C19.7141 3.91895 20.3436 3.6582 21 3.6582C21.325 3.6582 21.6468 3.72222 21.9471 3.84659C22.2474 3.97097 22.5202 4.15326 22.75 4.38308C22.9798 4.61289 23.1621 4.88572 23.2865 5.18598C23.4109 5.48625 23.4749 5.80807 23.4749 6.13308C23.4749 6.45808 23.4109 6.7799 23.2865 7.08017C23.1621 7.38044 22.9798 7.65326 22.75 7.88308L8.16667 22.4664L3.5 23.6331L4.66667 18.9664L19.25 4.38308Z"
              stroke="#1E1E1E"
              stroke-width="2.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          글쓰기
        </button>
      </div>

      {/* 검색창 */}
      <div className={styles.search_container}>
        <input
          type="text"
          value={search}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown} // Enter 키 이벤트 추가
          placeholder="검색할 내용을 입력하세요."
        />
        <button className={styles.search_button} onClick={handleSearch}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="37"
            height="38"
            viewBox="0 0 37 38"
            fill="none"
          >
            <path
              d="M30.2167 33.25L20.5042 23.275C19.7333 23.9083 18.8469 24.4097 17.8448 24.7792C16.8427 25.1486 15.7764 25.3333 14.6458 25.3333C11.8451 25.3333 9.47483 24.3372 7.5349 22.3448C5.59497 20.3524 4.625 17.9181 4.625 15.0417C4.625 12.1653 5.59497 9.7309 7.5349 7.73854C9.47483 5.74618 11.8451 4.75 14.6458 4.75C17.4465 4.75 19.8168 5.74618 21.7568 7.73854C23.6967 9.7309 24.6667 12.1653 24.6667 15.0417C24.6667 16.2028 24.4868 17.2979 24.1271 18.3271C23.7674 19.3562 23.2792 20.2667 22.6625 21.0583L32.375 31.0333L30.2167 33.25ZM14.6458 22.1667C16.5729 22.1667 18.2109 21.474 19.5599 20.0885C20.9089 18.7031 21.5833 17.0208 21.5833 15.0417C21.5833 13.0625 20.9089 11.3802 19.5599 9.99479C18.2109 8.60938 16.5729 7.91667 14.6458 7.91667C12.7188 7.91667 11.0807 8.60938 9.73177 9.99479C8.38281 11.3802 7.70833 13.0625 7.70833 15.0417C7.70833 17.0208 8.38281 18.7031 9.73177 20.0885C11.0807 21.474 12.7188 22.1667 14.6458 22.1667Z"
              fill="#B3B3B3"
            />
          </svg>
        </button>
      </div>

      {/* 포스트 */}
      <div className={projectList.length <= 0 ? "" : styles.posts_container}>
        {projectList.length > 0 ? (
          projectList.map((project) => (
            <Link
              to={`/team/${project.id}`}
              state={{ project }}
              key={project.id}
              className={styles.postLink}
            >
              <div className={styles.post_card}>
                <div className={styles.post_image}>
                  <img
                    src={project.image}
                    alt=""
                    onError={(e) => {
                      e.target.style.display = "none"; // 이미지 숨기기
                    }}
                  />
                </div>
                <div className={styles.post_content}>
                  <p>{project.name}</p>
                  <div className={styles.post_deadline}>
                    {project.start === true ||
                    calculateDDay(project.deadlineAt) === false ? (
                      <p>마감</p>
                    ) : (
                      <>
                        <p>마감일</p>
                        <span>{calculateDDay(project.deadlineAt)}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className={styles.noSearch}>
            <p>검색 결과가 없습니다.</p>
          </div>
        )}
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default RecruitMain;
