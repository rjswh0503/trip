import React from 'react';
import { useNavigate } from 'react-router-dom';

import { NavLink } from 'react-router-dom';



const MainNavLink = () => {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('token');


    const logoutHandler = () => {
        localStorage.removeItem('token');
        
        alert("성공적으로 로그아웃 했습니다.");
        navigate('/');
    }

    return (
        <div>
            {isLoggedIn ? (
                <>
                <button onClick={logoutHandler}>로그아웃</button>
                </>
            ) : (
            <ul>
                <li>
                    <NavLink to="/login">로그인</NavLink>
                </li>
                <li>
                    <NavLink to="/register">회원가입</NavLink>
                </li>
            </ul>
            )}
        </div>
    )
}


export default MainNavLink;