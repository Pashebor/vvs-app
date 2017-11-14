import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {routeCodes} from '../../utils/route.path.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Preloader from '../preloader/Preloader';


class Container extends React.Component {
    render() {
        return(
            <main>
            <BrowserRouter>
                <Switch>
                    <Route exact path={routeCodes.REPORTS} component={Reports}/>
                    <Route path={routeCodes.USERS} component={Users}/>
                </Switch>
            </BrowserRouter>
                {this.props.isPreloader ? <Preloader/> : null}
            </main>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        isPreloader: store.tablesReducer.isPreloader
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
