import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';



const AuthContext = createContext();



export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const getToken = localStorage.getItem('token');
        if (getToken) {
            setToken(getToken);
            setIsLoggedIn(true);
            try {
                const decoded = jwtDecode(getToken);
                setUser(decoded);
            } catch (e) {
                console.log('실패')
            }
        }

    }, [isLoggedIn]);

    return (
        <AuthContext.Provider value={{ token, setToken, user, isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);