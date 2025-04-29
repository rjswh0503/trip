import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Avatar } from 'flowbite-react';


const LatestPost = () => {

    const [latestPost, setLatesPost] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/posts/latestPost');
                setLatesPost(response.data.latestPosts);
                console.log(response.data.latestPosts);

            } catch (e) {
                console.error("애러발생", e);
            }
        };
        fetchData();
    }, []);
    // [빈배열]은 처음 한 번만 랜더링 함.


    return (
        <div className='px-6'>
            <h2 className='text-2xl font-black py-3 '>새로 등록된 게시글</h2>
            <div className='grid grid-rows-2 gap-4 justify-start'>
                {latestPost.map(post => (
                    <div key={post._id}>
                        <div className='max-w-2xl border border-gray-200 mx-auto shadow-sm rounded-xl hover:shadow-lg px-10 py-2'>
                            <h5 className='text-2xl font-bold tracking-tight mb-2'>{post.title}</h5>
                            <p className='font-nomal text-gray-700 mb-4'>{post.content}</p>
                            <div className='flex justify-start items-center gap-4 mb-6'>
                                <Avatar alt='유저프로필' img={post.author?.image} rounded bordered />
                                <p>{post.author?.name}</p>
                            </div>

                            <Link to={`/posts/${post._id}`}><p className='text-sm text-gray-500 hover:text-gray-700 hover:underline justify-end'>자세히보기</p></Link>
                        </div>
                    </div>

                ))}

            </div>
        </div>
    )
}

export default LatestPost;