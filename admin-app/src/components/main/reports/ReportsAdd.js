import React from 'react';

class ReportsAdd extends React.Component{
    render() {
        return(
            <div className="reports-add">
                <h2 className="title">Добавить отчет</h2>
                <form className="reports-add-form">
                    <input className="input-field" type="text" placeholder="Название отчета" required/>
                    <h4>Загрузка таблиц</h4>
                    <input type="file" placeholder="Лист 1"/>
                    <input type="file" placeholder="Лист 2"/>
                    <input type="file" placeholder="Лист 3"/>
                    <input type="file" placeholder="Лист 4"/>
                    <input type="submit" className="btn btn-submit" value="Создать отчет"/>
                </form>
            </div>
        )
    }
}

export default ReportsAdd;