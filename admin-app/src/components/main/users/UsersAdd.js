import React from 'react';

class UsersAdd extends React.Component{
    render() {
        return(
            <div className="users-add">
                <h2 className="title">Добавить нового пользователя</h2>
                <form className="users-add-form">
                    <input className="input-field" type="text" placeholder="ФИО" required/>
                    <input className="input-field" type="email" placeholder="E-mail" required/>
                    <input type="submit" className="btn btn-submit" value="Добавить пользователя"/>
                </form>
            </div>
        )
    }
}

export default UsersAdd;