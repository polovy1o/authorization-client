import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import Main from './components/Main';
import Register from './components/Register';
import ConfirmRegister, { ConfirmRegisterLoader } from './components/ConfirmRegister';
import Login from './components/Login';
import ResetPassword from './components/ResetPassword';
import ConfirmReset, { ConfirmResetLoader } from './components/ConfirmReset';
import { store } from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
    {
        path: '',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Main /> 
            },
            {
                path: '/register',
                element: <Register/>
            },
            {
                path: '/register/:code',
                element: <ConfirmRegister/>,
                loader: ConfirmRegisterLoader
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/reset',
                element: <ResetPassword/>
            },
            {
                path: '/reset/:code',
                element: <ConfirmReset/>,
                loader: ConfirmResetLoader
            }
        ]
    }
])

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>
);