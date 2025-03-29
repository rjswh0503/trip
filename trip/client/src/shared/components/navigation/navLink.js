import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/auth-context';



const MainNavLink = () => {
    
    const { setToken, user, isLoggedIn, setIsLoggedIn } = useAuth();
    const navigate = useNavigate();
    


    const logoutHandler = () => {
        localStorage.removeItem('token');
        setToken(null);
        setIsLoggedIn(false);
        alert("성공적으로 로그아웃 했습니다.");
        navigate('/login');
    }

    return (
        <div style={{marginBottom:'100px'}}>
            {isLoggedIn && user ? (
                <>
                <p>안녕하세요.<span>{user.name}</span>님 반갑습니다.</p>
                <button onClick={logoutHandler}>로그아웃</button>
                </>
            ) : (
            <ul>
                <p></p>
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