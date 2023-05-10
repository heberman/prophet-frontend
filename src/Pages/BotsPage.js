import TradesTable from '../TradesTable';
import useFetchUserData from '../useFetchUserData';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { formatPrice, formatValueData, getStatData } from '../StaticFunctions';
import { useState } from 'react';

const BotsPage = () => {
    const [dataState, setDataState] = useState(0);

    const { userData, trades, portVal, isPending, error } = useFetchUserData("randotron");
    
    return (
        <div className="stats">
            { error && <div>{ error }</div>}
            { isPending && <div>Loading...</div>}
            { userData && portVal && trades !== null && 
            <div>
                <h1>Randotron Stats</h1>
                <b>{"Total Value: " + formatPrice(userData.cash + portVal)}</b><br />
                <b>{"Net Profit: " + formatPrice(userData.cash + portVal - 10000.00)}</b>
                <LineChart width={730} height={320} data={formatValueData(getStatData(trades, dataState))} 
                    margin={{ top: 0, right: 20, left: 0, bottom: 5 }}>
                    <XAxis tickMargin={10} minTickGap={30} dataKey="time"/>
                    <YAxis tick={false} type="number" domain={([dataMin, dataMax]) => {
                        const x = (dataMax - dataMin) * 0.1;
                        return [dataMin - x, dataMax + x];
                    }} />
                    <Tooltip />
                    <Line type="linear" dot={false} dataKey="Value" stroke="#8884d8" animationDuration={1200}/>
                </LineChart>
                <div>
                    <button className='normal-button' onClick={() => setDataState(0)}>1 Day</button>
                    <button className='normal-button' onClick={() => setDataState(1)}>7 Days</button>
                    <button className='normal-button' onClick={() => setDataState(2)}>30 Days</button>
                    <button className='normal-button' onClick={() => setDataState(3)}>90 Days</button>
                    <button className='normal-button' onClick={() => setDataState(4)}>1 Year</button>
                </div>
                <h3>History</h3>
                <TradesTable tradesData={userData.trades} />
            </div>}
        </div>
    );
}
 
export default BotsPage;