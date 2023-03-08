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
 
        if (userData) {
            const fetchValue = async () => {
                let pval = 0;
                Object.keys(userData.portfolio).forEach(async (ticker) => {
                    const shares = userData.portfolio[ticker];
                    const response = await axios.get('/price/' + ticker);
                    pval += shares * response.data.currPrice;
                });
                return pval;
            }

            fetchValue()
                .then(result => {
                    setPortVal(result);
                    setIsPending(false);
                })
                .catch(err => {
                    setIsPending(false);
                    setError(err.message);
                    console.log(err);
                })
        }
    }, [userData, userError]);

    return ({ userData, portVal, isPending, error });
}
 
export default useFetchPortfolioValue;