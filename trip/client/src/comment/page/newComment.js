import React, { useState } from 'react';


import './comment.css';
import Swal from 'sweetalert2';


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
            if(e.response && e.response.status === 401){
                Swal.fire({
                    icon: 'warning',
                    title: '로그인이 필요합니다.',
                    text: '덧글 작성하려면 먼저 로그인해주세요.',
                    confirmButtonText: '확인'
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: '요청 실패',
                    text: '잠시 후 다시 시도해주세요.',
                });
            }
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