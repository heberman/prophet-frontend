import TradesTable from '../TradesTable';
import useFetchUserData from '../useFetchUserData';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { formatPrice, formatValueData } from '../StaticFunctions';

const BotsPage = () => {
    const { userData, portVal, isPending, error } = useFetchUserData("randotron");
    
    return (
        <div className="stats">
            { error && <div>{ error }</div>}
            { isPending && <div>Loading...</div>}
            { userData && portVal !== null && 
            <div>
                <h1>Randotron Stats</h1>
                <b>{"Total Value: " + formatPrice(userData.cash + portVal)}</b><br />
                <b>{"Net Profit: " + formatPrice(userData.cash + portVal - 10000.00)}</b>
                <LineChart width={730} height={320} data={formatValueData(userData.valueData)} 
                    margin={{ top: 0, right: 20, left: 0, bottom: 5 }}>
                    <XAxis tickMargin={10} minTickGap={30} dataKey="time"/>
                    <YAxis tick={false} type="number" domain={([dataMin, dataMax]) => {
                        const x = (dataMax - dataMin) * 0.1;
                        return [dataMin - x, dataMax + x];
                    }} />
                    <Tooltip />
                    <Line type="linear" dot={false} dataKey="Value" stroke="#8884d8" animationDuration={1200}/>
                </LineChart>
                <h3>History</h3>
                <TradesTable tradesData={userData.trades} />
            </div>}
        </div>
    );
}
 
export default BotsPage;