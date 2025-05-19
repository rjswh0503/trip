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
                const response = await axios.get(`http://localhost:5000/api/posts/popular`);
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
            <div className="flex gap-2 items-center ">
                <h2 className="text-2xl font-bold"> 새로 등록된 게시글</h2>
                <Link
                    to="/posts/list"
                    className="text-sm text-gray-400 hover:underline hover:text-gray-600"
                >
                    전체보기
                </Link>
            </div>
            <div className="grid grid-cols-3 gap-4 my-6">
                {latestPost.map((post) => (
                    <div
                        key={post._id}
                        className="w-96 border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col justify-between"
                    >
                        <div>
                            <h5 className="text-lg font-bold text-gray-900 mb-2">
                                {post.title}
                            </h5>
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