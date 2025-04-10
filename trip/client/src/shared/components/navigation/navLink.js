import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/auth-context';
import LogoutButton from '../Form/logoutButton';
import './navLink.css';

const MainNavLink = () => {
  const { user, isLoggedIn } = useAuth();
  

  return (
    <div className="nav-links-container">
      {isLoggedIn && user ? (
        <>
          <LogoutButton />
          <NavLink className="nav-link" to="/posts/add">글쓰기</NavLink>
          <NavLink className="nav-link" to="/posts/list">게시글</NavLink>
          <NavLink className="nav-link" to={`/${user.userId}/mypage`}>{user.name}</NavLink>
          
        </>
      ) : (
        <>
          <NavLink className="nav-btn-outline" to="/login">로그인</NavLink>
          <NavLink className="nav-btn-primary" to="/register">회원가입</NavLink>
        </>
      )}
    </div>
  );
};

export default MainNavLink;
