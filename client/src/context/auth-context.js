import React, {useState, useEffect, useCallback} from "react";

function noop() {}
const dataStorageName = 'userData';
const userStorageName = 'userName';

const AuthContext = React.createContext({
    jwtToken: null,
    userId: null,
    username: null,
    login: noop,
    logout: noop,
    changeUsername: noop,
    isAuthenticated: false
});

export const AuthContextProvider = (props) => {

    const [jwtToken, setJwtToket] = useState(null);
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = useCallback((token, id) => {
        setJwtToket(token);
        setUserId(id);
        setIsAuthenticated(true);

        localStorage.setItem(dataStorageName, JSON.stringify({jwtToken: token, userId: id}));
    }, []);

    const logout = useCallback(() => {
        setJwtToket(null);
        setUserId(null);
        setIsAuthenticated(false);

        localStorage.removeItem(dataStorageName);
        localStorage.removeItem(userStorageName);
        localStorage.removeItem('data-theme');
    }, []);  

    const changeUsername = (name) => {
        setUsername(name);
        localStorage.setItem(userStorageName, name);
    }
    
    useEffect(() => {
        const storageData = JSON.parse(localStorage.getItem(dataStorageName));
        if(storageData && storageData.jwtToken) {
            login(storageData.jwtToken, storageData.userId);
        }
        changeUsername(localStorage.getItem(userStorageName));
    }, [login]);

    return (
        <AuthContext.Provider value={{
            jwtToken, userId, username, login, logout, changeUsername, isAuthenticated
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;