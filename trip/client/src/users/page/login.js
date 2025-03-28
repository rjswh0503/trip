import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';





const Login = () => {

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
                localStorage.setItem('token', responseData.data.token);
    
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
        <div>
            <form onSubmit={loginHandler}>
                <input type='email' name="email" placeholder='이메일을 입력하세요.' onChange={onChange} />
                <input type='password' name='password' placeholder='비밀번호를 입력하세요.' onChange={onChange} />
                <button type='submit'>로그인</button>
            </form>

        </div>
    )
}


export default Login;