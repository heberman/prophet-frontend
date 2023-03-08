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
                <h2>{"Total Value: " + funcs.formatPrice(userData.cash + portVal)}</h2>
                <h2>{"Net Profit: " + funcs.formatPrice(userData.cash + portVal - 1000.0)}</h2>
                <h3>History</h3>
                <TradesTable tradesData={userData.trades} />
            </div>}
        </div>
    );
}
 
export default BotsPage;