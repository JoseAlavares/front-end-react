import React, { Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './config/Router';
//import Navbar from "./components/Navbar/Navbar";

//Styles
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';

function App() {
    return (
        <Fragment>
            <BrowserRouter>
                <Router/>            
            </BrowserRouter>            
        </Fragment>
    );
}

export default App;
