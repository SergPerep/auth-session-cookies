import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = props => {
    const [isUserAuthorized, setIsUserAuthorized] = useState(false);
    
    const logOut = () => {
        setIsUserAuthorized(false);
        localStorage.removeItem("token");
    }

    const verifyToken = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:5000/auth/token-verification", {
                headers: { token }
            });
            const data = await response.json();
            setIsUserAuthorized(data === true);
        } catch (error) {
            console.error(error.message);
        }
    }
    
    useEffect(() => {
        verifyToken();
    }, []);

    const valuesToShare = {
        isUserAuthorized,
        setIsUserAuthorized,
        verifyToken,
        logOut
    };
    return <AuthContext.Provider value={valuesToShare}>
        {props.children}
    </AuthContext.Provider>
}