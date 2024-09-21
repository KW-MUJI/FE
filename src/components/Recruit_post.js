import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from '../styles/Recruit_post.module.css';


// 모달 컴포넌트
const Modal = ({ isOpen, onClose, portfolios, selectedPortfolio, handleSelectPortfolio, handleSubmit }) => {


    if (!isOpen) return null; // 모달이 열릴 때만 표시

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalhead}>
                    <h2>포트폴리오 선택</h2>
                </div>
                <div className={styles.portfolios}>
                    {portfolios.map((portfolio) => (
                        <div key={portfolio.id}
                            className={`${styles.portfolio_item} ${selectedPortfolio === portfolio.id ? styles.selected : ''}`}
                            onClick={() => handleSelectPortfolio(portfolio.id)} >
                            <label className={styles.portfolio_label}>
                                {/* 텍스트를 클릭 했을 때에도 눌리도록 label로 감싸줌 */}
                                <input type="radio"
                                    name="portfolio"
                                    value={portfolio.id}
                                    checked={selectedPortfolio === portfolio.id}
                                    onChange={() => handleSelectPortfolio(portfolio.id)}
                                    className={styles.radio_input}
                                />

                                <span className={styles.radio_custom}>
                                    {selectedPortfolio === portfolio.id ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                            <circle cx="7.5" cy="7.5" r="6.78814" fill="white" stroke="#8B0B02" stroke-width="1.42373" />
                                            <ellipse cx="7.50027" cy="7.50027" rx="4.77273" ry="4.77273" fill="#8B0B02" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                            <circle cx="7.5" cy="7.5" r="7" stroke="#B3B3B3" />
                                        </svg>
                                    )}

                                </span> {/* 라디오 버튼 커스터마이징 */}

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
            </div>


        </div>
    );
};

const RecruitPost = () => {
    const location = useLocation();
    const { post } = location.state || {};//post가 없을 경우 대비


    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
    const [selectedPortfolio, setSelectedPortFolid] = useState(null);
    const [applicationSubmitted, setApplicationSubmitted] = useState(false); //지원여부
    const [portfolios, setPortfolios] = useState([{ //포트폴리오 
        id: "1",
        title: "경험많은 참빛 개발자 입니다.",
        modified_date: "2024-09-12",
    },
    {
        id: "2",
        title: "발표 잘하는 19화석입니다.",
        modified_date: "2024-09-12",
     },
    {
        id: "3",
        title: "성실하고 열정가득한 지원자입니다",
        modified_date: "2024-09-12",
    }
    ]
    );



    const handleOpenModal = () => {
        setIsModalOpen(true); // 모달 열기
    };

    const handleCloseModal = () => {
        setSelectedPortFolid(null);
        setIsModalOpen(false); // 모달 닫기
    };

    const handleSelectPortfolio = (portfolioID) => {
        setSelectedPortFolid(portfolioID);//선택된 포트폴리오 업데이트

        console.log(`${portfolioID} 선택됨`);
    }

    const handleSubmit = () => {
        if (!selectedPortfolio) {
            alert("포트폴리오를 선택해주세요");
            return;
        }
        alert("신청이 완료되었습니다.")
        setApplicationSubmitted(true);
        handleCloseModal(); // 모달 닫기
    }



    if (!post) {
        return <div>해당 게시글을 찾을 수 없습니다.</div>;
    }
    



    return (

        <div className={styles.top}>
            <div className={styles.recruit_post}>
                <div className={styles.recruit_menu}><h>팀플모집</h></div>

                <div className={styles.recruit_header}>
                    <h>{post.title}</h>
                    <p>마감일 {post.deadline}</p>
                </div>



                <p className={styles.date}>작성일: {post.date}</p>
                <div className={styles.recruit_contents}>

                    <div className={styles.post_contents}
                        dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br />") }} // 줄바꿈 처리
                    />

                    {post.imageURL && (
                        <img src={post.imageURL} alt="미리보기" className={styles.post_image} />
                    )}
                </div>

            </div>
            <div className={styles.button_container}>
                <button onClick={handleOpenModal}
                    disabled={applicationSubmitted}//true면 버튼 활성화.
                >
                    {applicationSubmitted ? "신청완료" : "팀플신청"}
                </button>
            </div>

            {/* 모달 컴포넌트 호출 */}
            <Modal isOpen={isModalOpen}
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