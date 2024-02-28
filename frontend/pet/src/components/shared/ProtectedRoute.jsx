import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const ProtectedRoute = ({children}) => {
    console.log(children);
    
    const {isUserAuthenticated} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isUserAuthenticated()) navigate("/");
    })
    
    return isUserAuthenticated() ? children : "";
}

export default ProtectedRoute;