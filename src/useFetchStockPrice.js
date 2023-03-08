import { useEffect, useState } from 'react';
import axios from './api/axios';

const useFetchStockPrice = (ticker) => {

    const [currPrice, setCurrPrice] = useState(null);
    const [currDay, setCurrDay] = useState(null);
    const [tradable, setTradable] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('/price/' + ticker);
            const json = await response.json();
            return json;
        }

        const result = fetchData()
            .catch(err => {
                setIsPending(false);
                setError(err.message);
                console.log(err);
            })

        const data = result.data;
        setCurrPrice(data.currPrice);
        setCurrDay(data.currDay);
        setTradable(data.tradable);
        setIsPending(false);
    },[ticker])

    return ( {currPrice, currDay, tradable, isPending, error} );
}
 
export default useFetchStockPrice;