import React from 'react';
import Header from '../../header/Header.jsx';
import UsersTable from './UesersTable.js';
import UsersAdd from './UsersAdd.js';

class Users extends React.Component{
    render() {
        return(
            <div>
                <Header/>
                <section className="users">
                    <UsersTable/>
                    <UsersAdd/>
                </section>
            </div>
        )
    }
}

export default Users;