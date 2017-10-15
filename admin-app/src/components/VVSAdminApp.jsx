import React from 'react';
import Header from './header/Header.jsx';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Container from './main/Container.jsx';

class VVSAdminApp extends React.Component{

    render() {
        return(
            <section className="admin-app">
                <Container/>
            </section>
        )
    }
}

export default VVSAdminApp;