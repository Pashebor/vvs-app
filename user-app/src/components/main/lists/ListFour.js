import React from 'react';
import ReactTable from 'react-table';

const ListFour = props =>{
    const columns = [{
        Header: '№ п/п',
        accessor: 'id'
    }, {
        Header: 'Номер ВЭД',
        accessor: 'company_d'
    }, {
        Header: 'Название российского предприятия',
        accessor: 'firm_name'
    }, {
        Header: 'Адрес предприятия отправителя груза',
        accessor: 'firm_address'
    }, {
        Header: 'Телефон предприятия на момент регистрации',
        accessor: 'firm_phone'
    }, {
        Header: 'Наличие посредника-контрактодержателя',
        accessor: 'c_owner'
    }, {
        Header: 'Адрес посредника-контрактодержателя',
        accessor: 'address_c_owner'
    }, {
        Header: 'Общий объем продаж в $',
        accessor: 'overall_sales_dol'
    }, {
        Header: 'Доля рынка, %',
        accessor: 'market_share'
    }, {
        Header: 'Объем продаж в м2',
        accessor: 'vol_sales_m'
    }, {
        Header: 'Кол-во продаж',
        accessor: 'count_sales'
    }];
    return(
        <section className="list">
            <h2 className="title">Рейтинговая оценка экспортеров</h2>
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

export default ListFour;