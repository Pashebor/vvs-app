import React from 'react';
import Search from '../../search/Search.js';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {filterSearch} from '../../../controllers/search-filter';
import {getUsers, deleteUser, showPopupForms} from '../../../actions/index';
import PopupForms from './popup-forms/PopupForms';

class UsersTable extends React.Component{
    componentDidMount() {
        this.props.getUsers();
    }
    listUsers() {
        return {
          users: filterSearch(this.props.users, this.props.filterState, 'users'),
          length: filterSearch(this.props.users, this.props.filterState, 'users').length
        };
    }

    deleteRecordHandler(value) {
        let formData = {
            ID: value.original.ID,
            NAME: value.original.NAME,
            EMAIL: value.original.EMAIL,
            PASSWORD_MD5: value.original['PASSWORD_MD5'],
            PASSWORD: value.original.PASSWORD
        };
        this.props.deleteUser(JSON.stringify(formData));
    }
    
    addRecordHandler(value) {
        const popupFormData = {
          type: 'add',
          state: true,
          data: value.original
        };
        this.props.showPopupForms(popupFormData);
    }

    editRecordHandler(value) {
        const popupFormData = {
            type: 'edit',
            state: true,
            data: value.original
        };
        this.props.showPopupForms(popupFormData);
    }

    render() {
        const columns = [{
            Header: 'ID пользователя',
            accessor: 'ID',
        }, {
            Header: 'Имя пользователя',
            accessor: 'NAME'
        }, {
            Header: 'E-mail',
            accessor: 'EMAIL'
        }, {
            Header: 'Пароль',
            accessor: 'PASSWORD'
        }, {
            Header: 'Отчет',
            accessor: 'REPORT_ID',
            Cell: (value) => {
                if (value.original.REPORT_ID) {
                    return (<button className="watch-btn" title="Редактировать отчет" onClick={this.editRecordHandler.bind(this, value)}></button>);
                } else {
                    return (<button className="add-btn" title="Добавить отчет" onClick={this.addRecordHandler.bind(this, value)}></button>);
                }

            },
            width: 90
        }, {
            Header: 'Удалить',
            accessor: 'id',
            Cell: (value) => (
                <button className="delete-btn" onClick={this.deleteRecordHandler.bind(this, value)}></button>
            ),
            width: 90
        }];
        return (
            <div className="users-table">
                <h2 className="title">Пользователи</h2>
                <Search/>
                {this.props.popupFormsIsShown ? <PopupForms/> : null}
                <ReactTable data={this.listUsers().users}
                            columns={columns}
                            showPagination={false}
                            pageSize={this.listUsers().length}/>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        popupFormsIsShown: store.popupFormsReducer.popupFormState,
        filterState: store.filterState,
        users: store.tablesReducer.users,
        modalIsShown: store.tablesReducer.isShowModal
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({getUsers, deleteUser, showPopupForms}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable);