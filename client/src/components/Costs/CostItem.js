import {CostDate} from './CostDate'
import styles from './CostItem.module.css'

export const CostItem = (props) => { 
    
    return ( 
        <div className={styles['cost-item']}>
            <CostDate
                date = {props.date}
            ></CostDate>
            <div className={styles['cost-item__description']}>
                <h2>{props.name}</h2>
                <div className={styles['cost-item__price']}>${props.price}</div>
            </div>
        </div>
    );
}