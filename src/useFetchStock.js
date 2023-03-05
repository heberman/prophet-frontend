import { useEffect, useState } from 'react';
const funcs = require('./StaticFunctions');

const useFetchStock = (ticker, getPrice, func='TIME_SERIES_INTRADAY', interval='1min', 
                        outputsize='full', data_key='Time Series (1min)') => {

    const [data, setData] = useState(null);
    const [currPrice, setCurrPrice] = useState(null);
    const [currDay, setCurrDay] = useState(null);
    const [tradable, setTradable] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const API_KEY = 'MG0ID5XPDBCTO9FF';
        const api_call = 'https://www.alphavantage.co/query?' 
                        + 'function=' + func
                        + '&symbol=' + ticker
                        + (interval ? '&interval=' + interval : '')
                        + '&outputsize=' + outputsize
                        + '&apikey=' + API_KEY;

        fetch(api_call)
            .then(res => {
                if (!res.ok) {
                    throw Error('could not fetch the data for that resource');
                }
                return res.json();
            })
            .then(data => {
                if (data['Error Message'])
                    throw Error("Ticker '" + ticker + "' does not exist.");
                const newData = data[data_key];
                if (getPrice) {
                    const yesterdayMS = funcs.getDaysAgo(1);
                    const times = Object.keys(newData);
                    
                    let i = 0;
                    while (yesterdayMS - new Date(times[i]).getTime() < 0) {
                        i++;
                        if (i >= times.length) {
                            throw Error("Loop went wrong.");
                        }
                    }
                    setCurrDay(times[i]);
                    setCurrPrice(newData[times[i]]['4. close']);
                    setTradable((yesterdayMS - (10 * 60 * 1000)) - new Date(times[i]).getTime() <= 0);
                    //setTradable(new Date("2/21/2023 7:59:00 PM") - new Date(times[0]).getTime() < 0);
                    //setTradable(new Date("2/21/2023 8:01:00 PM") - new Date(times[0]).getTime() < 0);

                } else {
                    setData(newData);
                }
                
                setIsPending(false);
                setError(null);
            })
            .catch(err => {
                setIsPending(false);
                setError(err.message);
                console.log(err);
            });

    }, [ticker, getPrice, func, interval, outputsize, data_key]);

    return { data, currPrice, currDay, tradable, isPending, error };
}
 
export default useFetchStock;