import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import {routeCodes} from '../../utils/route.path.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Preloader from '../preloader/Preloader';
import Main from './Main.jsx';
import UserReports from './user-reports/UserReports.jsx'


class Container extends React.Component {
    render() {
        return(
            <main>
            <BrowserRouter>
                <Switch>
                    <Route exact path={routeCodes.MAIN} component={Main}/>
                    <Route path={routeCodes.REPORTS} component={UserReports}/>
                </Switch>
            </BrowserRouter>
                {this.props.isPreloader ? <Preloader/> : null}
            </main>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        isPreloader: store.mainStore.isPreloader
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
