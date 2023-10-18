import React, { useContext, useState } from "react";
import styles from './Header.module.css'
import AuthContext from "../../context/auth-context";
import { NavLink } from "react-router-dom";
import { useTheme } from "../../hooks/use-theme";

export const Header = () => {
    const context = useContext(AuthContext);

    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const {theme, setTheme} = useTheme()

    const toogleMenuHandler = () => {
        setIsMenuVisible(!isMenuVisible);
    }
    
    const changeThemeHandler = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }

    return (
        <>
        <div className={styles["app-header"]}>
            <div className={styles["app-header-left"]}>
                <button onClick={toogleMenuHandler} className={`${styles.burger}`}>
                    {isMenuVisible 
                    ? 
                    <svg width="30" height="30" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.33745 28.2367L7.76245 26.6617L16.4249 17.9992L7.76245 9.33672L9.33745 7.76172L17.9999 16.4242L26.6624 7.76172L28.2374 9.33672L19.5749 17.9992L28.2374 26.6617L26.6624 28.2367L17.9999 19.5742L9.33745 28.2367Z" fill="#F7F7F7"/>
                    </svg> 
                    : 
                    <svg width="30" height="30" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.5 27V24.75H31.5V27H4.5ZM4.5 19.125V16.875H31.5V19.125H4.5ZM4.5 11.25V9H31.5V11.25H4.5Z" fill={theme === 'dark' ? "#fff" : "#000"}/>
                    </svg>}
                </button>
                <p className={styles["app-name"]}>SPCounter</p>
                <div className={styles["search-wrapper"]}>
                    <input className={styles["search-input"]} type="text" placeholder="Search"/>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                        <defs></defs>
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="M21 21l-4.35-4.35"></path>
                    </svg>
                </div>
            </div>
            <div className={styles["app-header-right"]}>
                <button onClick={changeThemeHandler} className={styles["mode-switch"]} title="Switch Theme">
                    <svg className={styles.moon} fill={theme === 'dark' ? "#fff" : "none"} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="26" height="26" viewBox="0 0 24 24">
                        <defs></defs>
                        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
                    </svg>
                </button>
                <button className={styles["exit-btn"]} onClick={() => context.logout()}></button>
                <div className={styles["profile-btn"]}>
                    <div></div>
                    <span>{context.username}</span>
                </div>
            </div>
        </div>
        <div className={isMenuVisible ? styles.open : ''}>
            <div className={styles.background}></div>
            <div className={styles.menu}>
                <nav>
                    <NavLink onClick={toogleMenuHandler} className={({isActive}) => (isActive ? styles.active : '')} style={{animationDelay: 0.2 + 's'}} to={"/home"}>Home</NavLink>
                    <NavLink onClick={toogleMenuHandler} className={({isActive}) => (isActive ? styles.active : '')} style={{animationDelay: 0.3 + 's'}} to={"/add"}>Add</NavLink>
                    <NavLink onClick={toogleMenuHandler} className={({isActive}) => (isActive ? styles.active : '')} style={{animationDelay: 0.4 + 's'}} to={"/settings"}>Settings</NavLink>
                    <div style={{animationDelay: 0.5 + 's'}}>
                        <label className={styles.switch}>
                            <input type="checkbox" readOnly={true} checked={theme === 'dark' ? true : false} onClick={changeThemeHandler} id={styles.slider}/>
                            <span className={`${styles.slider} ${styles.round}`}></span>
                        </label>
                    </div>
                </nav>
            </div>
        </div>
        </>
    )
}