import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// TODO: Search "armstrongl" to get a set of 7 pages - go to the last page then go back - this breaks the integration, find out why
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
