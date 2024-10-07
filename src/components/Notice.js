import styles from '../styles/Notice.module.css';
import React, { useEffect, useState } from 'react';
import { getNotices } from '../services/Service.js'; // API 함수 가져오기


const Notice = () => {
    const [selectedCategory, setSelectedCategory] = useState("전체");
    const [query, setQuery] = useState("");//검색어 상태
    const [currentPage, setCurrentPage] = useState("1");
    const [results, setResults] = useState([]);//검색결과 상태
    const [notices, setNotices] = useState({
        notices: {
            category: [],
            title: [],
            link: [],
            views: [],
            createdDate: [],
            updatedDate: [],
            team: [],
        }
    }




    );


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getNotices(currentPage, query, selectedCategory);
                setNotices(data.data.notices);
            } catch (error) {
                console.error("Error fetching notices:", error);
            }
        };
        fetchData();
    }, [currentPage, query, selectedCategory]) // 페이지, 검색어, 카테고리가 바뀔 때마다 다시 호출

    //입력 값 변경할 때 호출
    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    //검색 버튼 누를때 호출
    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1); // 검색하면 첫 페이지로 돌아감

    }

    const handleChangeCategory = (category) => {
        setSelectedCategory(category);
        console.log(category)
    };

    return (<div className={styles.notice_container}>
        <h className={styles.header}>Notice</h>

        <form onSubmit={handleSearch} className={styles.search_form}>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="검색할 내용을 입력하세요"
                className={styles.search_input}
            />
            <button type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
                <path d="M30.2376 33.25L20.533 23.275C19.7628 23.9083 18.8771 24.4097 17.8758 24.7792C16.8745 25.1486 15.8091 25.3333 14.6794 25.3333C11.881 25.3333 9.51263 24.3372 7.57428 22.3448C5.63592 20.3524 4.66675 17.9181 4.66675 15.0417C4.66675 12.1653 5.63592 9.7309 7.57428 7.73854C9.51263 5.74618 11.881 4.75 14.6794 4.75C17.4778 4.75 19.8462 5.74618 21.7846 7.73854C23.7229 9.7309 24.6921 12.1653 24.6921 15.0417C24.6921 16.2028 24.5124 17.2979 24.153 18.3271C23.7935 19.3562 23.3057 20.2667 22.6896 21.0583L32.3942 31.0333L30.2376 33.25ZM14.6794 22.1667C16.6049 22.1667 18.2416 21.474 19.5895 20.0885C20.9374 18.7031 21.6113 17.0208 21.6113 15.0417C21.6113 13.0625 20.9374 11.3802 19.5895 9.99479C18.2416 8.60938 16.6049 7.91667 14.6794 7.91667C12.7539 7.91667 11.1172 8.60938 9.76936 9.99479C8.4215 11.3802 7.74757 13.0625 7.74757 15.0417C7.74757 17.0208 8.4215 18.7031 9.76936 20.0885C11.1172 21.474 12.7539 22.1667 14.6794 22.1667Z" fill="#B3B3B3" />
            </svg></button>
        </form>

        {/* 카테고리 */}
        <div className={styles.category}>

            <button onClick={() => handleChangeCategory("전체")} className={selectedCategory === "전체" ? styles.select_category : styles.nonselect_category}>전체</button>
            <button onClick={() => handleChangeCategory("일반")} className={selectedCategory === "일반" ? styles.select_category : styles.nonselect_category}>일반</button>
            <button onClick={() => handleChangeCategory("학사")} className={selectedCategory === "학사" ? styles.select_category : styles.nonselect_category}>학사</button>
            <button onClick={() => handleChangeCategory("학생")} className={selectedCategory === "학생" ? styles.select_category : styles.nonselect_category}>학생</button>
            <button onClick={() => handleChangeCategory("봉사")} className={selectedCategory === "봉사" ? styles.select_category : styles.nonselect_category}>봉사</button>
            <button onClick={() => handleChangeCategory("등록/장학")} className={selectedCategory === "등록/장학" ? styles.select_category : styles.nonselect_category}>등록/장학</button>
            <button onClick={() => handleChangeCategory("입학")} className={selectedCategory === "입학" ? styles.select_category : styles.nonselect_category}>입학</button>
            <button onClick={() => handleChangeCategory("시설")} className={selectedCategory === "시설" ? styles.select_category : styles.nonselect_category}>시설</button>
            <button onClick={() => handleChangeCategory("병무")} className={selectedCategory === "병무" ? styles.select_category : styles.nonselect_category}>병무</button>
            <button onClick={() => handleChangeCategory("외부")} className={selectedCategory === "외부" ? styles.select_category : styles.nonselect_category}>외부</button>
            <button onClick={() => handleChangeCategory("국제교류")} className={selectedCategory === "국제교류" ? styles.select_category : styles.nonselect_category}>국제교류</button>
            <button onClick={() => handleChangeCategory("국제학생")} className={selectedCategory === "국제학생" ? styles.select_category : styles.nonselect_category}>국제학생</button>
        </div>

        {/* 공지사항 리스트 */}
        <ul className={styles.notice_list}>
            {notices.length > 0 ? (
                notices.map((notice, index) => (

                    <li key={index} className={styles.notice_item}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="22" viewBox="0 0 27 22" fill="none">
                            <path d="M20.7785 6.50546C20.5776 6.25549 20.2861 6.09597 19.9681 6.06198C19.6502 6.02799 19.3318 6.12232 19.083 6.32421C18.8343 6.52611 18.6755 6.81903 18.6417 7.13855C18.6079 7.45806 18.7018 7.77799 18.9027 8.02796C19.5102 8.85798 19.8378 9.86136 19.8378 10.8917C19.8378 11.9221 19.5102 12.9254 18.9027 13.7555C18.7593 13.933 18.669 14.1478 18.6423 14.3749C18.6156 14.602 18.6536 14.832 18.7518 15.0383C18.85 15.2446 19.0045 15.4186 19.1972 15.5401C19.3899 15.6617 19.613 15.7258 19.8406 15.725C20.0202 15.7257 20.1977 15.6858 20.36 15.6084C20.5223 15.5311 20.6653 15.4182 20.7785 15.278C21.7323 14.0166 22.2487 12.4759 22.2487 10.8917C22.2487 9.30748 21.7323 7.76686 20.7785 6.50546Z" fill="#4C4C4C" />
                            <path d="M22.4138 2.71156C22.2923 2.61 22.152 2.5335 22.0009 2.48644C21.8499 2.43937 21.6912 2.42265 21.5337 2.43724C21.3763 2.45183 21.2233 2.49743 21.0834 2.57145C20.9435 2.64547 20.8194 2.74645 20.7184 2.86864C20.6173 2.99082 20.5412 3.13181 20.4944 3.28356C20.4475 3.43531 20.4309 3.59484 20.4454 3.75305C20.4599 3.91125 20.5053 4.06504 20.579 4.20562C20.6526 4.34621 20.7531 4.47083 20.8747 4.57239C21.8391 5.3214 22.6247 6.2776 23.1739 7.37102C23.7232 8.46445 24.0222 9.66744 24.0492 10.892C24.0222 12.1165 23.7232 13.3195 23.1739 14.4129C22.6247 15.5063 21.8391 16.4625 20.8747 17.2116C20.7529 17.313 20.6523 17.4376 20.5785 17.5782C20.5047 17.7187 20.4593 17.8726 20.4448 18.0308C20.4303 18.1891 20.4469 18.3487 20.4939 18.5005C20.5408 18.6522 20.6171 18.7932 20.7184 18.9153C20.8314 19.0517 20.973 19.1614 21.133 19.2366C21.2931 19.3118 21.4676 19.3506 21.6443 19.3503C21.9252 19.3509 22.1975 19.2525 22.4138 19.0724C23.6529 18.099 24.659 16.8588 25.3582 15.4431C26.0574 14.0275 26.4319 12.4723 26.4541 10.892C26.4319 9.31168 26.0574 7.75648 25.3582 6.3408C24.659 4.92512 23.6529 3.68496 22.4138 2.71156Z" fill="#4C4C4C" />
                            <path d="M16.1971 0.161886C16.0143 0.0558325 15.807 0 15.5959 0C15.3848 0 15.1775 0.0558325 14.9947 0.161886L7.21475 5.53897H1.20246C0.883546 5.53897 0.577697 5.66628 0.352192 5.89288C0.126687 6.11949 0 6.42683 0 6.7473V15.0365C0 15.3569 0.126687 15.6643 0.352192 15.8909C0.577697 16.1175 0.883546 16.2448 1.20246 16.2448H7.21475L14.9225 21.5615C15.1336 21.6988 15.3805 21.7702 15.632 21.7669C15.9509 21.7669 16.2567 21.6396 16.4822 21.413C16.7077 21.1864 16.8344 20.879 16.8344 20.5586V1.22522C16.8338 1.00663 16.7743 0.792287 16.662 0.605032C16.5498 0.417778 16.3891 0.264624 16.1971 0.161886Z" fill="#4C4C4C" />
                        </svg>
                        <div className={styles.notice_data}>
                            <a href={notice.link} target="_blank" className={styles.notice_title}>
                                <h style={{color:'#8B0B02', fontWeight: '600'}}>[{notice.category}]</h>
                                <h style={{color:'#000', fontWeight: '400'}}>{notice.title}</h>
                            </a>
                            <div className={styles.notice_info}>
                            <p>조회수 {notice.views} </p>
                                <p>작성일 {notice.createdDate} </p>
                                <p>수정일 {notice.updatedDate}</p>
                                
                                <p>{notice.team} </p>
                            </div>

                        </div>


                    </li>
                ))
            ) : (
                <p>게시글이 없습니다.</p>)}
        </ul>
    </div>
    );
};
export default Notice;