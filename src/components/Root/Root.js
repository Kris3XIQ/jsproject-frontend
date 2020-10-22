import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Home from "./Home";
// import Report from "./Report";
// import Chat from "./Chat";
import Nav from "./Nav";
import Register from "./Account/Register";
import Login from "./Account/Login";

import '../../style/main.css';

const Root = () => {
    return (
        <Router>
            <div className="App">
                <Nav />
                <Switch>
                    <Route component={Home} exact path="/" />
                    <Route component={Login} exact path="/account" />
                    <Route component={Login} exact path="/account/login" />
                    <Route component={Register} exact path="/account/register" />
                    {/* <Route component={Report} exact path="/reports" />
                    <Route component={Report} exact path="/reports/week" />
                    <Route component={Report} exact path="/reports/week/:reportNr" />
                    <Route component={Chat} exact path="/chat" /> */}
                </Switch>
            </div>
        </Router>
    )
};

export default Root;
