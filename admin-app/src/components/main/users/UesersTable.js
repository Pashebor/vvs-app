import React from 'react';
import Search from '../../search/Search.js';
import ReactTable from 'react-table';

class UsersTable extends React.Component{
    constructor() {
        super();
        this.users = [{
            id: 1,
            email: "pashebor@gmail.com",
            password: '12ewfew12341'
        },{
            id: 2,
            email: "example@gmail.com",
            password: 'teest_test'
        },{
            id: 3,
            email: "jango@gmail.com",
            password: '12345678'
        }, {
            id: 4,
            email: "jango@gmail.com",
            password: '12345678'
        }, {
            id: 5,
            email: "jango@gmail.com",
            password: '12345678'
        }, {
            id: 6,
            email: "jango@gmail.com",
            password: '12345678'
        }
        ];
    }


    render() {

        const columns = [{
            Header: 'ID пользователя',
            accessor: 'id'
        }, {
            Header: 'E-mail',
            accessor: 'email'
        }, {
            Header: 'Пароль',
            accessor: 'password'
        }];
        return (
            <div className="users-table">
                <h2 className="title">Пользователи</h2>
                <Search/>
                <ReactTable data={this.users} columns={columns} showPagination={false} defaultPageSize={this.users.length}/>
            </div>
        )
    }
}

export default UsersTable;