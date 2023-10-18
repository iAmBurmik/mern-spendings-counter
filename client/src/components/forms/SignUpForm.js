import React, { useContext, useEffect, useReducer, useRef, useState } from "react";
import styles from './FormStyles.module.css'
import {useHttp} from '../../hooks/http.hook'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from "../../context/auth-context";
import Preloader from "../UI/preloader";

const usernameReducer = (prevState, action) => {
    if(action.type === "USER_INPUT") {
        return {
            value: action.value,
            isValid: action.value.length > 3
        }
    }
    if(action.type === "INPUT_BLUR") {
        return {
            value: prevState.value,
            isValid: prevState.value.length > 3
        }
    }
    return {
        value: "",
        isValid: false
    }
}

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

export const SignUpForm = (props) => {

    const {isLoading, error, request, clearError} = useHttp();
    const context = useContext(AuthContext);

    useEffect(() => {
        toast.error(error, {autoClose: 1500 ,theme: "light"});
        clearError()
    }, [error, clearError])
    
    const [usernameState, dispatchUsernameState] = useReducer(usernameReducer, {value: "", isValid: undefined})
    const [emailState, dispatchEmailState] = useReducer(emailReducer, {value: "", isValid: undefined})
    const [passwordState, dispatchPasswordState] = useReducer(passwordReducer, {value: "", isValid: undefined})
    const [formIsValid, setFormIsValid] = useState(false);

    const usernameInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const usernameChangeHandler = (event) => {
        dispatchUsernameState({type: "USER_INPUT", value: event.target.value});
    }

    const validateUsernameHandler = () => {
        dispatchUsernameState({type: "INPUT_BLUR"});
    }

    const emailChangeHandler = (event) => {
        dispatchEmailState({type: "USER_INPUT", value: event.target.value});
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

    const { isValid: usernameIsValid } = usernameState;
    const { isValid: emailIsValid } = emailState;
    const { isValid: passwordlIsValid } = passwordState;

    useEffect(() => {
        setFormIsValid(usernameIsValid && emailIsValid && passwordlIsValid);
    }, [usernameIsValid, emailIsValid, passwordlIsValid])

    const submitHandler = async (event) => {
        event.preventDefault();
        if(formIsValid) {
            try {
                const data = await request('/api/auth/register', 'POST', {email: emailState.value, password: passwordState.value, name: usernameState.value});
                if(!isLoading && !error) {
                    props.navGoUp()
                    setIsSuccessRegistration(true);
                    setTimeout(() => setStartAnimation(true), 600);
                    context.changeUsername(usernameState.value);
                }
                setTimeout(() => context.login(data.token, data.userId), 3100);
            } catch (e) {}
        }
        else if(!usernameIsValid) {
            usernameInputRef.current.focus();
        }
        else if(!emailIsValid) {
            emailInputRef.current.focus();
        }
        else {
            passwordInputRef.current.focus();
        }
    }

    const [isSuccessRegistration, setIsSuccessRegistration] = useState(false);
    const [startAnimation, setStartAnimation] = useState(false);

    return (
        <React.Fragment>
            <form className={`${styles['form-signup']} ${isSuccessRegistration && styles['form-signup-down']}`} action="" method="post" name="form">
                <ToastContainer/>
                <label htmlFor="username">Username</label>
                <input 
                    className={`${styles['form-styling']} ${usernameIsValid === false ? styles.invalid : ""}`} 
                    type="text" 
                    name="username" 
                    placeholder=""
                    onChange={usernameChangeHandler}
                    onBlur={validateUsernameHandler}
                    ref={usernameInputRef}
                />
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
                    className={`${styles['form-styling']} ${passwordlIsValid === false ? styles.invalid : ""}`} 
                    type="password" 
                    name="password" 
                    placeholder=""
                    onChange={passwordChangeHandler}
                    onBlur={validatePasswordHandler}
                    ref={passwordInputRef}
                />
                <div className={styles['btn-animate']}>
                    <a onClick={submitHandler} className={`${styles['btn-signup']} ${isLoading ? styles.goHead : ''} ${isLoading === false ? styles.goBack : ''}`}>Sign up</a>
                    <Preloader isLoading={isLoading}/>
                </div>
            </form>
            <div className={`${styles.success} ${isSuccessRegistration && styles['success-left']}`}>
                <svg width="270" height="270" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 60 60" id={styles.check} className={startAnimation ? styles.checked : ''}>
                    <path fill="#ffffff" d="M40.61,23.03L26.67,36.97L13.495,23.788c-1.146-1.147-1.359-2.936-0.504-4.314
                    c3.894-6.28,11.169-10.243,19.283-9.348c9.258,1.021,16.694,8.542,17.622,17.81c1.232,12.295-8.683,22.607-20.849,22.042
                    c-9.9-0.46-18.128-8.344-18.972-18.218c-0.292-3.416,0.276-6.673,1.51-9.578" />
                </svg>
                <div className={styles.successtext}>
                    <p> Thanks for signing up! </p>
                </div>
            </div>
        </React.Fragment>
    )
}
