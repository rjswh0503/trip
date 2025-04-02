import React from "react";



import UserInfo from "../components/UserInfo";
import './myPage.css';




const MyPage = () => {

    return (
        <div className="mypage-container">
            <div className="mypage-header">
                <h1>마이페이지</h1>
            </div>

            <div className="profile-section">
                <div className="profile-info">
                    <UserInfo/>
                </div>
            </div>

            <div className="section">
                <h3>나의 찜 목록</h3>
                
            </div>

            <div className="section">
                <h3>나의 좋아요</h3>
                
            </div>

            <div className="section">
                <h3>내가 작성한 게시글</h3>
                
            </div>

            <div className="section">
                <h3>내가 작성한 댓글</h3>
                
            </div>
        </div>

    )

}

export default MyPage;