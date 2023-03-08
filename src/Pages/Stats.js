//import PortfolioValue from '../PortfolioValue';
import TradesTable from '../TradesTable';
import useFetchPortfolioValue from '../useFetchPortfolioValue';
const funcs = require('../StaticFunctions');

const Stats = (props) => {
    const username = props.user.user;

    const { userData, poertVal: portfolioValue, isPending, error } = useFetchPortfolioValue(username);

    //<PortfolioValue portfolioData={userData.portfolio} setPortfolioValue={setPortfolioValue}/>
    
    return (
        <div className="stats">
            { error && <div>{ error }</div>}
            { isPending && <div>Loading...</div>}
            { userData && portfolioValue && <div>
                <h2>{"Total Value: " + funcs.formatPrice(userData.cash + portfolioValue)}</h2>
                <h2>{"Net Profit: " + funcs.formatPrice(userData.cash + portfolioValue - 1000.0)}</h2>
                <h3>History</h3>
                <TradesTable tradesData={userData.trades} /> </div>}
        </div>
    );
}
 
export default Stats;