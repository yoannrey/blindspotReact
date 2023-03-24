import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

import App from './App';
import Categories from './Categories';
import Category from './Categories/Category';
import Game from './Categories/Game';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route index path="login" element={<App />} />
                <Route path="categories" element={<Outlet />}>
                    <Route index element={<Categories />} />
                    <Route path=":categoryId">
                        <Route index element={<Category />} />
                        <Route path=":play" element={<Game />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root'),
);
