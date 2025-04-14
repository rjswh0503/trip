import React from "react";
import { Link, Outlet, useLocation } from 'react-router-dom';
import UserInfo from '../components/UserInfo';
import './myPage.css';

const MyPage = () => {
    const location = useLocation();

    

    return (
        <div className="mypage-container">
            
            <UserInfo />

            <nav className="mypage-tabs">
                <Link
                    to="post"
                    className={location.pathname.includes('/post') ? 'tab active' : 'tab'}
                >
                    작성한 글
                </Link>
                <Link
                    to="comments"
                    className={location.pathname.includes('/comments') ? 'tab active' : 'tab'}
                >
                    작성한 댓글
                </Link>
                <Link
                    to="bookmarks"
                    className={location.pathname.includes('/bookmarks') ? 'tab active' : 'tab'}
                >
                    찜 목록
                </Link>
                <Link
                    to="likes"
                    className={location.pathname.includes('/likes') ? 'tab active' : 'tab'}
                >
                    좋아요 목록
                </Link>
            </nav>

            <div className="mypage-content">
                <Outlet />
            </div>
        </div>
    );
};

export default MyPage;
