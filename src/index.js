import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


import Barchart from './Barchart/Barchart';
import Circlechart from './Circlechart/Circlechart';
import Linechart from './Linechart/Linechart';


import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <div style={{display:'flex',flexDirection:'column', justifyItems:'flex-start'}}>
    <Linechart />
    </div>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
