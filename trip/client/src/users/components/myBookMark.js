import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../shared/context/auth-context';
import { Link, useParams } from 'react-router-dom';


const MyBookMark = () => {

    const { token } = useAuth();
    const { id } = useParams();
    const [bookMark, setBookMark] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/${id}/bookMark`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setBookMark(response.data.bookMark);
                console.log(response.data.bookMark);
            } catch (e) {
                console.log(e);
            }

        };
        fetchData();

    }, [token, id]);

    return (
        <div>
            {bookMark && bookMark.filter(bookmark => bookmark && bookmark._id).length > 0 ? (
                <div>
                    {bookMark
                        .filter(bookmark => bookmark && bookmark._id)
                        .map(bookmark => (
                            <div key={bookmark._id}>
                                <Link to={`/posts/${bookmark.post?._id}`}>
                                    <p>{bookmark.content}</p>
                                </Link>
                            </div>
                        ))}
                </div>
            ) : (
                <div>
                    <p>북마크가 없습니다.....</p>
                </div>
            )}
        </div>
    )

}
export default MyBookMark;