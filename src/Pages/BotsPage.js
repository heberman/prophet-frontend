import TradesTable from '../TradesTable';
import useFetchUserData from '../useFetchUserData';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { formatPrice, formatValueData, getStatData } from '../StaticFunctions';
import { useState } from 'react';

const BotsPage = () => {
    const [dataState, setDataState] = useState(0);
    const [algState, setAlgState] = useState(0);

    const { userData: prophData, portVal: prophPortVal, isPending: prophPending, error: prophError } = useFetchUserData("prophetron");
    const { userData: randoData, portVal: randoPortVal, isPending: randoPending, error: randoError } = useFetchUserData("randotron");

    const handleSelectChange = (event) => {
        setAlgState(parseInt(event.target.value));
    };
    
    return (
        <div className="stats">
            <select value={algState} onChange={handleSelectChange}>
                <option value="0">Prophetron</option>
                <option value="1">Randotron</option>
            </select>
            { algState == 0 && prophError && <div>{ prophError }</div>}
            { algState == 1 && randoError && <div>{ randoError }</div>}
            { algState == 0 && prophPending && <div>Loading...</div>}
            { algState == 1 && randoPending && <div>Loading...</div>}
            { algState == 0 && prophData && prophPortVal !== null && 
            <div>
                <h1>Randotron Stats</h1>
                <b>{"Total Value: " + formatPrice(prophData.cash + prophPortVal)}</b><br />
                <b>{"Net Profit: " + formatPrice(prophData.cash + prophPortVal - 10000.00)}</b>
                <LineChart width={730} height={320} data={formatValueData(getStatData(prophData.valueData, dataState))} 
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
                <TradesTable tradesData={prophData.trades} />
            </div>}
            { algState == 1 && randoData && randoPortVal !== null && 
            <div>
                <h1>Randotron Stats</h1>
                <b>{"Total Value: " + formatPrice(randoData.cash + randoPortVal)}</b><br />
                <b>{"Net Profit: " + formatPrice(randoData.cash + randoPortVal - 10000.00)}</b>
                <LineChart width={730} height={320} data={formatValueData(getStatData(randoData.valueData, dataState))} 
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
                <TradesTable tradesData={randoData.trades} />
            </div>}
        </div>
    );
}
 
export default BotsPage;