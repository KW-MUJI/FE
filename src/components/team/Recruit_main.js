import React, { useState, useEffect } from "react";
import styles from '../../styles/Recruit_main.module.css';
import { Link, useNavigate } from 'react-router-dom';


//백에서 maxpage값 받아서하기
const RecruitMain = () => {

    //검색창 상태
    const [search, setSearch] = useState('');
    //게시글 배열 상태관리
    const [posts, setPosts] = useState([{
        id: "1",
        imageURL: '/assets/kw_logo.jpg', // public 폴더 기준 경로
        title: "해커톤 같이 나갈 sss개발자 구함",
        deadline: "2024-10-01",
        content:"안녕하세요, 저는 소프트웨어학부 19학번 김참빛입니다.\n현재 백앤드 2명 모인 상황이고, 프론트엔드 2분 모집하고 있습니다.\n 저희는 두명 다 개발 경험 및 공모전 경험이 있습니다.\n 수상을 목표로 하고 있어서, 개발 경험 있으신 분이면 좋겠습니다.\n 관심있으시면 연락 부탁드립니다.",
        date:"2024-09-19"
    },
    {
        id: "2",
        imageURL: '/assets/kw_logo.jpg', // public 폴더 기준 경로
        title: "해커톤 같이 나갈 개발자 구함",
        deadline: "2024-10-01",
        content:"2번입니다",
        date:"2024-09-19"
    },
    {
        id: "3",
        imageURL: '/assets/kw_logo.jpg', // public 폴더 기준 경로
        title: "해커톤 같이 나갈 개발자 구함",
        deadline: "2024-10-01",
        content:"3번입니다",
        date:"2024-09-19"
    },
    {
        id: "4",
        imageURL: '/assets/kw_logo.jpg', // public 폴더 기준 경로
        title: "해커톤 같이 나갈 개발자 구함",
        deadline: "2024-10-01",
        content:"4번입니다",
        date:"2024-09-19"
    },
    {
        id: "5",
        imageURL: '/assets/kw_logo.jpg', // public 폴더 기준 경로
        title: "해커톤 같이 나갈 개발자 구함",
        deadline: "2024-10-01",
        content:"5번입니다",
        date:"2024-09-19"
    },
    {
        id: "6",
        imageURL: '/assets/kw_logo.jpg', // public 폴더 기준 경로
        title: "해커톤 같이 나갈 개발자 구함",
        deadline: "2024-10-01",
        content:"6번입니다",
        date:"2024-09-19"
    },
    {
        id: "7",
        imageURL: '/assets/kw_logo.jpg', // public 폴더 기준 경로
        title: "해커톤 같이 나갈 개발자 구함",
        deadline: "2024-10-01",
        content:"7번입니다",
        date:"2024-09-19"
    },
    {
        id: "8",
        imageURL: '/assets/kw_logo.jpg', // public 폴더 기준 경로
        title: "해커톤 같이 나갈 개발자 구함",
        deadline: "2024-10-01",
        content:"8번입니다",
        date:"2024-09-19"
    },
    {
        id: "9",
        imageURL: '/assets/kw_logo.jpg', // public 폴더 기준 경로
        title: "해커톤 같이 나갈 개발자 구함",
        deadline: "2024-10-01",
        content:"번입니다",
        date:"2024-09-19"
    }

    ]);

    //페이지네이션 상태
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 8; //한페이지에 보여줄 포스트개수

    //현재 페이지에 보여줄 포스트 계산
    const lastPost = currentPage * postsPerPage; //최대보여줄 수 있는 post수
    const firstPost = lastPost - postsPerPage;//보여줄 첫번째 인덱스
    const currentPosts = posts.slice(firstPost, lastPost);


    //페이지 수 계산
    const totalPages = Math.ceil(posts.length / postsPerPage);
    const today =new Date();

    const calculateDDay = (targetDate) => {
        // const today = new Date();  // 오늘 날짜
        const target = new Date(targetDate);  // 목표 날짜 (YYYY-MM-DD 형식으로 입력)

        // 밀리초 단위로 차이를 계산
        const diffInMilliseconds = target - today;

        // 밀리초를 일 단위로 변환 (밀리초 -> 초 -> 분 -> 시간 -> 일)
        const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));

        return diffInDays;  // D-day 남은 일수 반환
    };

    // 페이지 변경 함수
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    }
    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);

    }
    const navigateToWriting = () => {
        window.open("/recruit_write");
    };

    const dDay = () => {

    }
    // useEffect(() => {
    //     const fetchPosts = async () => {
    //         try {
    //             const response = await fetch('/api/recruit');
    //             const data = await response.json();
    //             setPosts(data); // 상태 업데이트
    //         } catch (error) {
    //             console.error('Error fetching posts:', error);
    //         }
    //     };
    //     fetchPosts();
    // }, []);


    //검색창 상태 저장 함수
    const onChange = (e) => {
        setSearch(e.target.value)
    }

    return (
        <div className={styles.recruit_main}>
            <div className={styles.recruit_header}>
                <h2>팀플모집</h2>

                <button htmlFor="writing_button" className={styles.writing_button} onClick={navigateToWriting}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="29" viewBox="0 0 28 29" fill="none" className={styles.writing_icon}>

                        <path d="M14 23.6331H24.5M19.25 4.38308C19.7141 3.91895 20.3436 3.6582 21 3.6582C21.325 3.6582 21.6468 3.72222 21.9471 3.84659C22.2474 3.97097 22.5202 4.15326 22.75 4.38308C22.9798 4.61289 23.1621 4.88572 23.2865 5.18598C23.4109 5.48625 23.4749 5.80807 23.4749 6.13308C23.4749 6.45808 23.4109 6.7799 23.2865 7.08017C23.1621 7.38044 22.9798 7.65326 22.75 7.88308L8.16667 22.4664L3.5 23.6331L4.66667 18.9664L19.25 4.38308Z" stroke="#1E1E1E" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    글쓰기
                </button>
            </div>

            <div className={styles.search_container}>
                <input type="text" value={search} onChange={onChange} placeholder="검색할 내용을 입력하세요." />
                <button className={styles.search_button}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="37" height="38" viewBox="0 0 37 38" fill="none">
                        <path d="M30.2167 33.25L20.5042 23.275C19.7333 23.9083 18.8469 24.4097 17.8448 24.7792C16.8427 25.1486 15.7764 25.3333 14.6458 25.3333C11.8451 25.3333 9.47483 24.3372 7.5349 22.3448C5.59497 20.3524 4.625 17.9181 4.625 15.0417C4.625 12.1653 5.59497 9.7309 7.5349 7.73854C9.47483 5.74618 11.8451 4.75 14.6458 4.75C17.4465 4.75 19.8168 5.74618 21.7568 7.73854C23.6967 9.7309 24.6667 12.1653 24.6667 15.0417C24.6667 16.2028 24.4868 17.2979 24.1271 18.3271C23.7674 19.3562 23.2792 20.2667 22.6625 21.0583L32.375 31.0333L30.2167 33.25ZM14.6458 22.1667C16.5729 22.1667 18.2109 21.474 19.5599 20.0885C20.9089 18.7031 21.5833 17.0208 21.5833 15.0417C21.5833 13.0625 20.9089 11.3802 19.5599 9.99479C18.2109 8.60938 16.5729 7.91667 14.6458 7.91667C12.7188 7.91667 11.0807 8.60938 9.73177 9.99479C8.38281 11.3802 7.70833 13.0625 7.70833 15.0417C7.70833 17.0208 8.38281 18.7031 9.73177 20.0885C11.0807 21.474 12.7188 22.1667 14.6458 22.1667Z" fill="#B3B3B3" />
                    </svg>
                </button>



            </div>

            <div className={styles.posts_container}>
                {currentPosts.length === 0 ? (
                    <p>게시글이 없습니다.</p>
                ) : (
                    currentPosts.map((post) => (
                        <Link to={`/recruit_post/${post.id}`} state={{post}}>
                    
        
                        <div key={post.id} className={styles.post_card}>
                            {/* 미리보기 이미지 */}
                            {post.imageURL && (
                                <img src={post.imageURL} alt="미리보기" className={styles.post_image} />
                            )}
                            <div className={styles.post_content}>
                                <h3>{post.title}</h3>
                                <div className={styles.post_deadline}>
                                    <p>마감일 </p>
                                    <span>D-{calculateDDay(post.date)}</span>
                                </div>

                            </div>

                        </div>
                        </Link>


                    ))
                )}
            </div>

            <div className={styles.pageMove}>
                {/* 이전페이지 */}
                <button onClick={prevPage} disabled={currentPage === 1} className={styles.arrow_button}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M16 5L16 19L5 12L16 5Z" fill="#1D1B20" />
                    </svg>
                </button>

                {/* 페이지번호 */}
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={currentPage !== index + 1 ? styles.active : styles.nonactive}
                    >
                        {index + 1}
                    </button>
                ))}

                {/*다음페이지  */}
                <button onClick={nextPage} disabled={currentPage === totalPages} className={styles.arrow_button}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M8 19V5L19 12L8 19Z" fill="#1D1B20" />
                    </svg>
                </button>
            </div>




        </div>

    );
};

export default RecruitMain