import React from 'react';
import { Link } from 'react-router-dom';
import {routeCodes, url} from '../../../utils/route.path';

const LeftSideBar = props => {
    return(
        <aside className="left-menu">
            <h2 className="title">Схемы Вэд</h2>
            <div className="left-menu__link left-menu__link--schema">
                <Link to={routeCodes.REPORTS} >Общая схема</Link>
            </div>
            <div className="left-menu__link left-menu__link--schema">
                <Link to={routeCodes.REPORTS} >Производители</Link>
            </div>
            <div className="left-menu__link left-menu__link--schema">
                <Link to={routeCodes.REPORTS} >Поставщики</Link>
            </div>
            <div className="left-menu__link left-menu__link--schema">
                <Link to={routeCodes.REPORTS} >Покупатели</Link>
            </div>
            <h2 className="title">Таблицы</h2>
            <div className={`left-menu__link ${url()[6] === 'one' ? 'left-menu__link--active' : null} left-menu__link--tables`}>
                <Link to={routeCodes.LISTS + '/one'} >Таблица 1</Link>
            </div>
            <div className={`left-menu__link ${url()[6] === 'two' ? 'left-menu__link--active' : null} left-menu__link--tables`}>
                <Link to={routeCodes.LISTS + '/two'} >Таблица 2</Link>
            </div>
            <div className={`left-menu__link ${url()[6] === 'three' ? 'left-menu__link--active' : null} left-menu__link--tables`}>
                <Link to={routeCodes.LISTS + '/three'} >Таблица 3</Link>
            </div>
            <div className={`left-menu__link ${url()[6] === 'four' ? 'left-menu__link--active' : null} left-menu__link--tables`}>
                <Link to={routeCodes.LISTS + '/four'} >Таблица 4</Link>
            </div>
            <div className={`left-menu__link ${url()[6] === 'five' ? 'left-menu__link--active' : null} left-menu__link--tables`}>
                <Link to={routeCodes.LISTS + '/five'} >Таблица 5</Link>
            </div>
        </aside>
    )
}

export default LeftSideBar;