import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// require('./favicon.ico')
// console.log(process.env.NODE_ENV);
const title = 'React with Webpack and Babel';
ReactDOM.render(
    <App title={title} />,
  document.getElementById('root')
);