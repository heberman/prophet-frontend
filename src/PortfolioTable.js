import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from './StaticFunctions';
const PortfolioTable = (props) => {
   
    const TableBody = () => {
        const tickers = Object.keys(props.portfolioData);
        const priceMap = props.priceMap;

        const rows = tickers.map((ticker, index) => {
            return (
                <tr key={index}>
                    <td className="stock-link"><Link to={'/stock/' + ticker}>{ticker}</Link></td>
                    <td>{props.portfolioData[ticker] + " shares"}</td>
                    <td>{formatPrice(priceMap[ticker])}</td>
                </tr>
            );
        });

        return (
            <tbody>
            {rows}
            </tbody>
        );
    }

    return (
        <div>
            { (Object.keys(props.portfolioData).length === 0) ? <b>Portfolio is empty.</b> :
            <table>
                <thead>
                <tr>
                    <th>Stock</th>
                    <th>Shares Owned</th>
                    <th>Current Price</th>
                </tr>
                </thead>
                <TableBody />
            </table>}
        </div>
    );
}
 
export default PortfolioTable;