import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/auth-context';
import LogoutButton from '../Form/logoutButton';


const MainNavLink = () => {

    const { user, isLoggedIn } = useAuth();


    return (
        <div style={{ marginBottom: '100px' }}>
            {isLoggedIn && user ? (
                <>
                    <p><span style={{ color: 'red' }}>{user.name}</span></p>
                    <LogoutButton />
                    <NavLink style={{marginRight:'30px', marginLeft:'30px'}} to="/posts/add">게시글작성</NavLink>
                    <NavLink to="/posts/list">전체게시글</NavLink>
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