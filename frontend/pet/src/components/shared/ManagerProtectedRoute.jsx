import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const ManagerProtectedRoute = ({children}) => {
    const [user, setUser] = useAuth();
    setUser(setUserFromToken)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuthenticated) navigate("/products");
    })

    return user.role == "MANAGER" ? {children} : "";
}

export default ManagerProtectedRoute;