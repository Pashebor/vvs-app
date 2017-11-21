import React from 'react';
import ReactTable from 'react-table';

const ListTwo = props =>{
    const columns = [{
        Header: '№ п/п',
        accessor: 'id'
    }, {
        Header: 'Производитель',
        accessor: 'procreator'
    }, {
        Header: 'Страна происхождения',
        accessor: 'country'
    }, {
        Header: 'Объем экспорта, $',
        accessor: 'over_vol_purchases'
    }, {
        Header: 'Общий объем закупок в ($)',
        accessor: 'over_vol_purchases'
    }, {
        Header: 'Доля рынка, %',
        accessor: 'market_share'
    }, {
        Header: 'Объем продаж в кг',
        accessor: 'vol_sales_kg'
    }, {
        Header: 'Объем продаж в м2',
        accessor: 'vol_sales_m'
    }, {
        Header: 'Количество продаж',
        accessor: 'count_sales'
    }];
        return(
            <section className="list">
                <h2 className="title">Рейтинговая оценка производителей</h2>
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

export default ListTwo;