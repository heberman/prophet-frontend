import PortfolioTable from "../PortfolioTable";
import PortfolioValue from "../PortfolioValue";
import useFetchUserData from "../useFetchUserData";
import React, { useState } from 'react';
const funcs = require('../StaticFunctions');

const Home = (props) => {

    const username = props.user.user;
    const { userData, isPending, error } = useFetchUserData(username);
    const [portfolioValue, setPortfolioValue] = useState(0);

    return (
        <div className="home">
            <h2>Portfolio</h2>
            { error && <div>{ error }</div>}
            { isPending && <div>Loading...</div>}
            { userData && 
            <div>
                <p>
                    <b>{"Spendable Cash: " + funcs.formatPrice(userData.cash)}</b><br/>
                    <b>{"Portfolio Value: " + funcs.formatPrice(portfolioValue)}</b>
                </p>
                <PortfolioValue portfolioData={userData.portfolio} setPortfolioValue={setPortfolioValue}/>
                <PortfolioTable username={username} portfolioData={userData.portfolio} /> 
            </div>}
        </div>
    );
}
 
export default Home;