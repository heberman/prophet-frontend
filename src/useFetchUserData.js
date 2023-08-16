import { useEffect, useState } from "react";
import axios from './api/axios';

const useFetchUserData = (username) => {
    const [userData, setUserData] = useState(null);
    const [portfolio, setPorfolio] = useState(null);
    const [priceMap, setPriceMap] = useState(null);
    const [portVal, setPortVal] = useState(null);
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

    const updatePortfolio = (ticker, shares) => {
        let newPortfolio = portfolio;
        if (newPortfolio[ticker])
            newPortfolio[ticker] += shares;
        else
            newPortfolio[ticker] = shares;
        setPorfolio(newPortfolio);
    }

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const response = await axios.get('/user/' + username);
                if (!response.data.foundUser) throw Error("Fetch user error.");
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
                setUserData(result.foundUser);
                setTrades(result.foundUser.trades);
                setCash(result.foundUser.cash);
                setPorfolio(result.foundUser.portfolio);
                setPortVal(result.portVal);
                setPriceMap(result.priceMap);
                setIsPending(false);
            }
        });
    }, [username]);

    return { userData, priceMap, portVal, portfolio, updatePortfolio, cash, updateCash, trades, updateTrades, isPending, error };
}
 
export default useFetchUserData;