import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = props => {
    const [isUserAuthorized, setIsUserAuthorized] = useState(false);

    const logOut = async () => {
        try {
            const serverData = await fetch("http://localhost:5000/auth/logout", {
                credentials: 'include'
            });
            const message = await serverData.json();
            console.log(message);
            setIsUserAuthorized(false);
        } catch (error) {
            error.console(error.message);
        }
    }

    const checkAuth = async () => {
        try {
            const serverData = await fetch("http://localhost:5000/auth/check-auth", {
                credentials: 'include'
            });
            const { auth } = await serverData.json();
            setIsUserAuthorized(auth ? auth : false);
            console.log({ auth })
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        checkAuth();
    }, [])

    const valuesToShare = {
        isUserAuthorized,
        setIsUserAuthorized,
        checkAuth,
        logOut
    };
    return <AuthContext.Provider value={valuesToShare}>
        {props.children}
    </AuthContext.Provider>
}