import { Loader } from '../UI/Loader';
import {CostItem} from './CostItem'
import styles from './CostList.module.css'

export const CostList = (props) => {

    if(props.isLoading || props.error) {
        return <Loader/>
    }

    if(props.costs && props.costs.length === 0) {
        return <h2 className={styles["cost-list__fallback"]}>No expenses this year</h2>;
    }
  
    return (
        <ul className={styles["cost-list"]}>
            {props.costs.map((cost) => { 
                return <CostItem 
                    key={cost._id}
                    date={cost.date}
                    name={cost.name}
                    price={cost.price}
                />
            })}
        </ul>
    )
} 