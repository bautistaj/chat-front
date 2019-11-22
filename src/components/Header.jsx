import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => (
    <nav className='container navbar navbar-expand-lg navbar-light bg-light'>
        <Link className='navbar-brand' to="/">Collecta</Link>
        <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav mr-auto'>
                <li className='nav-item active'>
                    <Link className='nav-link'  to="/">Room chat</Link>
                </li>
                <li className='nav-item active'>
                    <Link className='nav-link'  to="/register">Registrar</Link>
                </li>
            </ul>
        </div>
        </nav>
    );

export default Header;