import { useState } from 'react';
import styles from './CostFilter.module.css'

export const CostFilter = ({selectedYear, changeYear}) => { 

    return ( 
        <div className={styles.filter}>
            <label>Year selection</label>
            <select value={selectedYear} onChange={event => changeYear(event.target.value)}>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
            </select>
        </div>
    );
}