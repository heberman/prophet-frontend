import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import useFetchUserData from '../useFetchUserData';
import useFetchCompany from '../useFetchCompany';
import useFetchStockPrice from '../useFetchStockPrice';
import useFetchStockData from '../useFetchStockData';
import { convertShares, formatPrice, getDaysAgo } from '../StaticFunctions';

const StockPage = (props) => {
    let { ticker } = useParams();

    const username = props.user.user;

    const { userData, portfolio, updatePortfolio, cash, updateCash, trades, updateTrades, isPending: userPending, error: userError } = useFetchUserData(username);
    const { data: fiveMinuteData, isPending: stockIsPending, error: stockError } = 
        useFetchStockData(ticker, 'TIME_SERIES_INTRADAY', '5min', 'full', 'Time Series (5min)');
    const { data: thirtyMinuteData } = useFetchStockData(ticker, 'TIME_SERIES_INTRADAY', '30min', 'full', 'Time Series (30min)');
    const { data: dailyData } = useFetchStockData(ticker, 'TIME_SERIES_DAILY_ADJUSTED', null, 'full', 'Time Series (Daily)');
    const { currPrice, currDay, tradable, isPending: priceIsPending, error: priceError } = useFetchStockPrice(ticker);
    const { companyName } = useFetchCompany(ticker);

    const [sharesToBuy, setSharesToBuy] = useState("");
    const [sharesToSell, setSharesToSell] = useState("");
    const [dataState, setDataState] = useState(0);
    const [avgPrice, setAvgPrice] = useState("");

    useEffect(() => {
        if (trades && portfolio) {
            const filteredTrades = trades.filter(t => t.ticker === ticker && t.numShares > 0);
            console.log(portfolio[ticker]);
            //const sharesPurchased = filteredTrades.reduce((t1, t2) => t1.numShares + t2.numShares);
            const newAvgPrice = filteredTrades.reduce((total, t) => total + t.price * t.numShares, 0) / portfolio[ticker];
            console.log(newAvgPrice);
            setAvgPrice(formatPrice(newAvgPrice));
        }
    }, [ticker, trades, portfolio]);


    async function tradeShares(e, num_shares) {
        e.preventDefault();
        setSharesToBuy("");
        setSharesToSell("");
        if (num_shares === 0)
            return false;
        try {
            let newUser = userData;
            const trade = { ticker, numShares: num_shares, date: Date(), price: currPrice }
            newUser.trades = [trade, ...newUser.trades];
            if (newUser.portfolio[ticker]) {
                newUser.portfolio[ticker] += num_shares;
                if (newUser.portfolio[ticker] <= 0) {
                    delete newUser.portfolio[ticker];
                }
            } else {
                newUser.portfolio[ticker] = num_shares;
            }
            newUser.cash -= num_shares * currPrice;
            const response = await axios.put('/user/' + userData.user, newUser);
            updatePortfolio(ticker, num_shares);
            updateTrades(newUser.trades);
            updateCash(newUser.cash);
            return response;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    };

    const getChartData = (chart_index) => {
        if (chart_index === 1) {
            return getOtherChartData(thirtyMinuteData, getDaysAgo(8));
        } else if (chart_index === 2) {
            return getOtherChartData(thirtyMinuteData, getDaysAgo(31));
        } else if (chart_index === 3) {
            return getOtherChartData(dailyData, getDaysAgo(91), 'day');
        } else if (chart_index === 4) {
            return getOtherChartData(dailyData, getDaysAgo(366), 'day');
        }
        return getDailyChartData();
    }

    const getDailyChartData = () => {
        let i = 0;
        let dailyChartData = [];
        const times = Object.keys(fiveMinuteData);

        while (times[i].split(" ")[0] !== currDay.split(" ")[0])
            i++;

        while (times[i].split(" ")[0] === currDay.split(" ")[0]) {
            if (new Date(currDay).getTime() - new Date(times[i]).getTime() > 0) {
                const entry = {
                    time: new Date(times[i]).toLocaleTimeString(),
                    Value: Number((Math.round(fiveMinuteData[times[i]]['4. close'] * 100) / 100).toFixed(2))
                }
                dailyChartData = [entry, ...dailyChartData];
            }
            i += 1;
        }
        return dailyChartData;
    }

    const getOtherChartData = (currChartData, timeBound, keyFormat='full') => {
        let i = 0;
        let otherChartData = [];
        const times = Object.keys(currChartData);

        while (new Date(times[i]).getTime() - timeBound > 0) {
            if (new Date(currDay).getTime() - new Date(times[i]).getTime() > 0) {
                let keyStr = new Date(times[i]).toLocaleString();
                if (keyFormat === 'day')
                    keyStr = new Date(times[i]).toLocaleDateString();
                const entry = {
                    time: keyStr,
                    Value: Number((Math.round(currChartData[times[i]]['4. close'] * 100) / 100).toFixed(2))
                }
                otherChartData = [entry, ...otherChartData];
            }
            i += 1;
        }
        return otherChartData;
    }

    const testInput = (e) => {
        const re = /^[0-9\b]+$/;
    
        if (e.target.value === '' || re.test(e.target.value)) {
            return e.target.value;
        }
        return '';
    };

    return (
        <div className='stock'>
            { (stockError) && <h1>{ stockError }</h1> }
            { (priceError) && <h1>{ priceError }</h1> }
            { (userError) && <h1>{ userError }</h1> }
            { (stockIsPending || priceIsPending || userPending) && <div>Loading...</div>}
            { userData && fiveMinuteData && currPrice && currDay && companyName &&
            <div>
                <div>
                    <h1>{ companyName + " - " + formatPrice(currPrice)}</h1>
                    <div className='stock_content'>
                        <div className='sidebar'>
                            <h3><u>{"Trade " + ticker}</u></h3>
                            <p>
                                <b>{"Cash: " + formatPrice(cash)}</b><br/>
                                <b>{"Shares Owned: " + portfolio[ticker]}</b><br/>
                                <b>{"Tradable: " + tradable}</b>
                            </p>
                            <form onSubmit={(e) => tradeShares(e, parseInt(sharesToBuy))}>
                                <label htmlFor="buy_shares">Buy Shares:</label><br/>
                                <input
                                    type="text"
                                    id="buy_shares"
                                    autoComplete="off"
                                    onChange={(e) => setSharesToBuy(testInput(e))}
                                    value={sharesToBuy}
                                    required
                                /><br/>
                                <button 
                                    className="normal-button"
                                    type="submit"
                                    disabled={ !tradable || sharesToBuy === '' || userData.cash < (currPrice * parseInt(sharesToBuy)) }>
                                    Buy
                                </button>
                            </form>
                            <br />
                            <form onSubmit={(e) => tradeShares(e, -1 * parseInt(sharesToSell))}>
                                <label htmlFor="sell_shares">Sell Shares:</label><br/>
                                <input
                                    type="text"
                                    id="sell_shares"
                                    autoComplete="off"
                                    onChange={(e) => setSharesToSell(testInput(e))}
                                    value={sharesToSell}
                                    required
                                /><br/>
                                <button 
                                    className="normal-button"
                                    type="submit"
                                    disabled={ !tradable || sharesToSell === '' || portfolio[ticker] <= 0 || portfolio[ticker] < parseInt(sharesToSell) }>
                                    Sell
                                </button>
                            </form>
                        </div>
                        <div className='chart'>
                            <h4>{new Date(currDay.replaceAll("-", "/")).toLocaleString() + " ET"}</h4>
                            <LineChart width={730} height={320} data={getChartData(dataState)} 
                                margin={{ top: 0, right: 20, left: 0, bottom: 5 }}>
                                <XAxis tickMargin={10} minTickGap={30} dataKey="time"/>
                                <YAxis tick={false} type="number" domain={([dataMin, dataMax]) => {
                                    const x = (dataMax - dataMin) * 0.1;
                                    return [dataMin - x, dataMax + x];
                                }} />
                                <Tooltip />
                                <Line type="linear" dot={false} dataKey="Value" stroke="#8884d8" animationDuration={1200}/>
                            </LineChart>
                        </div>
                        <div>
                            <button className='normal-button' onClick={() => setDataState(0)}>1 Day</button>
                            <button className='normal-button' onClick={() => setDataState(1)}>7 Days</button>
                            <button className='normal-button' onClick={() => setDataState(2)}>30 Days</button>
                            <button className='normal-button' onClick={() => setDataState(3)}>90 Days</button>
                            <button className='normal-button' onClick={() => setDataState(4)}>1 Year</button>
                        </div>
                    </div>
                </div>
                {trades.filter(t => t.ticker === ticker).length > 0 && 
                <h3>{"Average Price: " + avgPrice}</h3>}
                <div className='ticker_history'>
                    <h3><u>{ticker + " History"}</u></h3>
                    {trades.filter(t => t.ticker === ticker).length === 0 ? <b>No trades made.</b> : 
                        <table>
                            <thead>
                                <tr>
                                    <th>Stock</th>
                                    <th>Shares</th>
                                    <th>Price</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trades.filter(t => t.ticker === ticker).map((trade, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{trade.ticker}</td>
                                            <td>{convertShares(trade.numShares)}</td>
                                            <td>{formatPrice(trade.price)}</td>
                                            <td>{new Date(trade.date).toLocaleString()}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    }
                </div>
            </div>}
        </div>
    );
}
 
export default StockPage;