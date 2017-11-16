import React, {Component} from 'react';
import Header from '../header/Header.jsx';
import { Link } from 'react-router-dom';
import {routeCodes} from '../../utils/route.path';

class Main extends Component{
    render() {
        return (
            <section className="main-page">
                <Header/>
                <div className="main-container">
                    <h2 className="title">Доступные отчеты</h2>
                    <Link to={routeCodes.REPORTS} className="main-page__link">Название отчета</Link>
                </div>
            </section>
        )

    }
}

export default Main;