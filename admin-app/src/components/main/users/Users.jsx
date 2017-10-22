import React from 'react';
import Header from '../../header/Header.jsx';
import UsersTable from './UesersTable.jsx';
import UsersAdd from './UsersAdd.jsx';

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