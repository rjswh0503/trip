import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card } from 'flowbite-react';


const LatestPost = () => {

    const [latestPost, setLatesPost] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/posts/latestPost');
                setLatesPost(response.data.latestPosts);

            } catch (e) {
                console.error("애러발생", e);
            }
        };
        fetchData();
    }, []);
    // [빈배열]은 딱 처음 한 번만 랜더링 함.


    return (
        <div className='container mx-auto'>
            <h2 className='text-2xl font-black py-3 '>새로 등록된 게시글</h2>
            <div className='grid grid-rows-2 gap-4 justify-start'>
                {latestPost.map(post => (
                    <div  key={post._id}>
                        <Card className='max-w-sm shadow-sm hover:shadow-lg'>
                            <h5 className='text-2xl font-bold tracking-tight'>{post.title}</h5>
                            <p className='font-nomal text-gray-700'>{post.content}</p>
                            <Link to={`/posts/${post._id}`}><p className='text-sm text-gray-500 hover:text-gray-700 hover:underline justify-end'>자세히보기</p></Link>
                        </Card>
                    </div>
                    
                ))}
                
            </div>
        </div>
    )
}

export default LatestPost;