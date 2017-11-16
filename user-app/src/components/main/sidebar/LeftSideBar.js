import React from 'react';
import { Link } from 'react-router-dom';
import {routeCodes} from '../../../utils/route.path';

const LeftSideBar = props => {
    return(
        <aside className="left-menu">
            <Link to={routeCodes.LIST1} className="left-menu__link">Лист 1</Link>
        </aside>
    )
}

export default LeftSideBar;