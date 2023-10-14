import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/style.css';
import App from './App';
import Error from './Error';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route  element={<Error />} />
            </Routes>
        </Router>
    </React.StrictMode>
);
