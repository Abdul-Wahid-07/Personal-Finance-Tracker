"use client"
import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [ token, setToken ] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem("token", serverToken);
    }

    let isLoggedIn = !!token;

    const LogoutUser = () => {
        setToken(null)
        return localStorage.removeItem("token");
    }

    return (
        <AuthContext.Provider value={{ storeTokenInLS, LogoutUser, isLoggedIn }} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const AuthContextValue = useContext(AuthContext);
    if(!AuthContextValue){
        throw new Error("useAuth used outside of the Provider");
    }
    return AuthContextValue;
};
