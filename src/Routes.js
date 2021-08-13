import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Controller from './pages/Controller';
import Class from './pages/Class';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/controle/:room_id' component={Controller} />
                <Route exact path='/aula/:room_id' component={Class} />
            </Switch>
        </Router>
    );
}

export default Routes;