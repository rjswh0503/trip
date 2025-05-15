import React from "react";


import Top5Places from "./top5Places";

import RegionList from "./regionList";

import NewPostList from './newPostList';

import LatestReview from "./latestReview";


const Main = () => {

    console.log('API URL:', process.env.REACT_APP_API_URL);

    return (
        <div className="container mx-auto">
            <div>


            </div>
            {/* 인기 여행지(추천) Top5 리스트 */}
            <div className="p-10 flex justify-center my-auto">

                <Top5Places />

            </div>
            {/* 새 게시글 리스트 limit 3 + 새 리뷰 리스트 limit 3 */}
            <div className="flex justify-around mt-10">
                <div>
                    <NewPostList />
                </div>
                {/* 인기 리뷰 (추천 많이 받은 수) */}
                <div>
                    <LatestReview />
                </div>
            </div>

            {/* 지역별 여행지 리스트 */}
            <div className="p-10 ">
                <RegionList />
            </div>
        </div>
    )
}

export default Main;