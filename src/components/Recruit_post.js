import React from "react";
import { useLocation } from "react-router-dom";
import styles from '../styles/Recruit_post.module.css';

const RecruitPost = () => {

    const location = useLocation();
    const { post } = location.state || {};//post가 없을 경우 대비

    if (!post) {
        return <div>해당 게시글을 찾을 수 없습니다.</div>;
    }


    // const [posts, setPosts] = useState([{
    //     id: "1",
    //     imageURL: '/assets/kw_logo.jpg', // public 폴더 기준 경로
    //     title: "해커톤 같이 나갈 개발자 구함",
    //     deadline: "2024-10-01",
    //     date: "2023-09_14",
    //     content: "안녕하세요"
    // }])

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
                <button>팀플신청</button>
            </div>
        </div>





    );



};
export default RecruitPost;