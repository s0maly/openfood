import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Header = () => {
    return (
        <div className="header">
            <div className="container">
                <div className="logo">
                    <Link to="/">Pur Beurre</Link>
                </div>
                <div className="navbar">
                    <ul>
                        <li>
                            <Link to='/login'>Connexion</Link>
                        </li>
                        <li>
                            <Link to='/register'>Inscription</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Header;