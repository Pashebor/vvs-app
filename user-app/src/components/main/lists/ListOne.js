import React from 'react';
import ReactTable from 'react-table';

const ListOne = (props) =>{
        const columns = [{
                Header: '№ п/п',
                accessor: 'id'
        }, {
                Header: 'Наименование фирмы получателя',
                accessor: 'firm_name'
        }, {
                Header: 'Адрес получателя',
                accessor: 'recipient_address'
        }, {
                Header: 'Страна получателя',
                accessor: 'recipient_country'
        }, {
                Header: 'Общий объем закупок в ($)',
                accessor: 'over_vol_purchases'
        }, {
                Header: 'Доля рынка, %',
                accessor: 'market_share'
        }, {
                Header: 'Объем закупки в м2',
                accessor: 'vol_purchases_m'
        }, {
                Header: 'Объем закупки в кг',
                accessor: 'vol_purchases_kg'
        }];
        return(
            <section className="list">
                <h2 className="title">Рейтинговая оценка зарубежных потребителей</h2>
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

export default ListOne;