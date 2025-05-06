import React, { useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, FileInput, Label, Card, TextInput, HelperText } from 'flowbite-react';
import Swal from 'sweetalert2';






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
            console.log(responseData.data.formData);
            Swal.fire({
                title: '회원가입 성공',
                icon: 'success',
                confirmButtonText: '확인',
                text: '회원가입 성공 !! 로그인 해주세요.',
                timer: 2000,
                timerProgressBar: true,
            });
            Navigate('/login')
        } catch (e) {
            console.log(e);
            Swal.fire({
                title: '회원가입 실패',
                icon: 'error',
                confirmButtonText: '확인',
                text: '회원가입 실패!! 다시 시도해주세요.',
                timer: 2000,
                timerProgressBar: true,
            });
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
        <div>
            <div className='flex items-center justify-center min-h-screen'>
                <Card className='mx-auto  shadow-lg'>
                    <form className='flex flex-col gap-4' onSubmit={registerSubmitHandler}>
                        <h2>회원가입</h2>
                        <div>
                            <div className='mb-2 block'>
                                <Label htmlFor='name'>닉네임</Label>
                            </div>
                            <TextInput name='name' type='text' onChange={handleChange} value={formData.name} placeholder='이름을 입력하세요.' required shadow />
                        </div>
                        <div>
                            <div className='mb-2 block'>
                                <Label htmlFor='email'>이메일</Label>
                            </div>
                            <TextInput name='email' type='email' onChange={handleChange} value={formData.email} placeholder='123@123.com' required shadow />
                        </div>
                        <div>
                            <div className='mb-2 block'>
                                <Label htmlFor='password'>비밀번호</Label>
                            </div>
                            <TextInput name='password' type='password' onChange={handleChange} value={formData.password} placeholder='비밀번호 입력하세요.' required shadow />
                        </div>
                        <div className='max-w-md'>
                            <Label className='mb-2 block' htmlFor='file'>
                                프로필 이미지 업로드
                            </Label>
                            <FileInput name='file' accept='image/*' onChange={handleImageChange} />
                            <HelperText className='mt-1'>프로필 사진을 등록해주세요.</HelperText>
                        </div>
                        {previewUrl && (
                            <div style={{ margin: '1rem 0' }}>
                                <img src={previewUrl} alt='미리보기' width="150" />
                            </div>
                        )}
                        <Button color="green" type='submit'>회원가입</Button>
                    </form>
                </Card>
            </div>
        </div>
    )
}


export default Register;