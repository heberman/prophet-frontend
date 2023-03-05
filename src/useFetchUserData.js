import { useEffect, useState } from "react";
import axios from './api/axios';

const useFetchUserData = (username) => {
    const [userData, setUserData] = useState(null);
    const [trades, setTrades] = useState(null);
    const [cash, setCash] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    const updateTrades = (newTrades) => {
        setTrades(newTrades);
    }

    const updateCash = (newCash) => {
        setCash(newCash);
    }

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const response = await axios.get('/user/' + username);
                return response.data;
            }
            catch (error){
                console.log(error);
                setIsPending(false);
                setError(error.message);
                return false;
            }
        }

        fetchAll().then( result => {
            if (result) {
                setUserData(result);
                setTrades(result.trades);
                setCash(result.cash);
                setIsPending(false);
            }
        });
    }, [username]);

    return { userData, cash, updateCash, trades, updateTrades, isPending, error };
}
 
export default useFetchUserData;