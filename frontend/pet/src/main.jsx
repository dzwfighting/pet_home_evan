import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {ChakraProvider, Text} from '@chakra-ui/react'
import { createStandaloneToast } from '@chakra-ui/toast'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/login/Login.jsx";
import ProductCard from "./components/product/ProductCard.jsx"
import AuthProvider from "./components/context/AuthContext.jsx";
import ProtectedRoute from "./components/shared/ProtectedRoute.jsx";
import SidebarWithHeader from "./components/shared/SideBar.jsx"

// import './index.css'
const { ToastContainer } = createStandaloneToast();

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/users",
        element: <ProtectedRoute><App /></ProtectedRoute>
    },
    {
        path: "/products",
        element: <SidebarWithHeader><ProductCard /></SidebarWithHeader>
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
