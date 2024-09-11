import React, { useState, useEffect } from "react";
import styles from '../styles/Recruit_main.module.css';


const RecruitMain = () => {

    //검색창 상태
    const [search, setSearch] = useState('');
    //게시글 배열 상태관리
    const [posts, setPosts] = useState([]);


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('/api/recruit');
                const data = await response.json();
                setPosts(data); // 상태 업데이트
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchPosts();
    }, []);


    //검색창 상태 저장 함수
    const onChange = (e) => {
        setSearch(e.target.value)
    }

    return (
        <div className={styles.recruit_main}>
            <h2>팀플모집</h2>
            <button>글쓰기</button>
            <input type="text" value={search} onChange={onChange} />

            <div className={styles.posts_container}>
                {posts.length === 0 ? (
                    <p>게시글이 없습니다.</p>
                ) : (
                    posts.map((post) => (
                        <div key={post.id} className={styles.post_card}>
                            {/* 미리보기 이미지 */}
                            {post.imageURL && (
                                <img src={post.imageURL} alt="미리보기" className={styles.post_image} />
                            )}
                            <div className={styles.post_content}>
                                <h3>{post.title}</h3>
                                <p>{post.content}</p>
                                <span>마감일: {post.date}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>




        </div>

    );
};

export default RecruitMain