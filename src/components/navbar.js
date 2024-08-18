import React from "react";
import '../App.css';
import { Link } from "react-router-dom";

const Navbar = () => {


    return (
        <>
            <div className='header'>
                <h1 className='header-text'><Link to={'/'} className='header-links'>Firebase</Link></h1>
                
                <ul className="header-ul">
                    <li className="header-li"><Link to={'/'} className="header-link">Login with fb and google</Link></li>
                    <li className="header-li"><Link to={'/signup'} className="header-link">Signup</Link></li>
                    <li className="header-li"><Link to={'/login'} className="header-link">Login</Link></li>
                    <li className="header-li"><Link to={'/number'} className="header-link">Phone number</Link></li>
                </ul>
            </div>
        </>
    )
}

export default Navbar;