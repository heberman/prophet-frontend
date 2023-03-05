import { useEffect, useRef } from "react";
import useFetchStock from "./useFetchStock";
const funcs = require('./StaticFunctions');

const StockPrice = (props) => {
    const ticker = props.ticker;
    const setTickerPrice = props.setTickerPrice;
    const { currPrice } = useFetchStock(ticker, true);
    const priceRef = useRef(0);

    useEffect(() => {
        if (priceRef.current > 0)
            setTickerPrice({ ticker, price: priceRef.current });
    }, [setTickerPrice, ticker, currPrice]);

    const updateMap = () => {
        if (currPrice) {
            if (props.setTickerPrice) {
                priceRef.current = currPrice;
                return "";
            }
            return funcs.formatPrice(currPrice);
        }
        return "Loading...";
    }

    return (<div>{updateMap()}</div>);
}
 
export default StockPrice;