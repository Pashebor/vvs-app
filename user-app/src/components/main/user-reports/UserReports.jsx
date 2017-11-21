import React, {Component} from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import {routeCodes} from '../../../utils/route.path';
import Header from '../../header/Header.jsx';
import Lists from '../lists/Lists.jsx';
import VedSchema from '../ved-shema/VedSchema';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class UserReports extends Component{
    componentDidMount() {
        if(!this.props.reportName) {
            this.props.history.push(routeCodes.MAIN);
        }
    }
    render() {
        return(
            <section className="user-reports">
                <Header/>
                <h2 className="title">{this.props.reportName ? this.props.reportName.name : null}</h2>
                <BrowserRouter>
                    <Switch>
                        <Route exact path={routeCodes.REPORTS} component={VedSchema}/>
                        <Route path={routeCodes.LISTS + '/:list'} component={Lists}/>
                    </Switch>
                </BrowserRouter>
            </section>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        reportName: store.mainStore.userReport
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UserReports);