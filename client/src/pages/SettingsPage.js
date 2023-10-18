import { useCallback, useContext, useEffect, useState } from 'react'
import styles from './SettingsPage.module.css'
import AuthContext from '../context/auth-context'
import { useHttp } from '../hooks/http.hook';

export const SettingsPage = () => {

    const context = useContext(AuthContext);
    const {request} = useHttp();
    const [username, setUsername] = useState(context.username);
    const [userData, setUserData] = useState({});

    const changeUsernameHandler = (event) => {
        setUsername(event.target.value);
    }

    const updateUserDataHandler = async (event) => {
        event.preventDefault();
        if(username.trim().length > 3) {
            context.changeUsername(username);
            try {
                await request('/api/user/updateData', 'PATCH', {username}, {Authorization: `Bearer ${context.jwtToken}`})
            } catch(e) {}
        }
    }

    const fetchUserData = useCallback(async () => {
        try {
            const data = await request('api/user/getData', 'GET', null, {Authorization: `Bearer ${context.jwtToken}`});
            setUserData(data);
        } catch(e) {}
    }, [request, context.jwtToken])

    useEffect(() => {
        fetchUserData()
    }, [fetchUserData])

    return (
        <div className={styles.container}>
            <div className={styles['settings-section']}>
                <h1>Profile settings</h1>
                <div className={styles.box}>
                    <div className={styles.photo}></div>
                    <div className={styles.info}>
                        <div className={styles["form-group"]}>
                            <input type='text' name='name' value={username} onChange={changeUsernameHandler} className={`${styles["form-control"]}`}/>
                            <label className={styles["form-label"]}>Username</label>
                        </div>
                        <div className={styles["form-group"]}>
                            <input disabled={true} type='text' value={userData.email || ''} name='email' className={`${styles["form-control"]}`}/>
                            <label className={styles["form-label"]}>Email</label>
                        </div>
                        <div className={styles.container}>
                            <button onClick={updateUserDataHandler} className={styles.btn}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}