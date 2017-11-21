import React from 'react';
import ReactTable from 'react-table';

const ListFive = props =>{
    const columns = [{
        Header: '№ п/п',
        accessor: 'id'
    }, {
        Header: 'Наименование предприятия - отправителя',
        accessor: 's_firm_name'
    }, {
        Header: 'Почтовый адрес предприятия - отправителя',
        accessor: 's_firm_address'
    }, {
        Header: 'Наименование получателя',
        accessor: 'r_firm_name'
    }, {
        Header: 'Почтовый адрес предприятия - получателя',
        accessor: 'r_firm_address'
    }, {
        Header: 'Производитель',
        accessor: 'manufacturer'
    }, {
        Header: 'Страна назначения',
        accessor: 'r_country'
    }, {
        Header: 'Страна происхождения',
        accessor: 's_country'
    }, {
        Header: 'Код ТН ВЭД',
        accessor: 'code_tn_ved'
    }, {
        Header: 'Описание и характеристики товара',
        accessor: 'description'
    }, {
        Header: 'Усл. поставки',
        accessor: 't_shipment'
    }, {
        Header: 'Объем поставки в м2',
        accessor: 'shipment_vol_m2'
    }, {
        Header: 'Валюта контракта',
        accessor: 'c_currency'
    }, {
        Header: 'Стоимость поставки в валюте контракта',
        accessor: 'shipment_cost'
    }, {
        Header: 'Цена поставки в $',
        accessor: 'cost_price_dol'
    }, {
        Header: 'Дата отгрузки',
        accessor: 'shipment_date'
    }];
    return(
        <section className="list">
            <h2 className="title">Анализ предпочтений покупателей</h2>
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

export default ListFive;