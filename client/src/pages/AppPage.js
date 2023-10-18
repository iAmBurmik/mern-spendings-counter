import React, { useEffect } from "react";
import { Route, Routes, Navigate, NavLink, useNavigate } from "react-router-dom"
import { Header } from "../components/layout/Header";
import { AddPage } from "./AddPage";
import { HomePage } from "./HomePage";
import styles from './AppPage.module.css'
import { SettingsPage } from "./SettingsPage";

export const AppPage = () => {

    const navigate = useNavigate()

    useEffect(() => {
      navigate(JSON.parse(window.sessionStorage.getItem('lastRoute') || '{}'))
      window.onbeforeunload = () => {
          window.sessionStorage.setItem('lastRoute', JSON.stringify(window.location.pathname))
      }
    }, [])

    return (
        <div className={styles["app-container"]}>
            <Header/>
            <div className={styles["app-content"]}>
                <div className={styles["app-sidebar"]}>
                    <NavLink className={({isActive}) => (isActive ? styles.active : '')} to={"/home"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                    </NavLink>
                    <NavLink className={({isActive}) => (isActive ? styles.active : styles['add-btn'])} to={"/add"}>
                        <svg className={styles["btn-icon"]} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                    </NavLink>
                    <NavLink className={({isActive}) => (isActive ? styles.active : '')} to={"/settings"}>
                        <svg className={styles["link-icon"]} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                            <defs />
                            <circle cx="12" cy="12" r="3" />
                            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                        </svg>
                    </NavLink>
                </div>
                <div className={styles["main-section"]}>
                    <Routes>
                        <Route path="/home" element={<HomePage/>} exact/>
                        <Route path="/add" element={<AddPage/>} exact/>
                        <Route path="/settings" element={<SettingsPage/>} exact/>
                        <Route path="*" element={<Navigate to={"/home"}/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    )
}