import React from 'react';
import Header from '../../header/Header.jsx';
import ReportsAdd from './ReportsAdd';
import ReportsTable from './ReportsTable.jsx';


class Reports extends React.Component{
    render() {
        return(
            <div>
                <Header/>
                <section className="reports">
                   <ReportsTable/>
                   <ReportsAdd/>
                </section>
            </div>
        )
    }
}

export default Reports;