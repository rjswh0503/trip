import React from "react";
import { Link, Outlet, useLocation } from 'react-router-dom';
import UserInfo from '../components/UserInfo';
import { FiFileText, FiMessageSquare, FiBookmark, FiHeart, FiStar } from 'react-icons/fi';

const MyPage = () => {
    const location = useLocation();



    return (


        <div className="max-w-4xl mx-auto px-4 py-8">
            <UserInfo />

            <nav className="flex flex-wrap justify-center gap-4 py-6 border-b border-gray-200">
                <Link
                    to="post"
                    className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition ${location.pathname.includes('/post')
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                        }`}
                >
                    <FiFileText className="text-lg" />
                    작성한 글
                </Link>
                <Link
                    to="comments"
                    className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition ${location.pathname.includes('/comments')
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                        }`}
                >
                    <FiMessageSquare className="text-lg" />
                    작성한 댓글
                </Link>
                <Link
                    to="bookmarks"
                    className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition ${location.pathname.includes('/bookmarks')
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                        }`}
                >
                    <FiBookmark className="text-lg" />
                    찜 목록
                </Link>
                <Link
                    to="likes"
                    className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition ${location.pathname.includes('/likes')
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                        }`}
                >
                    <FiHeart className="text-lg" />
                    좋아요 목록
                </Link>
                <Link
                    to="reviews"
                    className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition ${location.pathname.includes('/reviews')
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                        }`}
                >
                    <FiStar className="text-lg" />
                    리뷰 목록
                </Link>
            </nav>

            <div className="py-8">
                <Outlet />
            </div>
        </div>

    );
};

export default MyPage;
