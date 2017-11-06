import React from 'react';
import Search from '../../search/Search.js';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {filterSearch} from '../../../controllers/search-filter';
import {getReports} from '../../../actions/index'


class ReportsTable extends React.Component{
    componentDidMount() {
        this.props.getReports();
    }

    listReports() {
        return {
            reports: filterSearch(this.props.reports, this.props.filterState, 'reports'),
            length: filterSearch(this.props.reports, this.props.filterState, 'reports').length
        };
    }

    deleteRecordHandler(value) {
        console.log(value.original.id);
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
            accessor: 'dCreated'
        }, {
            Header: 'Удалить',
            accessor: 'id',
            Cell: (value) => (
                <button className="delete-btn" onClick={this.deleteRecordHandler.bind(this, value)}></button>
            ),
            width: 100
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
    return bindActionCreators({getReports}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportsTable);