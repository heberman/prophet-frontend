import { Link } from 'react-router-dom';

const Navbar = (props) => {
    return (
        <nav className="navbar">
            <div className="logo">
                <h1><Link to="/">Prophet</Link></h1>
            </div>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/search">Search</Link>
                <Link to="/stats">Stats</Link>
                <Link to="/bots">Trading Bots</Link>
                <Link onClick={() => props.setUser(null)} to="/">Logout</Link>
            </div>
        </nav>
    );
}
 
export default Navbar;