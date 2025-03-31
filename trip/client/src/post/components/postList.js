import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../shared/context/auth-context';
import { Link } from 'react-router-dom';


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
                });
                setPosts(response.data.postList);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, [token]);


    return (
        <div>
            <h1>게시글 목록</h1>
            {posts && posts.map(post => (
                <div key={post._id}>
                    <div>
                        <Link to={`/posts/${post._id}`}>{post.title}</Link>

                    </div>
                    <div>
                        작성자:{post.author.name}
                    </div>
                </div>
            ))}

        </div>
    )

}

export default PostList;