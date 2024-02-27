import axios from 'axios';

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

export const postProducts = async () => {
    
}