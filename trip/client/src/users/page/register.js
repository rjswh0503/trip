import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';







const Register = () => {

    const Navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPrviewUrl] = useState('');


    const registerSubmitHandler = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('password', formData.password);
        data.append('image', imageFile);
        try {
            const responseData = await axios.post('http://localhost:5000/api/users/register',
                data,
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

            setFormData({
                name: '',
                email: '',
                password: ''
            });

            
            setImageFile(null);
            setPrviewUrl('');
            console.log('회원가입 성공!!' + responseData.data.formData);
            alert('회원가입 성공!');
            Navigate('/login')
        } catch (e) {

        }
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        if (file) {
            setPrviewUrl(URL.createObjectURL(file));
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };



    return (
        <>
            <h2>Register</h2>
            <form onSubmit={registerSubmitHandler}>
                <input type='text' name='name' placeholder='사용자 닉네임' onChange={handleChange} value={formData.name} required />
                <input type='email' name='email' placeholder='사용자 이메일' onChange={handleChange} value={formData.email} required />
                <input type='password' name='password' placeholder='사용자 비밀번호' onChange={handleChange} value={formData.password} required />
                <input type='file' accept='image/*' onChange={handleImageChange}></input>
                {previewUrl && (
                    <div style={{ margin: '1rem 0' }}>
                        <img src={previewUrl} alt='미리보기' width="150"/>
                    </div>
                )}
                <button type='submit'>회원가입</button>
            </form>
        </>
    )
}


export default Register;