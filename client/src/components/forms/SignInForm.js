import React, { useContext, useEffect, useReducer, useRef, useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import styles from './FormStyles.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from "../../context/auth-context";
import Preloader from "../UI/preloader";


const emailReducer = (prevState, action) => {
    if(action.type === "USER_INPUT") {
        return {
            value: action.value,
            isValid: action.value.includes("@") && action.value.length > 7
        }
    }
    if(action.type === "INPUT_BLUR") {
        return {
            value: prevState.value,
            isValid: prevState.value.includes("@") && prevState.value.length > 7
        }
    }
    return {
        value: "",
        isValid: false
    }
}

const passwordReducer = (prevState, action) => {
    if(action.type === "USER_INPUT") {
        return {
            value: action.value,
            isValid: action.value.trim().length > 7
        }
    }
    if(action.type === "INPUT_BLUR") {
        return {
            value: prevState.value,
            isValid: prevState.value.trim().length > 7
        }
    }
    return {
        value: "",
        isValid: false
    }
}

export const SignInForm = (props) => {

    const {isLoading, error, request, clearError} = useHttp();
    const context = useContext(AuthContext);

    useEffect(() => {
        toast.error(error, {autoClose: 1500 ,theme: "light"});
        clearError()
    }, [error, clearError])
    
    const [emailState, dispatchEmailState] = useReducer(emailReducer, {value: "", isValid: undefined});
    const [passwordState, dispatchPasswordState] = useReducer(passwordReducer, {value: "", isValid: undefined})
    const [formIsValid, setFormIsValid] = useState(false);

    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const emailChangeHandler = (event) => {
        dispatchEmailState({type: "USER_INPUT", value: event.target.value})
    }

    const validateEmailHandler = () => {
        dispatchEmailState({type: "INPUT_BLUR"});
    }

    const passwordChangeHandler = (event) => {
        dispatchPasswordState({type: "USER_INPUT", value: event.target.value})
    }

    const validatePasswordHandler = () => {
        dispatchPasswordState({type: "INPUT_BLUR"})
    }

    const { isValid: emailIsValid } = emailState;
    const { isValid: passwordIsValid} = passwordState;

    useEffect(() => {
        setFormIsValid(emailIsValid && passwordIsValid);
    }, [emailIsValid, passwordIsValid])

    const submitHandler = async (event) => {
        event.preventDefault();
        if(formIsValid) {
            try {
                const data = await request('/api/auth/login', "POST", {email: emailState.value, password: passwordState.value});
                if(!isLoading && !error) {
                    context.changeUsername(data.username);
                    setIsSuccessLogin(true);
                }
                setTimeout(() => context.login(data.token, data.userId), 3000);
            } catch(e) {}
        }
        else if(!emailIsValid) {
            emailInputRef.current.focus();
        }
        else {
            passwordInputRef.current.focus();
        }
    }

    // if login is success

    const [isSuccessLogin, setIsSuccessLogin] = useState(false);

    return (
        <React.Fragment>
        <form className={styles['form-signin']} action="" method="post" name="form">
            <ToastContainer/>
            <label htmlFor="email">Email</label>
            <input 
                className={`${styles['form-styling']} ${emailIsValid === false ? styles.invalid : ""}`} 
                type="text" 
                name="email" 
                placeholder=""
                onChange={emailChangeHandler}
                onBlur={validateEmailHandler}
                ref={emailInputRef}
            />
            <label htmlFor="password">Password</label>
            <input 
                className={`${styles['form-styling']} ${passwordIsValid === false ? styles.invalid : ""}`} 
                type="password" 
                name="password" 
                placeholder=""
                onChange={passwordChangeHandler}
                onBlur={validatePasswordHandler}
                ref={passwordInputRef}
            />
            <input type="checkbox" id="checkbox"/>
            <label htmlFor="checkbox" ><span className={styles.ui}></span>Keep me signed in</label>
            <div className={`${styles['btn-animate']} ${isSuccessLogin ? styles['btn-animate-grow'] : ''}`}>
                <a onClick={submitHandler} className={`${styles['btn-signin']} ${isLoading ? styles.goHead : ''} ${isLoading === false ? styles.goBack : ''}`}>Sign in</a>
                <Preloader isLoading={isLoading}/>
            </div>
        </form>
        <div>
            <div className={`${styles['cover-photo']} ${isSuccessLogin ? styles['cover-photo-down'] : ''}`}></div>
            <div className={`${styles.container} ${isSuccessLogin ? styles['container-down'] : ''}`}>
                <div className={`${styles["profile-photo"]} ${isSuccessLogin ? styles['profile-photo-down'] : ''}`}></div>
            </div>
            <h1 className={`${styles["welcome"]} ${isSuccessLogin ? styles['welcome-left'] : ''}`}>Welcome, {context.username}</h1>
            <a className={`${styles["btn-goback"]} ${isSuccessLogin ? styles['btn-goback-up'] : ''}`} value="Refresh">Go back</a>
        </div>
    </React.Fragment>
    )
}
