import { useState } from 'react';
import { Link } from 'react-router-dom';
import { convertShares, formatPrice } from './StaticFunctions';

const TradesTable = (props) => {

    const [numTrades, setNumTrades] = useState(10);

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

        const rows = props.tradesData.slice(0, numTrades).map((trade, index) => {
            return (
                <tr key={index}>
                    <td className="stock-link"><Link to={'/stock/' + trade.ticker}>{trade.ticker}</Link></td>
                    <td>{convertShares(trade.numShares)}</td>
                    <td>{formatPrice(trade.price)}</td>
                    <td>{new Date(trade.date).toLocaleString()}</td>
                </tr>
            );
        });

        return (
            <tbody>{rows}</tbody>
        );
    }

    const handleShowMore = () => {
        setNumTrades(numTrades + 10);
    };
    
    const ShowMoreButton = () => {
        return (
            <div>
                {numTrades < props.tradesData.length ? (
                    <button className='normal-button' onClick={handleShowMore}>Show More</button>
                ) : null}
            </div>);
    };

    return (
        <div>
            { (Object.keys(props.tradesData).length === 0) ? <b>No trades made.</b> :
            <div>
            <table>
                <TableHeader />
                <TableBody />
            </table>
            <ShowMoreButton />
            </div>}
        </div>
    );
}
 
export default TradesTable;