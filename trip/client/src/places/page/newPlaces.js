import React, { useState } from "react";


import axios from "axios";
import { useAuth } from "../../shared/context/auth-context";
import { useNavigate } from "react-router-dom";



const NewPlaces = () => {

    const { token } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        city: '',
        region: '',
        address: '',
    });

    const [imageFiles, setImageFiles] = useState([]);
    const [previewUrl, setPreviewUrl] = useState([]);

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImageFiles(prev => [...prev, ...files]);
        const previews = files.map(file => URL.createObjectURL(file));
        setPreviewUrl(prev => [...prev, ...previews]);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('category', formData.category);
        data.append('city', formData.city);
        data.append('region', formData.region);
        data.append('address', formData.address);
        imageFiles.forEach(file => data.append('images', file));

        try {
            const response = await axios.post('http://localhost:5000/api/places',
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            setFormData({
                title: '',
                description: '',
                category: '',
                region: '',
                address: '',
            });
            setImageFiles([]);
            setPreviewUrl([]);
            alert('장소 등록 완료');
            navigate('/admin')
            console.log(response.data);
        } catch (e) {
            alert(e.response?.data?.message || '장소 등록 실패');
        }
    }

    return (
        <div className="container max-w-screen-xl mx-auto px-4 py-20">
            <h2 className="text-3xl font-bold mb-10">여행지 등록</h2>
            <form
                className="grid gap-6 md:grid-cols-2 bg-white border border-gray-300 rounded-xl shadow-sm p-8"
                onSubmit={handleSubmit}
            >
                <input
                    name="title"
                    placeholder="제목"
                    value={formData.title}
                    onChange={onChange}
                    required
                    className="input-style"
                />
                <input
                    name="category"
                    placeholder="카테고리"
                    value={formData.category}
                    onChange={onChange}
                    required
                    className="input-style"
                />
                <input
                    name="region"
                    placeholder="지역"
                    value={formData.region}
                    onChange={onChange}
                    required
                    className="input-style"
                />
                <input
                    name="address"
                    placeholder="주소"
                    value={formData.address}
                    onChange={onChange}
                    required
                    className="input-style"
                />
                <textarea
                    name="description"
                    placeholder="설명"
                    value={formData.description}
                    onChange={onChange}
                    required
                    rows={4}
                    className="input-style md:col-span-2"
                />
                <input
                    type="file"
                    name="images"
                    multiple
                    onChange={handleImageChange}
                    required
                    className="md:col-span-2"
                />
                {previewUrl.length > 0 && (
                    <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                        {previewUrl.map((url, idx) => (
                            <img
                                key={idx}
                                src={url}
                                alt={`미리보기-${idx}`}
                                className="w-full h-48 object-cover rounded-lg border border-gray-300"
                            />
                        ))}
                    </div>
                )}
                <button
                    type="submit"
                    className="md:col-span-2 mt-6 bg-blue-500 hover:bg-blue-600 transition text-white font-semibold py-3 rounded-lg"
                >
                    등록하기
                </button>
            </form>
        </div>

    )

}

export default NewPlaces;