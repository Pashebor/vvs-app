import React from 'react';
import Search from '../../search/Search.js';
import ReactTable from 'react-table';

class ReportsTable extends React.Component{
    constructor() {
        super();
        this.reports = [{
            id: 1,
            name: "Поставки отсюда",
            date: '12.07.2017'
        },{
            id: 2,
            name: "Поставки туда",
            date: '13.07.2017'
        },{
            id: 3,
            name: "Ежемесячный отчет",
            date: '14.07.2017'
        }, {
            id: 4,
            name: "Вычет торговых предложений",
            date: '15.07.2017'
        }, {
            id: 5,
            name: "Расчет поставок",
            date: '16.07.2017'
        }, {
            id: 6,
            name: "Перерасчет чего-то",
            date: '20.07.2017'
        }
        ];
    }
    render() {
        const columns = [{
            Header: '№ отчета',
            accessor: 'id'
        }, {
            Header: 'Название',
            accessor: 'name'
        }, {
            Header: 'Дата создания',
            accessor: 'date'
        }];
        return(
            <div className="reports-table">
                <h2 className="title">Загруженные отчеты</h2>
                <Search/>
                <ReactTable data={this.reports} columns={columns} showPagination={false} defaultPageSize={this.reports.length}/>
            </div>
        )
    }
}

export default ReportsTable;