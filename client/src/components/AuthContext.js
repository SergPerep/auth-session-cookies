import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = props => {
    const [isUserAuthorized, setIsUserAuthorized] = useState(false);
    const sharedStatesAndMethods = {
        isUserAuthorized,
        setIsUserAuthorized
    };
    return <AuthContext.Provider value={sharedStatesAndMethods}>
        {props.children}
    </AuthContext.Provider>
}