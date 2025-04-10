import React, { useState } from 'react';

import './comment.css';


const NewComment = ({ onAddComment }) => {

    const [formData, setFormData] = useState({
        content: ''
    });

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    const NewCommentHandler = async (e) => {
        e.preventDefault();

        try {
            await onAddComment({
                content: formData.content
            });
            setFormData({ content: '' });
            alert('댓글작성 성공!');
        } catch (e) {
            console.log('덧글 작성 실패' + e);
        }
    };



    return (
        <div className="comment-form-wrapper">
            <form className="comment-form" onSubmit={NewCommentHandler}>
                <input
                    type="text"
                    name="content"
                    placeholder="덧글을 입력하세요."
                    onChange={onChange}
                    value={formData.content}
                    required
                    className="comment-input"
                />
                <button type="submit" className="comment-submit-button">
                    덧글 작성
                </button>
            </form>
        </div>

    )

}

export default NewComment;