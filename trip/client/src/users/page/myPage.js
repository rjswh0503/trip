import React from "react";

import { Link, Outlet } from 'react-router-dom';
import UserInfo from '../components/UserInfo';
import './myPage.css';








const MyPage = () => {




    return (
        <div>
            <h1>마이페이지</h1>
            <UserInfo />

            <nav>
                <Link to="post">내글</Link> | <Link to="comments">내 댓글</Link> | <Link to="comments">찜 목록</Link> | <Link to="comments">좋아요 목록</Link>

            </nav>
            <hr />
            <div>
                <Outlet />
            </div>
        </div>
    )

}

export default MyPage;