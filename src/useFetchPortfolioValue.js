import { useEffect, useState } from 'react';
import axios from './api/axios';
import useFetchUserData from './useFetchUserData';

const useFetchPortfolioValue = (username) => {

    const { userData, error: userError } = useFetchUserData(username);

    const [portVal, setPortVal] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (userError) {
            setIsPending(false);
            setError(userError);
            return;
        }

        const fetchValue = async () => {
            let pval = 0;
            Object.keys(userData.portfolio).forEach(async (ticker) => {
                const shares = userData.portfolio[ticker];
                const response = await axios.get('/price/' + ticker);
                console.log(response);
                pval += shares * response.data.currPrice;
            });
            console.log(pval);
            return pval;
        }
 
        if (userData) {
            fetchValue()
                .then(result => {
                    setPortVal(result);
                    setIsPending(false);
                })
                .catch(err => {
                    setIsPending(false);
                    setError(err.message);
                    console.log(err);
                });
        }
    }, [userData, userError]);

    return ({ userData, portVal, isPending, error });
}
 
export default useFetchPortfolioValue;