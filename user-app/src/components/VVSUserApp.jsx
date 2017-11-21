import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Container from './main/Container.jsx';

class VVSUserApp extends React.Component{

    render() {
        return(
            <section className="admin-app">
                <Container/>
            </section>
        )
    }
}

export default VVSUserApp;