import TradesTable from '../TradesTable';
import useFetchUserData from '../useFetchUserData';
const funcs = require('../StaticFunctions');

const BotsPage = () => {
    const { userData, portVal, isPending, error } = useFetchUserData("randotron");
    
    return (
        <div className="stats">
            { error && <div>{ error }</div>}
            { isPending && <div>Loading...</div>}
            { userData && portVal !== null && 
            <div>
                <h1>Randotron Stats</h1>
                <b>{"Total Value: " + funcs.formatPrice(userData.cash + portVal)}</b><br />
                <b>{"Net Profit: " + funcs.formatPrice(userData.cash + portVal - 10000.00)}</b>
                <h3>History</h3>
                <TradesTable tradesData={userData.trades} />
            </div>}
        </div>
    );
}
 
export default BotsPage;