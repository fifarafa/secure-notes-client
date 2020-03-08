import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Amplify from "aws-amplify";
import { BrowserRouter as Router } from 'react-router-dom';
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";


Amplify.configure({
    API: {
        endpoints: [
            {
                name: 'notes',
                endpoint: 'https://yyosn5pkag.execute-api.us-east-1.amazonaws.com/dev'
            }
        ]
    }
});

const options = {
    timeout: 5000,
    position: positions.BOTTOM_CENTER
};

ReactDOM.render(
    <Router>
        <Provider template={AlertTemplate} {...options}>
        <App />
        </Provider>
    </Router>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
