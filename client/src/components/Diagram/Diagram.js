import styles from './Diagram.module.css'
import { DiagramBar } from './DiagramBar';

export const Diagram = (props) => {

    const costsAmountArray = props.dataSets.map(dataSet => dataSet.value)
    var maxCosts = 0;
    for(let i = 0; i < costsAmountArray.length; i++) {
        maxCosts += costsAmountArray[i];
    }

    return (
        <div className={styles.diagram}>
            {props.dataSets.map(dataSet => {
                return <DiagramBar 
                    key={dataSet.label}
                    value={dataSet.value}
                    maxValue={maxCosts}
                    label={dataSet.label}
                />
            })}
        </div>
    )
}