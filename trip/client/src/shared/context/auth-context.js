import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom"; 
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate(); 

    useEffect(() => {
        const getToken = localStorage.getItem('token');
        if (getToken) {
            try {
                const decoded = jwtDecode(getToken);
                const currentTime = Date.now() / 1000; 

                if (decoded.exp < currentTime) {
            
                    localStorage.removeItem('token');
                    setToken(null);
                    setUser(null);
                    setIsLoggedIn(false);
                    toast.success('세션이 만료되었습니다. 다시 로그인해주세요.');
                    navigate('/login');
                } else {
                    // 토큰 살아있음
                    setToken(getToken);
                    setUser(decoded);
                    setIsLoggedIn(true);
                }

                
            } catch (e) {
                console.log('토큰 디코딩 실패', e);
                localStorage.removeItem('token');
                setToken(null);
                setUser(null);
                setIsLoggedIn(false);
                navigate('/login');

                
            }

            
        }
        
    }, [navigate]);

    



    return (
        <AuthContext.Provider value={{ token, setToken, user, isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
