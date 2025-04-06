import React, { useState } from 'react';



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
        <div style={{ marginTop: '10rem' }}>
            <form onSubmit={NewCommentHandler}>
                <input type='text' placeholder='덧글을 입력하세요.' name='content' onChange={onChange} value={formData.content} required />
                <button type='submit'>덧글 작성</button>
            </form>
        </div>
    )

}

export default NewComment;