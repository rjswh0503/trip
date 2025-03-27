import React, { useState, useEffect } from 'react';
import axios from 'axios';






const Register = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });


    const registerSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const responseData = await axios.post('http://localhost:5000/api/users/register',
                {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                });

                setFormData({
                    name: '',
                    email: '',
                    password: ''
                });

                console.log('회원가입 성공!!' + responseData);
                alert('회원가입 성공!');

        } catch (e) {

        }
    }

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
            <input type='text' name='name' placeholder='사용자 이름' onChange={handleChange} value={formData.name} required />
            <input type='email' name='email' placeholder='사용자 이메일' onChange={handleChange} value={formData.email} required />
            <input type='password' name='password' placeholder='사용자 비밀번호' onChange={handleChange} value={formData.password} required />
            <button type='submit'>회원가입</button>
        </form>
        

        </>
    )
}


export default Register;