import React from 'react';
import { Link } from 'react-router-dom';
const funcs = require('./StaticFunctions');

const TradesTable = (props) => {
    const TableHeader = () => {
        return (
            <thead>
            <tr>
                <th>Stock</th>
                <th>Shares</th>
                <th>Price</th>
                <th>Date</th>
            </tr>
            </thead>
        );
    }
    
    const TableBody = () => {

        const rows = props.tradesData.map((trade, index) => {
            return (
                <tr key={index}>
                    <td className="stock-link"><Link to={'/stock/' + trade.ticker}>{trade.ticker}</Link></td>
                    <td>{funcs.convertShares(trade.numShares)}</td>
                    <td>{funcs.formatPrice(trade.price)}</td>
                    <td>{new Date(trade.date).toLocaleString()}</td>
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
            { (Object.keys(props.tradesData).length === 0) ? <b>No trades made.</b> :
            <table>
                <TableHeader />
                <TableBody />
            </table>} 
        </div>
    );
}
 
export default TradesTable;