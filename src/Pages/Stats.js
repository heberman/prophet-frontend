import React, { useState } from 'react';
import PortfolioValue from '../PortfolioValue';
import TradesTable from '../TradesTable';
import useFetchUserData from '../useFetchUserData';
const funcs = require('../StaticFunctions');

const Stats = (props) => {
    const username = props.user.user;

    const { userData, isPending, error } = useFetchUserData(username);

    const [portfolioValue, setPortfolioValue] = useState(0);

    return (
        <div className="stats">
            { error && <div>{ error }</div>}
            { isPending && <div>Loading...</div>}
            { userData && <div>
                <PortfolioValue portfolioData={userData.portfolio} setPortfolioValue={setPortfolioValue}/>
                <h2>{"Total Value: " + funcs.formatPrice(userData.cash + portfolioValue)}</h2>
                <h2>{"Net Profit: " + funcs.formatPrice(userData.cash + portfolioValue - 1000.0)}</h2>
                <h3>History</h3>
                <TradesTable tradesData={userData.trades} /> </div>}
        </div>
    );
}
 
export default Stats;