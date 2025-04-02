import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../shared/context/auth-context';



const PostDetail = () => {
    const { token } = useAuth();
    const { id } = useParams();
    const [detail, setDetail] = useState(null);


    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/posts/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, 
                        },
                    })
                setDetail(response.data.post);
            } catch (e) {
                console.log(e);
            }
        };

        fetchData();
    }, [id,token]);
    //id의 값이 변경될 때마다 리 랜더링함.

    


    return (
        <div>
            {detail ? (
                <>
                <h2>제목: {detail.title}</h2>
                <h4>내용: {detail.content}</h4>
                <p>작성자: {detail.author?.name}</p>
                
                </>
            ): (
             <p>로딩중..</p>
            )}
        </div>
    )

}

export default PostDetail;