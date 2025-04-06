import React from 'react';


const CommentList = ({ comments }) => {
    
    
    return (
        <div>
            <div>
                <h1 style={{ marginTop: '10rem' }}>댓글</h1>
                {comments.length > 0 ? (
                    comments.map(comment => (
                        <div key={comment._id}>
                            <p><strong>{comment.author?.name}</strong>: {comment.content}</p>
                        </div>
                    ))
                ) : (
                    <p>덧글이 없습니다.</p>
                )}
            </div>
        </div>
    )

}

export default CommentList;