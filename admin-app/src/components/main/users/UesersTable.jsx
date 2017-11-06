import React from 'react';
import Search from '../../search/Search.js';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {filterSearch} from '../../../controllers/search-filter';
import {getUsers, deleteUser} from '../../../actions/index';

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
            Header: 'Удалить',
            accessor: 'id',
            Cell: (value) => (
                <button className="delete-btn" onClick={this.deleteRecordHandler.bind(this, value)}></button>
            ),
            width: 100
        }];
        return (
            <div className="users-table">
                <h2 className="title">Пользователи</h2>
                <Search/>
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
        filterState: store.filterState,
        users: store.tablesReducer.users,
        modalIsShown: store.tablesReducer.isShowModal
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({getUsers, deleteUser}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable);