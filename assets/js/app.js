// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
// import "../css/app.scss"

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import deps with the dep name or local files with a relative path, for example:
//
//     import {Socket} from "phoenix"
//     import socket from "./socket"
//
import "phoenix_html"

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import store from './store/index';
import { Router } from 'react-router-dom';
import { AppRouter } from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const history = createBrowserHistory();

 const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <AppRouter />
      </Router>
    </Provider>
  );
};

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
