import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Footer from './Components/Footer'

ReactDOM.render(
  <React.StrictMode>
    <App key="1" />
    <Footer key="2" />
  </React.StrictMode>,
  document.getElementById('root')
);