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
        country: '',
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
        data.append('country', formData.country);
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
                country: '',
                city: '',
                region: '',
                address: '',
            });
            setImageFiles([]);
            setPreviewUrl([]);
            alert('장소 등록 완료');
            navigate('/places/list')
            console.log(response.data);
        } catch (e) {
            alert(e.response?.data?.message || '장소 등록 실패');
        }
    }

    return (
        <div className="container max-w-screen-2xl mx-auto p-4 ">
            <h2 className="text-2xl font-black mt-[150px]">여행지 등록</h2>
            <form className="grid gap-6 mb-6 md:grid-cols-2 mt-10 border border-gray-300 rounded-lg p-4" onSubmit={handleSubmit}>

                <input name="title" placeholder="제목" value={formData.title} onChange={onChange} required />
                <textarea name="description" placeholder="설명" value={formData.description} onChange={onChange} required />
                <input name="category" placeholder="카테고리" value={formData.category} onChange={onChange} required />
                <input name="country" placeholder="국가" value={formData.country} onChange={onChange} required />
                <input name="city" placeholder="도시" value={formData.city} onChange={onChange} required />
                <input name="region" placeholder="지역" value={formData.region} onChange={onChange} required />
                <input name="address" placeholder="주소" value={formData.address} onChange={onChange} required />
                <input type="file" name="images"  multiple onChange={handleImageChange} required />
                {previewUrl.length > 0 && (
                    <div className="">
                        {previewUrl.map((url, idx) => (
                            <img key={idx} src={url} alt={`미리보기-${idx}`} className="image-preview" />

                        ))}
                    </div>
                )}
                <button className="mt-10 w-full bg-yellow-500 text-white px-4 py-2 rounded-lg " type="submit">등록하기</button>
            </form>


        </div>
    )

}

export default NewPlaces;