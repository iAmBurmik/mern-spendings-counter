import { useContext, useRef, useState } from 'react'
import styles from './AddPage.module.css'
import { useHttp } from '../hooks/http.hook';
import AuthContext from '../context/auth-context';

const isInputValid = (value) => value.trim().length > 0;

export const AddPage = () => {
    
    const { request } = useHttp();
    const [styleForWrongEntry, setStyleForWrongEntry] = useState('');
    const context = useContext(AuthContext);
    const spendRef = useRef();
    const priceRef = useRef();
    const dateRef = useRef();

    const [formValidity, setIsFormValidity] = useState({
        spend: undefined,
        price: undefined,
        date: undefined,
    });

    const submitNewCostHandler = async (event) => {
        event.preventDefault();

        const spendValue = spendRef.current.value;
        const priceValue = priceRef.current.value;
        const dateValue = dateRef.current.value;

        const isSpendValid = isInputValid(spendValue);
        const isPriceValid = isInputValid(priceValue);
        const isDateValid = isInputValid(dateValue);

        setIsFormValidity({
            spend: isSpendValid,
            price: isPriceValid,
            date: isDateValid
        });

        const isFormValid = isSpendValid && isPriceValid && isDateValid;

        if(isFormValid) {
            try {
                await request('/api/cost/new', 'POST', {name: spendValue, price: priceValue, date: dateValue}, {Authorization: `Bearer ${context.jwtToken}`})
                spendRef.current.value = '';
                priceRef.current.value = '';
                dateRef.current.value = '';
            } catch(e) {}
        }
        else {        
            setStyleForWrongEntry('wrong-entry');
            setTimeout(() => {
                setStyleForWrongEntry('');
            }, 3000)
        }
    }

    return (
        <div className={styles.container}>
            <div className={`${styles['add-section']} ${styles[styleForWrongEntry]}`}>
                <h1>Add new spend</h1>
                <div className={styles["form-group"]}>
                    <input ref={spendRef} type='text' name='spend' required="required" className={`${styles["form-control"]} ${formValidity.spend === false && styles.invalid}`}/>
                    <label className={styles["form-label"]}>Spend</label>
                </div>
                <div className={styles["form-group"]}>
                    <input ref={priceRef} type='number' name='price' required="required" className={`${styles["form-control"]} ${formValidity.price === false && styles.invalid}`}/>
                    <label className={styles["form-label"]}>Price</label>
                </div>
                <div className={styles["form-group"]}>
                    <input ref={dateRef} id='date' type='date' name='date' required="required" className={`${styles["form-control"]} ${formValidity.date === false ? styles.invalid : ''}`}/>
                    <label className={styles["form-label"]}>дд.мм.гггг</label>
                    <div className={styles.container}>
                        <button className={styles.btn} onClick={submitNewCostHandler}>Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}