import { useEffect, useState } from 'react';
import axios from './api/axios';

const useFetchStockPrice = (ticker) => {

    const [currPrice, setCurrPrice] = useState(null);
    const [currDay, setCurrDay] = useState(null);
    const [tradable, setTradable] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            const response = axios.get('/price/' + ticker);
            data = response.data;
            setCurrPrice(data.currPrice);
            setCurrDay(data.currDay);
            setTradable(data.tradable);
            setIsPending(false);
        } catch (err) {
            setIsPending(false);
            setError(err.message);
            console.log(err);
        }
    },[ticker])

    return ( {currPrice, currDay, tradable, isPending, error} );
}
 
export default useFetchStockPrice;