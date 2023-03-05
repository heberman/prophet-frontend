import { useEffect, useState } from 'react';

const useFetchCompany = (ticker) => {

    const [companyName, setCompanyName] = useState(ticker);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const API_KEY = 'MG0ID5XPDBCTO9FF';
        const api_call = 'https://www.alphavantage.co/query?' 
                        + 'function=OVERVIEW'
                        + '&symbol=' + ticker
                        + '&apikey=' + API_KEY;

        fetch(api_call)
            .then(res => {
                if (!res.ok) {
                    throw Error('could not fetch the data for that resource');
                }
                return res.json();
            })
            .then(data => {
                if (Object.keys(data).length > 0) {
                    if (data['Error Message'])
                        throw Error("Ticker '" + ticker + "' does not exist.");
                    setCompanyName(data['Name']);
                    setIsPending(false);
                    setError(null);
                }
            })
            .catch(err => {
                setIsPending(false);
                setError(err.message);
                console.log(err);
            });

    }, [ticker]);

    return { companyName, isPending, error };
}
 
export default useFetchCompany;