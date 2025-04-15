import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/auth-context';
import LogoutButton from '../Form/logoutButton';
import './navLink.css';

const MainNavLink = () => {
  const { user, isLoggedIn } = useAuth();

  console.log(user);

  return (
    <div className="nav-links-container">
      {isLoggedIn && user ? (
        <>
          <LogoutButton />
          <NavLink className="nav-link" to="/posts/list">게시글</NavLink>
          <NavLink className="nav-link" to="/places/list">여행지</NavLink>
          {user?.role === 'admin' &&(
              <NavLink className="nav-link" to='/places/add'>여행지등록</NavLink>
          )}
          <NavLink className="nav-link" to={`/${user.userId}/mypage`}>
          <img style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #e0e0e0'}} src={user.image} alt='프로필 이미지'/>
          </NavLink>
          
          
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
