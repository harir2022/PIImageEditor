import React from 'react';
import ReactDOM from 'react-dom';
import './tailwind.output.css'
import './defaults.css';
import App from './App';
import Shop from './Shop';
import Home from './PiApp/Home/Home';
import { Route, Router } from 'react-router-dom';
// import Gallery from './PiApp/Gallery/Gallery';



ReactDOM.render(
  <React.StrictMode>   
     <App/>        
  </React.StrictMode>,
  document.getElementById('root')
);

