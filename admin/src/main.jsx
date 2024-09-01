import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx'
import './index.css'

import AdminContextProvider from './context/AdminContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <AdminContextProvider>
                <App />   
            </AdminContextProvider>    
        </BrowserRouter>
    </React.StrictMode>,
)
