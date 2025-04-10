import React from 'react';
import { MdDelete } from "react-icons/md";

const CommentList = ({ comments, onDelete }) => {


    return (
        <div className="comment-section">
            <h1 className="comment-title">댓글</h1>

            {comments.length > 0 ? (
                comments.map((comment) => (
                    <div key={comment._id} className="comment-item">
                        <p className="comment-content">
                            <strong className="comment-author">{comment.author?.name}</strong>
                            <span className="comment-text">: {comment.content}</span>
                            <span
                                className="comment-delete-icon"
                                onClick={() => onDelete(comment._id)}
                            >
                                <MdDelete />
                            </span>
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
