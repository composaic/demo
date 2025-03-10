import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './core/App';
import './main.scss';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode >
);
