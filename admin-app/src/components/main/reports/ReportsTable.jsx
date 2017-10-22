import React from 'react';
import Search from '../../search/Search.js';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {filterSearch} from '../../../controllers/search-filter';


class ReportsTable extends React.Component{

    listReports() {
        return {
            reports: filterSearch(this.props.reports, this.props.filterState, 'reports'),
            length: filterSearch(this.props.reports, this.props.filterState, 'reports').length
        };
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
                <Search type="reports"/>
                <ReactTable data={this.listReports().reports} columns={columns} showPagination={false} pageSize={this.listReports().length}/>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        filterState: store.filterState,
        reports: store.tablesReducer.reports
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportsTable);