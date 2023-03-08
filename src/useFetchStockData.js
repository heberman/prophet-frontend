import { useEffect, useState } from 'react';
import axios from './api/axios';

const useFetchStockData = (ticker, func, interval, outputsize, data_key) => {

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.post('/data/' + ticker,
                JSON.stringify({ func, interval, outputsize, data_key }),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            console.log(response);
            return response;
        }

        fetchData()
            .then(result => {
                const newData = result.data;
                setData(newData);
                setIsPending(false);
            })
            .catch(err => {
                setIsPending(false);
                setError(err.message);
                console.log(err);
            });
    },[ticker, func, interval, outputsize, data_key])

    return ( {data, isPending, error} );
}
 
export default useFetchStockData;