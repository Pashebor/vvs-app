import React from 'react';
import { Link } from 'react-router-dom';
import routeCodes from '../../utils/route.path.js';

const NavigationBar = () =>{
        return(
            <nav className="navigation-bar">
                <Link to={routeCodes.REPORTS} className={window.location.pathname === '/vvs-app/' ? 'navigation-bar__item navigation-bar__item--active' : 'navigation-bar__item'}>Отчеты</Link>
                <Link to={routeCodes.USERS} className={window.location.pathname === '/vvs-app/users' ? 'navigation-bar__item navigation-bar__item--active' : 'navigation-bar__item'}>Пользователи</Link>
            </nav>
        );
};

export default NavigationBar;