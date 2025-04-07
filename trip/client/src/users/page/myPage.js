import React from "react";



import UserInfo from "../components/UserInfo";
import MyPost from "../components/myPost";
import MyComment from "../components/myComment";
import './myPage.css';





const MyPage = () => {


    return (
        <div className="mypage-container">
            

            <div className="profile-section">
                <div className="profile-info">
                    <UserInfo />
                </div>
            </div>

            <div className="section">
                <h3>찜 목록</h3>

            </div>

            <div className="section">
                <h3> 좋아요 목록</h3>

            </div>

            <div className="section">
                <h3> 작성한 게시글</h3>
                <MyPost />
            </div>

            <div className="section">
                <h3> 작성한 댓글</h3>
                <MyComment />
            </div>
        </div>

    )

}

export default MyPage;