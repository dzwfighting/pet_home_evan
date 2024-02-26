import axios from 'axios';

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