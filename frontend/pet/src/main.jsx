import React from 'react'
import ReactDOM from 'react-dom/client'
import User from "./User.jsx"
import {ChakraProvider, Text} from '@chakra-ui/react'
import { createStandaloneToast } from '@chakra-ui/toast'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/login/Login.jsx";
import Product from "./components/product/Product.jsx";
import AuthProvider from "./components/context/AuthContext.jsx";
import ProtectedRoute from "./components/shared/ProtectedRoute.jsx";
import Cart from "./components/cart/Cart.jsx";
import Favorites from "./components/favorites/Favorites.jsx";
import Setting from "./components/setting/Setting.jsx";
import Signup from "./components/signup/Signup.jsx";
import SidebarWithHeader from "./components/shared/SideBar.jsx"

// import './index.css'
const { ToastContainer } = createStandaloneToast();

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/register",
        element: <Signup/>
    },
    {
        path: "/users",
        element: <ProtectedRoute><User /></ProtectedRoute>
    },
    {
        path: "/products",
        element: <Product />
    },
    {
        path: "/cart",
        element: <ProtectedRoute><Cart /></ProtectedRoute>
    },
    {
        path: "/favorites",
        element: <ProtectedRoute><Favorites /></ProtectedRoute>
    },
    {
        path: "/setting",
        element: <ProtectedRoute><Setting /></ProtectedRoute>
    }
])

ReactDOM
    .createRoot(document.getElementById('root'))
    .render(
        <React.StrictMode>
            <ChakraProvider>
                <AuthProvider>
                    <RouterProvider router={router} />
                </AuthProvider>
                <ToastContainer />
            </ChakraProvider>
        </React.StrictMode>,
    )
