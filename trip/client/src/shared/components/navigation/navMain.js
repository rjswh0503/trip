import React from "react";

import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

import { Avatar, Dropdown, DropdownDivider, DropdownHeader, DropdownItem } from 'flowbite-react';
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
                            {user?.role === 'admin' ? (
                                <Dropdown
                                    label={<Avatar alt="유저프로필" img={user.image} rounded bordered />}
                                    arrowIcon={false}
                                    inline
                                >
                                    <DropdownHeader>
                                        <span className='block text-sm'>{user.name}</span>
                                        <span className='block truncate text-sm font-medium'>{user.email}</span>
                                    </DropdownHeader>
                                    <Link to={"/admin"}><DropdownItem>관리자페이지</DropdownItem></Link>
                                    <Link to={`/${user.userId}/mypage`}><DropdownItem>내정보</DropdownItem></Link>
                                    
                                    <DropdownDivider />
                                    <DropdownItem><LogoutButton /></DropdownItem>
                                </Dropdown>
                            ) : (
                                <Dropdown
                                label={<Avatar alt='유저프로필' img={user.image} rounded bordered />}
                                arrowIcon={false}
                                inline


                            >
                                <DropdownHeader>
                                    <span className='block text-sm'>{user.name}</span>
                                    <span className='block truncate text-sm font-medium'>{user.email}</span>
                                </DropdownHeader>
                                <Link to={"/"}><DropdownItem>Home</DropdownItem></Link>
                                <Link to={`/${user.userId}/mypage`}><DropdownItem>내정보</DropdownItem></Link>
                                <Link to={'/posts/add'}><DropdownItem>게시글작성</DropdownItem></Link>
                                <DropdownDivider />
                                <DropdownItem><LogoutButton /></DropdownItem>
                            </Dropdown>
                            )}
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
                            </ul>
                        </nav>
                    </header>
                </div>

            )}
        </div>
    );
}

export default NavMain;