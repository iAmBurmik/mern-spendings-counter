import React from "react"
import { Routes, Route, Navigate } from 'react-router-dom'
import { AppPage } from './pages/AppPage'
import { AuthPage } from "./pages/AuthPage"


export const useRoutes = (isAutheticated) => {

    if(isAutheticated) {
        return (
            <Routes>
                <Route path="/*" element={<AppPage/>} exact/>
                <Route path="*" element={<Navigate to={"/"}/>}/>
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path="/*" element={<AuthPage/>} exact/>
            <Route path="*" element={<Navigate to={"/"}/>}/>
        </Routes>
    )
}