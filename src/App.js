import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Pages/Home';
import Search from './Pages/Search';
import ErrorPage from './Pages/ErrorPage';
import Stats from './Pages/Stats';
import StockPage from './Pages/StockPage';
import LoginHandler from './LoginHandler';
import BotsPage from './Pages/BotsPage';

//alpha vantage api key:MG0ID5XPDBCTO9FF

function App() {

  const [user, setUser] = useState(null);

  return (
    <div className="App">
        {user == null ? (<LoginHandler setUser={setUser}/>) : (
            <div>
              <Router>
                <Navbar setUser={setUser} />
                <div className="content">
                  <Routes>
                    <Route path="/" element={ <Home user={user} /> } />
                    <Route path="/search" element={ <Search /> } />
                    <Route path="/stats" element={ <Stats user={user}/> } />
                    <Route path="/bots" element={ <BotsPage /> } />
                    <Route path="/stock/:ticker" element={ <StockPage user={user}/>}/>
                    <Route path="*" element={<ErrorPage />} />
                  </Routes>
                </div>
              </Router>
            </div>
        )}
    </div>
  );
}

export default App;
