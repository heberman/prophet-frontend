import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Papa from "papaparse";
import listed_tickers from "../api/listing_status.csv"

const Search = () => {
    
    const [query, setQuery] = useState("");
    const [matches, setMatches] = useState([]);
    const [validTickers, setValidTickers] = useState([]);

    let navigate = useNavigate();

    useEffect(() => {
        Papa.parse(listed_tickers, {
            download: true,
            complete: (results) => {
                setValidTickers(results.data.map(r => r[0]).slice(1));
            }
        });
    }, [])

    useEffect(() => {
        if (query === "") {
            setMatches([]);
            return;
        }
        const API_KEY = 'MG0ID5XPDBCTO9FF';
        const api_call = 'https://www.alphavantage.co/query?' 
                        + 'function=SYMBOL_SEARCH'
                        + '&keywords=' + query
                        + '&apikey=' + API_KEY;

        fetch(api_call)
            .then(res => {
                if (!res.ok) {
                    throw Error('could not fetch the data for that resource');
                }
                return res.json();
            })
            .then(data => {
                setMatches(data['bestMatches'].filter(m => validTickers.includes(m['1. symbol'])));
            })
            .catch(err => {
                console.log(err);
            });
    }, [query, validTickers])

    function handleChange(event) {
        const { value } = event.target;
        setQuery(value);
    }

    function submitForm(e) {
        e.preventDefault();
        setQuery("");
        navigate("/stock/" + query.toUpperCase());
    }

    return (
        <div className="search">
            <h2>Search</h2>
            <form onSubmit={submitForm}>
                <input
                    type="text"
                    name="search"
                    id="search"
                    className="normal-input"
                    autoComplete="off"
                    value={query.val}
                    onChange={handleChange}/>
                <button type="submit" className="normal-button">Search Ticker</button>
            </form>
            {matches && matches.length > 0 && 
                <table>
                    <thead>
                        <tr>
                            <th>Ticker</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {matches.map((match, index) => {
                            return (
                                <tr key={index}>
                                    <td className="stock-link"><Link to={'/stock/' + match['1. symbol']}>{match['1. symbol']}</Link></td>
                                    <td>{match['2. name']}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>}
        </div>
    );
}
 
export default Search;