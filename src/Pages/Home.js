import PortfolioTable from "../PortfolioTable";
import useFetchUserData from "../useFetchUserData";
const funcs = require('../StaticFunctions');

const Home = (props) => {

    const username = props.user.user;
    const { userData, portVal, isPending, error } = useFetchUserData(username);

    return (
        <div className="home">
            <h2>Portfolio</h2>
            { error && <div>{ error }</div>}
            { isPending && <div>Loading...</div>}
            { userData && portVal &&
            <div>
                <p>
                    <b>{"Spendable Cash: " + funcs.formatPrice(userData.cash)}</b><br/>
                    <b>{"Portfolio Value: " + funcs.formatPrice(portVal)}</b>
                </p>
                <PortfolioTable username={username} portfolioData={userData.portfolio} /> 
            </div>}
        </div>
    );
}
 
export default Home;