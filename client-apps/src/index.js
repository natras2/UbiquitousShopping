import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/style.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import App from './App';
import Error from './Error';

import { PasswordForgotten, default as Login } from './customers/Login';

import SALogin from './salesassistants/Login';
import Register from './customers/Register';
import Landing from './Landing';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="debug">
                    {/* Customer routes */}
                    <Route index element={<App />} />
                    <Route path='login'>
                        <Route index element={<Login />} />
                        <Route path='recover' element={<PasswordForgotten />} />
                    </Route>
                    <Route path='signup' element={<Register />} />

                    {/* Sales assistant routes */}
                    <Route path='sa'>
                        <Route index element={<App isSA='true'/>} />
                        <Route path='login' element={<SALogin />} />
                    </Route>

                    {/* Fallback error route */}
                    <Route path='*' element={<Error />} />
                </Route>
                <Route path='*' element={<Landing />} />
            </Routes>
        </Router>
    </React.StrictMode>
);
