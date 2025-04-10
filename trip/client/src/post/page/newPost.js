import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../shared/context/auth-context';
import './newPost.css';


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
        <div className="create-post-wrapper">
            <h2>게시글 작성</h2>
            <form className="create-post-form" onSubmit={NewPostHandler}>
                <input
                    type="text"
                    name="title"
                    placeholder="제목을 작성하세요."
                    onChange={onChange}
                    value={formData.title}
                    required
                    className="post-input title-input"
                />

                <textarea
                    name="content"
                    placeholder="내용을 작성하세요."
                    onChange={onChange}
                    value={formData.content}
                    required
                    className="post-textarea"
                />

                <input
                    type="file"
                    name="files"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="image-upload-input"
                    multiple
                />

                {previewUrl.length > 0 && (
                    <div className="image-preview-list">
                        {previewUrl.map((url, idx) => (
                            <img key={idx} src={url} alt={`미리보기-${idx}`} className="image-preview"/>
                            
                        ))}
                    </div>
                )}

                <button type="submit" className="submit-button">
                    작성하기
                </button>
            </form>
        </div>

    )
}

export default NewPost;