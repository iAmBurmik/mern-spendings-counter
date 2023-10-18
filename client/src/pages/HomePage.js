import { useCallback, useContext, useEffect, useState } from 'react'
import { CostDiagram } from '../components/Costs/CostDiagram'
import { CostList } from '../components/Costs/CostList';
import { CostFilter } from '../components/Costs/CostFilter';
import styles from './HomePage.module.css'
import { useHttp } from '../hooks/http.hook';
import AuthContext from '../context/auth-context';


export const HomePage = () => {
    
    const [costs, setCosts] = useState([]);
    const [selectedYear, setSelectedYear] = useState('2023')
    const {isLoading, error, request} = useHttp();
    const {jwtToken} = useContext(AuthContext);

    const changeYearHandler = (year) => {
        setSelectedYear(year);
    }

    const fetchCosts = useCallback(async () => {
        try {
          const data = await request('api/cost', 'GET', null, {Authorization: `Bearer ${jwtToken}`});
          setCosts(data);
        } catch(e) {}
    }, [request, jwtToken])

    useEffect(() => {
      fetchCosts()
    }, [fetchCosts])

    const filteredCosts = costs.filter(cost => new Date(cost.date).getFullYear().toString() === selectedYear)


    return (
        <>
            <div className={styles.container}>
                <div className={styles['spendings-section']}>
                    <CostFilter selectedYear={selectedYear} changeYear={changeYearHandler}/>
                    <CostDiagram costs={filteredCosts}/>
                    <CostList costs={filteredCosts} isLoading={isLoading} error={error}/>
                </div>
            </div>
        </>

    )
}