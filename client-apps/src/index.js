import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/style.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import App from './App';
import Error from './Error';

import { PasswordForgotten, default as Login } from './customers/Login';

import SALogin from './salesassistants/Login';
import Register from './customers/Register';
import PersonalArea from './customers/PersonalArea';
import Cart from './customers/Cart';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                {/* Customer routes */}
                <Route index element={<App />} />
                <Route path='login'>
                    <Route index element={<Login />} />
                    <Route path='recover' element={<PasswordForgotten />} />
                </Route>
                <Route path='signup' element={<Register />} />
                <Route path='home' element={<PersonalArea page='Home' />} />
                <Route path='scan' element={<PersonalArea page='Scan' />} />
                <Route path='cart' element={<Cart />} />
                <Route path='history' element={<PersonalArea page='History' />} />
                <Route path='profile' element={<PersonalArea page='Profile' />} />

                {/* Sales assistant routes */}
                <Route path='sa'>
                    <Route index element={<App isSA='true'/>} />
                    <Route path='login' element={<SALogin />} />
                </Route>

                {/* Fallback error route */}
                <Route path='*' element={<Error />} />
            </Routes>
        </Router>
    </React.StrictMode>
);
