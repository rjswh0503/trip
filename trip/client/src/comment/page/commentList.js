import React from 'react';
import { Link } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { useAuth } from '../../shared/context/auth-context';

const CommentList = ({ comments, onDelete }) => {

    const { user } = useAuth();


    return (
        <div className="comment-section">
            <h1 className="comment-title">댓글</h1>

            {comments.length > 0 ? (
                comments.map((comment) => (
                    <div key={comment._id} className="comment-item">
                        <p className="comment-content">
                            <strong style={{color:'black'}} className="comment-author"><Link to={`/${comment.author._id}/mypage`} style={{ textDecoration: 'none' }}>{comment.author?.name}</Link></strong>
                            <span className="comment-text">: {comment.content}</span>
                            {user?.userId === comment.author._id && (
                                <span
                                className="comment-delete-icon"
                                onClick={() => onDelete(comment._id)}
                            >
                                <MdDelete />
                            </span>
                            )}
                        </p>
                    </div>
                ))
            ) : (
                <p className="no-comment-text">덧글이 없습니다.</p>
            )}
        </div>
    );
};

export default CommentList;
