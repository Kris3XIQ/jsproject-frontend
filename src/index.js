import React from 'react';
import ReactDOM from 'react-dom';
// import { render } from "react-dom";
// import { BrowserRouter } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import './index.css';
import * as serviceWorker from './serviceWorker';

import Root from "./components/Root";

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('app')
);

serviceWorker.unregister();
