import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {applyMiddleware, createStore, combineReducers} from "redux";
import menuReducer from "./redusers/menuReduser";
import thunk from "redux-thunk";

import 'bootstrap/dist/css/bootstrap.min.css';
import checkReducer from "./redusers/checkReduser";

const rootReducer = combineReducers({
    menu: menuReducer,
    check: checkReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

const app = (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(app , document.getElementById('root'));
serviceWorker.unregister();
