import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = props => {
    const [isUserAuthorized, setIsUserAuthorized] = useState(false);
    const valuesToShare = {
        isUserAuthorized,
        setIsUserAuthorized
    };

    const verifyToken = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:5000/auth/token-verification", {
                headers: { token }
            });
            const dbRes = await response.json();
        } catch (error) {
            console.error(error.message);
        }
    }

    return <AuthContext.Provider value={valuesToShare}>
        {props.children}
    </AuthContext.Provider>
}