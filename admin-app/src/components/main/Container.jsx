import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routeCodes from '../../utils/route.path.js';
import Reports from './reports/Reports.jsx';
import Users from './users/Users.jsx';


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
            </main>
        )
    }
}

export default Container;
