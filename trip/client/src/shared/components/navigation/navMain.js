import React from "react";
import MainNavLink from '../navigation/navLink';


const NavMain = () => {

    return (
        <header>
            <h1><a style={{textDecoration:'none', color:'black'}} href="/">Trip</a></h1>
            <MainNavLink/>
        </header>
    )

}

export default NavMain;