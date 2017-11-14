import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getCurrentUser, logoutUser} from '../../actions/index';
import {routeCodes} from '../../utils/route.path.js';

class NavigationBar extends React.Component{
    componentDidMount() {
        if(!this.props.userData) {
            this.props.getCurrentUser();
        }
    }

    logoutHandler() {
        let formData = new FormData();
        formData.append('logout', 'yes');
        this.props.logoutUser(formData);
    }

    render() {
        const userClass = () => {
            if (this.props.userData) {
                switch (this.props.userData.type) {
                    case 'administrator':
                        return 'user__icon user__icon--admin';
                        break;
                    case 'subscriber':
                        return 'user__icon user__icon--customer';
                        break;
                }
            }
        };
        const userName = () => {
            if (this.props.userData) {
                return this.props.userData.name;
            }
        };
        return (
            <nav className="navigation-bar">
                <Link to={routeCodes.REPORTS}
                      className={window.location.pathname === '/vvs-app/' ? 'navigation-bar__item navigation-bar__item--active' : 'navigation-bar__item'}>Отчеты</Link>
                <Link to={routeCodes.USERS}
                      className={window.location.pathname === '/vvs-app/users' ? 'navigation-bar__item navigation-bar__item--active' : 'navigation-bar__item'}>Пользователи</Link>
                <div className="user">
                    <div className={userClass()}></div>
                    <p className="user__name">{userName()}</p>
                    <p className="user__exit" title="Выйти из учетной записи" onClick={this.logoutHandler.bind(this)}>выход</p>
                </div>
            </nav>
        )
    }
};

const mapStateToProps = (store) => {
    return {
        userData: store.headerReducer.userData
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({getCurrentUser, logoutUser}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);