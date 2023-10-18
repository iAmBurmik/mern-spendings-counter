import styles from "./preloader.module.css";

const Preloader = ({isLoading}) => {
    return <div className={`${styles.loader} ${isLoading ? styles.goHead : ''} ${isLoading === false ? styles.goBack : ''}`}></div>
}

export default Preloader;