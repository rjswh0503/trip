import React, { useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../shared/context/auth-context';
import Swal from 'sweetalert2';

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
                password: formData.password
            });
            setFormData({
                email: '',
                password: ''
            });
            const token = responseData.data.token;
            console.log(token);
            localStorage.setItem('token', token);
            setToken(token);
            setIsLoggedIn(true);
            await Swal.fire({
                title: '로그인 성공',
                icon: 'success',
                confirmButtonText: '확인',
                allowOutsideClick: false,
                text: '로그인 성공!!!',
                timer: 2000,
                timerProgressBar: true,
            });
            Navigate('/');
        } catch (e) {
            
            Swal.fire({
                title: '로그인 실패',
                icon: 'error',
                confirmButtonText: '확인',
                text: '이메일이 틀렸거나, 없는 이메일 입니다.',
                timer: 2000,
                timerProgressBar: true,
            });
            
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