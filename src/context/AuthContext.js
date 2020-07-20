import React, { useEffect, useState } from 'react';

export const Auth = React.createContext();

export const AuthContext = ({ children }) => {
    const [userAuth, setUserAuth] = useState(null);    

    useEffect(() => {  
        const token = window.sessionStorage.getItem("jwt");
        const userData = window.sessionStorage.getItem("user");
        if(token === undefined || token === null || token === "") {
            setUserAuth(null);
        }
        else {
            setUserAuth(token);
        }
    }, []);

    return (
        <Auth.Provider value={{ userAuth }}>
            {children}
        </Auth.Provider>

    );
};

