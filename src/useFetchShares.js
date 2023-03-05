import { useEffect, useState } from "react";
import axios from './api/axios';

const useFetchShares = (username, ticker) => {
    const [shares, setShares] = useState(0);

    const incrementShares = (num_shares) => {
        setShares(shares + num_shares);
    };

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const response = await axios.get('/user/' + username);
                return response.data.portfolio;
            }
            catch (error){
                console.log(error);
                return false;
            }
        }

        fetchAll().then( result => {
            if (result) {
                if (result[ticker])
                    setShares(result[ticker]);
                else
                    setShares(0);
            }
        });
    }, [username, ticker]);

    return { shares, incrementShares };
}

export default useFetchShares;