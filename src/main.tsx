import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Outlet, Route, Routes} from 'react-router-dom';

import App from './App';
import Categories from './Categories/Categories';
import Category from './Categories/Category';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route index path="login" element={<App />} />
                <Route path="categories" element={<Outlet />}>
                    <Route index element={<Categories />} />
                    <Route path=":categoryId" element={<Category />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root'),
);
