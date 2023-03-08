import PortfolioTable from "../PortfolioTable";
import useFetchPortfolioValue from "../useFetchPortfolioValue";
const funcs = require('../StaticFunctions');

const Home = (props) => {

    const username = props.user.user;
    const { userData, portVal: portfolioValue, isPending, error } = useFetchPortfolioValue(username);

    return (
        <div className="home">
            <h2>Portfolio</h2>
            { error && <div>{ error }</div>}
            { isPending && <div>Loading...</div>}
            { userData && 
            <div>
                <p>
                    <b>{"Spendable Cash: " + funcs.formatPrice(userData.cash)}</b><br/>
                    <b>{"Portfolio Value: " + funcs.formatPrice(portfolioValue)}</b>
                </p>
                <PortfolioTable username={username} portfolioData={userData.portfolio} /> 
            </div>}
        </div>
    );
}
 
export default Home;