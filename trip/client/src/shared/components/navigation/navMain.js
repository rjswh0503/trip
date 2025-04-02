import React from "react";
import MainNavLink from '../navigation/navLink';
import { Link } from "react-router-dom";

import './navMain.css';

const NavMain = () => {

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">Trip</Link>
            </div>
                <MainNavLink />
        </nav>
    )

}

export default NavMain;