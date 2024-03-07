import axios from 'axios';
import {useState, useEffect} from "react";
import jwtDecode from "jwt-decode";

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

export const postProducts = async (data) => {
    // console.log("this is my add product: " + JSON.stringify(data));
    return await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/product/add`,
        data,
        {
            ...getAuthConfig(),
            'Content-Type' : 'multipart/form-data'
        }
    );
}

export const ProductOperateCart = async (userId, product, operation) => {
    console.log("ProductOperateCart userId: " + userId + " the operation is: " + operation)
    return await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}/product/${userId}/opecart/${operation}`,
        product,
        getAuthConfig()
    );
}

export const ProductOperateFavorite = async (userId, product, operation) => {
    return await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/product/${userId}/opefavorite/${operation}`,
        product,
        getAuthConfig()
    )
}

export const deleteProducts = async (id) => {
    try {
        if (user.role == "MANAGER"){
            return await axios.delete(
                `${import.meta.env.VITE_API_BASE_URL}/product/${id}`
            )
        } else throw "Only Manager can delete this product"

    } catch (e) {
        throw e;
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


