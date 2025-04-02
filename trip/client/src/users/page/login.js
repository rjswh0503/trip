import React, { useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../shared/context/auth-context';

import './login.css';




const Login = () => {

    const { setToken, setIsLoggedIn } = useAuth();
    const Navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });


    const loginHandler = async (e) => {
        e.preventDefault();

        try {
            const responseData = await axios.post('http://localhost:5000/api/users/login', {

                email: formData.email,
                password: formData.password,
                name: formData.name
            });
            setFormData({
                email: '',
                password: ''
            });
            const token = responseData.data.token;
            localStorage.setItem('token', token);
            setToken(token);
            setIsLoggedIn(true);
            alert(`로그인 성공!!`)
            Navigate('/');
        } catch (e) {
            console.log('로그인 실패했습니다.')
            alert('이메일이 틀렸거나, 없는 이메일 입니다. 회원가입 부터 진행해주세요.');
        }
    }



    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    return (
        <div className='login-container'>
            
            
            <form className='login-box' onSubmit={loginHandler}>
            <h2>로그인</h2>
                <input type='email' name="email" placeholder='이메일을 입력하세요.' onChange={onChange} />
                <input type='password' name='password' placeholder='비밀번호를 입력하세요.' onChange={onChange} />
                <button type='submit'>로그인</button>
                <p className='login-footer'>계정이 없으신가요? <a href='/register'>회원가입</a> </p>
            </form>

        </div>
    )
}


export default Login;