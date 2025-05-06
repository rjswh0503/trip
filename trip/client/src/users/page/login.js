import React, { useState } from 'react';
import axios from 'axios';

import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../shared/context/auth-context';
import Swal from 'sweetalert2';

import { Card, Button, Label, TextInput } from 'flowbite-react';



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
        <div>
            <div className='flex items-center justify-center min-h-screen'>
                <Card className=' mx-auto shadow-lg'>
                    <form className='flex flex-col gap-4' onSubmit={loginHandler}>
                        <h2>로그인</h2>
                        <div>
                            <div className='mb-2 block'>
                                <Label htmlFor='email'>이메일</Label>
                            </div>
                            <TextInput name='email' type='email' placeholder='이메일을 입력하세요.' onChange={onChange} required shadow />
                        </div>
                        <div>
                            <div className='mb-2 block'>
                                <Label htmlFor='password'>비밀번호</Label>
                            </div>
                            <TextInput name='password' type='password' placeholder='비밀번호를 입력하세요.' onChange={onChange} required shadow />
                        </div>
                        <Button color="green" type='submit'>로그인</Button>
                        <div className='flex items-center gap-2'>
                            <Label>
                                계정이 없으신가요?
                            </Label>
                            <Link to="/register"><p className='text-sm text-blue-600 font-bold'>회원가입</p></Link>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    )
}


export default Login;