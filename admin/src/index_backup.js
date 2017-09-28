import React from 'react';
import ReactDOM from 'react-dom';

import Application from './application.jsx'

const root = document.createElement('div');
document.body.appendChild(root);

ReactDOM.render(
    React.createElement(Application, null),
    root
);