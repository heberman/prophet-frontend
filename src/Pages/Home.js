import PortfolioTable from "../PortfolioTable";
import useFetchUserData from "../useFetchUserData";
import { formatPrice } from "../StaticFunctions";

const Home = (props) => {

    const username = props.user.user;
    const { userData, priceMap, portVal, isPending, error } = useFetchUserData(username);

    return (
        <div className="home">
            <h2>Portfolio</h2>
            { error && <div>{ error }</div>}
            { isPending && <div>Loading...</div>}
            { userData && portVal !== null &&
            <div>
                <p>
                    <b>{"Spendable Cash: " + formatPrice(userData.cash)}</b><br/>
                    <b>{"Portfolio Value: " + formatPrice(portVal)}</b>
                </p>
                <PortfolioTable username={username} portfolioData={userData.portfolio} priceMap={priceMap} /> 
            </div>}
        </div>
    );
}
 
export default Home;