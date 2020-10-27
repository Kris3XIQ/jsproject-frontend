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
import Graph from "./Graph";
import Register from "./Account/Register";
import Login from "./Account/Login";
import Account from "./Account/Account";
import Funds from "./Account/Funds";
import Games from "./Games";
import Sell from "./Account/Sell";

import '../../style/main.css';

const Root = () => {
    return (
        <Router>
            <div className="App">
                <Nav />
                <Switch>
                    <Route component={Home} exact path="/" />
                    <Route component={Account} exact path="/account" />
                    <Route component={Login} exact path="/account/login" />
                    <Route component={Register} exact path="/account/register" />
                    <Route component={Funds} exact path="/account/funds" />
                    <Route component={Sell} exact path="/account/:game/sell" />
                    <Route component={Graph} path = "/games/:game/graph" />
                    <Route component={Games} exact path ="/games" />
                    {/* <Route component={Graph} exact path="/graph" />
                    <Route component={Graph} exact path="/games/graph" /> */}
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
