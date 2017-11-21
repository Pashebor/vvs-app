import React, {Component} from 'react';
import Header from '../header/Header.jsx';
import { Link } from 'react-router-dom';
import {routeCodes} from '../../utils/route.path';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getUserReports} from '../../actions/index';

class Main extends Component{
    componentDidMount() {
        if(!this.props.userReports) {
            this.props.getUserReports();
        }
    }
    linkClickHandeler(data) {
        /*console.log(data);*/
    }
    showReportsLinks() {
        if (this.props.userReports) {
            return (<Link to={routeCodes.REPORTS} className="main-page__link" onClick={this.linkClickHandeler.bind(this, this.props.userReports)}>{this.props.userReports.name}</Link>);
        }
    }
    render() {
        return (
            <section className="main-page">
                <Header/>
                <div className="main-container">
                    <h2 className="title">Доступные отчеты</h2>
                    {this.showReportsLinks()}
                </div>
            </section>
        )

    }
}

const mapStateToProps = (store) => {
    return {
        userReports: store.mainStore.userReport
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({getUserReports}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);