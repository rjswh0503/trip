import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../shared/context/auth-context';



const NewPost = () => {

    const { token } = useAuth();
    const Navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
    });

    const [imageFile, setImageFile] = useState([]);
    const [previewUrl, setPreviewUrl] = useState([]);


    const NewPostHandler = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('title', formData.title);
        data.append('content', formData.content);
        imageFile.forEach(file => data.append('images', file));
        try {
            const response = await axios.post('http://localhost:5000/api/posts/add',
                data,

                {
                    headers: {
                        Authorization: `Bearer ${token}`, // 꼭 필요!

                    }
                }
            );
            setFormData({
                title: '',
                content: '',
            });
            setImageFile([]);
            setPreviewUrl([]);

            console.log('작성성공' + response)
            alert('게시글 작성 성공');
            Navigate('/posts/list');

        } catch (e) {
            console.log(e);
        }

    }

    // 이미지 추가 핸들러
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImageFile(prev => [...prev, ...files]);
        const previews = files.map(file => URL.createObjectURL(file));
        setPreviewUrl(prev => [...prev, ...previews]);
    }


    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    return (
        <div className="max-w-[700px] mx-auto mt-40 mb-16 p-8 bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
            <h2 className="text-2xl font-bold mb-6">게시글 작성</h2>
            <form className="flex flex-col gap-5" onSubmit={NewPostHandler}>
                <input
                    type="text"
                    name="title"
                    placeholder="제목을 작성하세요."
                    onChange={onChange}
                    value={formData.title}
                    required
                    className="h-12 px-4 py-3 border border-gray-300 rounded-lg text-base w-full"
                />
                <textarea
                    name="content"
                    placeholder="내용을 작성하세요."
                    onChange={onChange}
                    value={formData.content}
                    required
                    className="min-h-[160px] px-4 py-3 border border-gray-300 rounded-lg text-base w-full resize-y"
                />
                <input
                    type="file"
                    name="files"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="text-sm"
                    multiple
                />
                {previewUrl.length > 0 && (
                    <div className="flex flex-wrap gap-3 my-4">
                        {previewUrl.map((url, idx) => (
                            <img
                                key={idx}
                                src={url}
                                alt={`미리보기-${idx}`}
                                className="w-[150px] rounded-lg border border-gray-300 object-cover"
                            />
                        ))}
                    </div>
                )}
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-base font-medium transition-colors"
                >
                    작성하기
                </button>
            </form>
        </div>


    )
}

export default NewPost;