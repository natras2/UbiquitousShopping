import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/style.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import App from './App';
import Error from './Error';

import { PasswordForgotten, default as Login } from './customers/Login';
import Register from './customers/Register';
import PersonalArea from './customers/PersonalArea';
import Cart, { ProductDigitalLabel } from './customers/Cart';
import AddProduct from './customers/cartmanagement/AddProduct';

import SALogin from './salesassistants/Login';
import SAPersonalArea from './salesassistants/PersonalArea';
import { DispenserOverview } from './salesassistants/personalarea/Dispensers';

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
                <Route path='cart'>
                    <Route index element={<Cart />} />
                    <Route path='add' element={<AddProduct />} />
                    <Route path='label/:iddispenser' element={<ProductDigitalLabel />} />
                </Route>
                <Route path='history' element={<PersonalArea page='History' />} />
                <Route path='profile' element={<PersonalArea page='Profile' />} />

                {/* Sales assistant routes */}
                <Route path='sa'>
                    <Route index element={<App isSA='true'/>} />
                    <Route path='login' element={<SALogin />} />
                    <Route path='home' element={<SAPersonalArea page='Home' />} />
                    <Route path='validate' element={<SAPersonalArea page='Validate' />} />
                    <Route path='checkout' element={<SAPersonalArea page='Checkout' />} />
                    <Route path='carts' element={<SAPersonalArea page='Carts' />} />
                    <Route path='dispensers'>
                        <Route index element={<SAPersonalArea page='Dispensers' />} />
                        <Route path=':iddispenser' element={<DispenserOverview />} />
                    </Route>
                </Route>

                {/* Fallback error route */}
                <Route path='*' element={<Error />} />
            </Routes>
        </Router>
    </React.StrictMode>
);
