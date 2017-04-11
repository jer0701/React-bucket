import React from 'react';
import ReactDom from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';

import HomePage from './pages/Home'
import UserAddPage from './pages/UserAdd';

ReactDom.render((
    <Router history={hashHistory}>
        <Route path="/" component={HomePage} />
        <Route path="/user/add" component={UserAddPage} />
    </Router>
    ), document.getElementById("app"));