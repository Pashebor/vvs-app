import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {addUser} from '../../../actions/index';
import Modal from '../../modal-window/Modal.jsx';

class UsersAdd extends React.Component{

    userAddFormHandler(event) {
        event.preventDefault();
        let userData = {
            NAME: this.refs['name'].value,
            EMAIL: this.refs['email'].value
        };
        this.props.addUser(JSON.stringify(userData));
    }
    
    closeModalHandler() {
        console.log(this.props.modalIsShown);
    }

    render() {
        return(
            <div className="users-add">
                {this.props.modalIsShown ? <Modal title="Добавление пользователя" message="Пользователь успешно добавлен"/> : null}
                <h2 className="title" onClick={this.closeModalHandler.bind(this)}>Добавить нового пользователя</h2>
                <form className="users-add-form" onSubmit={this.userAddFormHandler.bind(this)}>
                    <input className="input-field" type="text" ref="name" placeholder="ФИО" required/>
                    <input className="input-field" type="email" ref="email" placeholder="E-mail" required/>
                    <input type="submit" className="btn btn-submit" value="Добавить пользователя"/>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        modalIsShown: store.tablesReducer.isShowModal
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({addUser}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersAdd);