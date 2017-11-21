import React from 'react';
import ReactTable from 'react-table';

const ListThree = props =>{
    const columns = [{
        Header: '№ п/п',
        accessor: 'id'
    }, {
        Header: 'Название региона',
        accessor: 'region'
    }, {
        Header: 'Общий объем поставок в ($)',
        accessor: 'supply_dol'
    }, {
        Header: 'Доля рынка, %',
        accessor: 'market_share'
    }, {
        Header: 'Объем поставки в кг',
        accessor: 'supply_kg'
    }, {
        Header: 'Объем поставки в м2',
        accessor: 'supply_m'
    }, {
        Header: 'Коли-чество поставок',
        accessor: 'count_supplies'
    }];
    return(
            <section className="list">
                <h2 className="title">Рейтинговая оценка регионов-поставщиков</h2>
                <ReactTable
                    data={props.listData}
                    columns={columns}
                    showPagination={true}
                    pageSize={15}
                    previousText={'Предыдущая'}
                    nextText={'Следующая'}
                    loadingText={'Загрузка...'}
                    noDataText={'Таблица пуста'}
                    pageText={'Страница'}
                    ofText={'из'}
                    rowsText={''}
                    showPageSizeOptions={false}
                />
            </section>
        )
}

export default ListThree;