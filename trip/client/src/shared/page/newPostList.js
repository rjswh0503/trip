import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';
import { Avatar } from 'flowbite-react';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

const LatestPost = () => {

    const [latestPost, setLatesPost] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/posts/popular`);
                setLatesPost(response.data.topPosts);
                console.log(response.data.topPosts);

            } catch (e) {
                console.error("애러발생", e);
            }
        };
        fetchData();
    }, []);
    // [빈배열]은 처음 한 번만 랜더링 함.


    


    return (
        <div className="px-6 max-w-7xl mx-auto">
            <div className="flex gap-1 items-center justify-between ">
                <h2 className="text-2xl font-bold">🆕 새로 등록된 게시글</h2>
                <Link
                    to="/posts/list"
                    className="text-sm text-gray-400 hover:underline hover:text-gray-600"
                >
                    전체보기
                </Link>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-rows-1 gap-6">
                {latestPost.map((post) => (
                    <div
                        key={post._id}
                        className="w-96 border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col justify-between min-h-[270px]"
                    >
                        <div>
                            <h5 className="text-lg font-bold text-gray-900 mb-2">
                                {post.title}
                            </h5>
                            <p className=" text-gray-700  font-normal mb-4 line-clamp-2">
                                {post.content}
                            </p>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Avatar alt="유저프로필" img={post.author?.image} rounded size="sm" />
                                <p className="text-sm text-gray-800">{post.author?.name}</p>
                            </div>
                            <p className="text-xs text-gray-500">
                                {formatDistanceToNow(new Date(post.createdAt), {
                                    addSuffix: true,
                                    locale: ko,
                                })}
                            </p>
                        </div>
                        <div className="mt-4 text-right">
                            <Link
                                to={`/posts/${post._id}`}
                                className="text-sm text-blue-500 hover:underline"
                            >
                                자세히 보기
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>


    )
}

export default LatestPost;