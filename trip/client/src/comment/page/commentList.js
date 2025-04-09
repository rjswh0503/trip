import React from 'react';
import { MdDelete } from "react-icons/md";

const CommentList = ({ comments, onDelete }) => {


    return (
        <div>
            <h1 style={{ marginTop: '10rem' }}>댓글</h1>
            {comments.length > 0 ? (
                comments.map(comment => (
                    <div key={comment._id}>
                        <p>
                            <strong>{comment.author?.name}</strong>: {comment.content}
                            <span onClick={() => onDelete(comment._id)}><MdDelete /></span>
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
