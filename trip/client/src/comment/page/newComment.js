import React, { useState } from 'react';



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
            if (e.response && e.response.status === 401) {
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
        <div className="mt-6">
            <form
                className="flex items-center gap-2"
                onSubmit={NewCommentHandler}
            >
                <input
                    type="text"
                    name="content"
                    placeholder="덧글을 입력하세요."
                    onChange={onChange}
                    value={formData.content}
                    required
                    className="flex-grow border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    덧글 작성
                </button>
            </form>
        </div>


    )

}

export default NewComment;