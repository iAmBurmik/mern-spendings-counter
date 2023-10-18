import React, { useEffect, useState } from "react"
import styles from './AuthPage.module.css'
import { SignInForm } from "../components/forms/SignInForm"
import { SignUpForm } from "../components/forms/SignUpForm"
import { Route, Routes, Navigate, NavLink } from "react-router-dom"


export const AuthPage = () => {

    const [isSignUp, setIsSignUp] = useState(false);
    const [isNavGoUp, setIsNavGoUp] = useState(false);
     
    const navGoUp = () => {
        setIsNavGoUp(true);
    }

    return (
        <div className={styles.container}>
            <div className={`${styles.frame} ${isSignUp === true ? styles['frame-long'] : styles['frame-short']}`}>
                <div className={`${styles.nav} ${isNavGoUp && styles['nav-up']}`}>
                    <ul className={styles.links}>
                        <li><NavLink onClick={() => setIsSignUp(false)} className={({isActive}) => (isActive ? styles['signin-active'] : styles['signin-inactive'])} to={"/login"}>Sign in</NavLink></li>
                        <li><NavLink onClick={() => setIsSignUp(true)} className={({isActive}) => (isActive ? styles['signup-active'] : styles['signup-inactive'])} to={"/registration"}>Sign up </NavLink></li>
                    </ul>
                </div>
                <div>
                    <Routes>
                        <Route path="/login" element={<SignInForm/>} exact/>
                        <Route path="/registration" element={<SignUpForm navGoUp={navGoUp}/>} exact/>
                        <Route path="*" element={<Navigate to={"/login"}/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    )
}