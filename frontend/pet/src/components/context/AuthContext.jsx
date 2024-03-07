import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";
import {getUsers, login as performLogin, getUserByEmail} from "../../services/client.js";
import jwtDecode from "jwt-decode";

const AuthContext = createContext({});

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const setUserFromToken = () => {
        let token = localStorage.getItem("access_token");
        let u = null;
        if (token) {
            token = jwtDecode(token);
            // console.log("token: " + JSON.stringify(token));
            const u = {
                username: token.sub,
                role: token.role,
                roles: token.scopes
            }
            setUser(u);
        }
        return u;
    }

    // const fetchUserDetail = async () => {
    //     return await getUserByEmail(user.username);
    // }

    useEffect(() => {
        setUserFromToken();
    }, [])

    const login = async (usernameAndPassword) => {
        return new Promise((resolve, reject) => {
            console.log("user: " + JSON.stringify(user));
            console.log("children: " + children);
            performLogin(usernameAndPassword).then(res => {
                const jwtToken = res.headers["authorization"];
                localStorage.setItem("access_token", jwtToken);
                const decodedToken = jwtDecode(jwtToken);
                setUser({
                    username: decodedToken.sub,
                    roles: decodedToken.scopes
                })
                resolve(res);
            }).catch (err => {
                reject(err);
            })
        })
    }

    const logOut = () => {
        localStorage.removeItem("access_token");
        setUser(null);
    }

    const isUserAuthenticated = () => {
        const token = localStorage.getItem("access_token");
        if (!token) return false;
        const {exp: expiration} = jwtDecode(token);
        if (Date.now() > expiration * 1000) {
            logOut();
            return false;
        }
        return true;
    }

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logOut,
            isUserAuthenticated,
            setUserFromToken,
            // fetchUserDetail
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;