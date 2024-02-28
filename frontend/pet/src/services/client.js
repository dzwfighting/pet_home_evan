import axios from 'axios';
import {useState} from "react";
import {useAuth} from "../components/context/AuthContext.jsx"

const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }
})

export const getUsers = async () => {
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/users`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const login = async (usernameAndPassword) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
            usernameAndPassword
        )
    } catch (e) {
        throw e;
    }
}

export const CreateUser = async (id, data) => {
    //需设定只有manager才可以创建用户
    
    try {
        return axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/user/register`,
            data,
            {
                ...getAuthConfig(),
                'Content-Type' : 'multipart/form-data'
            }
        );
    } catch (e) {
        throw e;
    }
}

// export const getUserByEmail = async (email) => {
//
// }

export const deleteUserByEmail = async (email) => {
    //需判定当前用户是否为manager，是的话再删除
    // const [user, setUser] = useState(null);
    // setUser();

    try {
        const user = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/finduser/${email}`
        )
        // console.log("user " + JSON.stringify(user));
        
        return await axios.delete(
            `${import.meta.env.VITE_API_BASE_URL}/user/${user.data.userId}`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}