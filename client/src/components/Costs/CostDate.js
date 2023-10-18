import styles from './CostDate.module.css'

export const CostDate = (props) => {

    const date = new Date(props.date)
    const month = date.toLocaleString('en-EN', {month: "long"});
    const year = date.getFullYear();
    const day = date.toLocaleString('en-EN', {day: "2-digit"});
    return (
        <div className={styles["cost-date"]}>
            <div className={styles["cost-date__month"]}>{month}</div>
            <div className={styles["cost-date__year"]}>{year}</div>
            <div className={styles["cost-date__day"]}>{day}</div>
        </div>
    );
}