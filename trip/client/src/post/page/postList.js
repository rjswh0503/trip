import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useAuth } from '../../shared/context/auth-context';
import Card from '../../shared/components/UI/Card';
import './postList.css';



const PostList = () => {
    const { token } = useAuth();
    const [posts, setPosts] = useState([]); // 전체 게시글 조회 같은 경우에는 배열로 데이터를 받아오기 때문에 빈 배열 생성



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/posts/list', {
                    headers: {
                        Authorization: `Bearer ${token}`, // 꼭 필요!
                    },
                })
                setPosts(response.data.postList);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();


    }, [token]);


    if (!posts || posts.length === 0) {
        return <p style={{ textAlign: 'center', marginTop: '10rem' }}>게시글이 없습니다...</p>
    }




    return (
        <div>
            <div className='post-list'>
                <h1 style={{ marginBottom: '10rem' }}>여행 게시판</h1>
                <div className='post-grid'>
                    {posts && posts.map(post => (
                        <Card
                            key={post._id}
                            id={post._id}
                            images={post.images[0] || ''}
                            title={post.title}
                            author={post.author?.name}
                            date={post.createdAt}
                        />
                    ))}
                </div>
            </div>
        </div>
    )

}

export default PostList;