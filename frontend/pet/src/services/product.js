import axios from 'axios';
import {useState, useEffect} from "react";
import jwtDecode from "jwt-decode";
import {useAuth} from "../components/context/AuthContext.jsx"

const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }
})

export const getProducts = async () => {
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/products`
        )
    } catch (e) {
        throw e;
    }
}

export const postProducts = async (id, data) => {
    const [user, setUser] = useState(null);
    const {setUserFromToken} = useAuth();
    setUser(setUserFromToken());

    if (user) {
        if (user.role == "MANAGER"){
            return await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/product/add`,
                data,
                {
                    ...getAuthConfig(),
                    'Content-Type' : 'multipart/form-data'
                }
            );
        } else throw "Only Manager can post product"

    } else {
        throw "please login"
    }
}

export const deleteProducts = async (id) => {
    const [user, setUser] = useState(null);
    const {setUserFromToken} = useAuth();
    setUser(setUserFromToken());
    if (user) {
        console.log("current user info: " + user)
        try {
            if (user.role == "MANAGER"){
                return await axios.delete(
                    `${import.meta.env.VITE_API_BASE_URL}/product/${id}`
                )
            } else throw "Only Manager can delete this product"

        } catch (e) {
            throw e;
        }
    } else {
        throw "Please login then delete";
    }

}

export const getProductById = async (id) => {
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/product/${id}`,
            id
        )
    } catch (e) {
        throw e;
    }
}