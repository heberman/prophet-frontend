import React, { useState } from 'react';
import StockPrice from './StockPrice';

const PortfolioValue = (props) => {

    const tickers = Object.keys(props.portfolioData);

    const [portfolioMap, setPortfolioMap] = useState(new Map());

    const setTickerPrice = ({ ticker, price }) => {
        let newPortfolioMap = portfolioMap;
        newPortfolioMap[ticker] = price;
        setPortfolioMap(newPortfolioMap);

        if (Object.keys(portfolioMap).length === tickers.length) {
            let newVal = 0.0;
            Object.keys(portfolioMap).forEach(t => 
                {newVal += (props.portfolioData[t] * parseFloat((Math.round(portfolioMap[t] * 100) / 100).toFixed(2)))});
            props.setPortfolioValue(newVal);
        }
    }

    const getValue = tickers.map((ticker, index) => {
        return (<li key={index}><StockPrice ticker={ticker} setTickerPrice={setTickerPrice} /></li>);
    });

    return (
        <div>
            <ul style={{display: 'none'}}>{getValue}</ul>
        </div>
    );
}
 
export default PortfolioValue;