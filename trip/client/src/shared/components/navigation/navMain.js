import React from "react";

import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import LogoutButton from "../Form/logoutButton";

const NavMain = () => {
    const { user, isLoggedIn } = useAuth();

    return (
        <div className="">
            {isLoggedIn && user ? (
                <div>
                    <header className=" bg-white text-black mx-auto p-4 z-50 shadow-md">
                        <nav className="container mx-auto flex justify-between">
                            <div className="">
                                <NavLink to="/"><h2 className="text-3xl font-bold text-yellow-500 hover:text-yellow-600">Trip</h2></NavLink>
                            </div>
                            <ul className="flex space-x-4 items-center">
                                <li className="font-black text-yellow-500 hover:text-yellow-600"><LogoutButton /></li>
                                <li className="font-black text-yellow-500 hover:text-yellow-600"><NavLink to="/posts/list">게시글</NavLink></li>
                                <li className="font-black text-yellow-500 hover:text-yellow-600"><NavLink to="/places/list">여행지</NavLink></li>
                                {user?.role === 'admin' && (
                                    <div>
                                    <li className="font-black text-yellow-500 hover:text-yellow-600"><NavLink to='/places/add'>여행지등록</NavLink></li>
                                    <li className="font-black text-yellow-500 hover:text-yellow-600"><NavLink to='/'>관리자페이지</NavLink></li>
                                    </div>
                                )}
                                <li className="font-black text-yellow-500 hover:text-yellow-600"><NavLink to={`/${user.userId}/mypage`}><img src={user.image} className="w-12 h-12 p-1 rounded-full ring-2 ring-gray-300 hover:shadow-lg hover:ring-yellow-500" alt='프로필 이미지' /></NavLink></li>
                            </ul>
                        </nav>
                    </header>
                </div>
            ) : (
                <div>
                    <header className=" bg-white text-black mx-auto p-4 z-50 shadow-md">
                        <nav className="container mx-auto flex justify-between">
                            <div className="text-3xl font-bold text-yellow-500 hover:text-yellow-600">
                                <NavLink to="/"><h2>Trip</h2></NavLink>
                            </div>
                            <ul className="flex space-x-4 items-center">
                                <li className="font-black text-yellow-500 hover:text-yellow-600"><NavLink to="/login">로그인</NavLink></li>
                                <li className="font-black text-yellow-500 hover:text-yellow-600"><NavLink to="/register">회원가입</NavLink></li>
                            </ul>
                        </nav>
                    </header>
                </div>

            )}
        </div>
    );
}

export default NavMain;