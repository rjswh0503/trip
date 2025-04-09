import React from 'react';
import { useAuth } from '../../shared/context/auth-context';
import axios from 'axios';
import { MdDelete } from "react-icons/md";

const CommentList = ({ comments }) => {
    const { token } = useAuth();

    const handleDelete = async (commentId) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            try {
                const response = await axios.delete(
                    `http://localhost:5000/api/comment/${commentId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                    }
                );
                console.log('삭제완료', response);
                alert('삭제완료');

            } catch (e) {
                console.log('삭제실패', e);
                alert('삭제 실패');
            }
        }
    };

    return (
        <div>
            <h1 style={{ marginTop: '10rem' }}>댓글</h1>
            {comments.length > 0 ? (
                comments.map(comment => (
                    <div key={comment._id}>
                        <p>
                            <strong>{comment.author?.name}</strong>: {comment.content}
                            <span onClick={() => handleDelete(comment._id)}><MdDelete /></span>
                        </p>
                    </div>
                ))
            ) : (
                <p>덧글이 없습니다.</p>
            )}
        </div>
    );
};

export default CommentList;
