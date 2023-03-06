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
import axios from './api/axios';
const cron = require('node-cron');

const task = async () => {
  try {
    var newUser = null;
    try {
      const user = "randotron"
      const pwd = "Berman#45"
      const response = await axios.post("/auth",
          JSON.stringify({ user, pwd }),
          {
              headers: { 'Content-Type': 'application/json' }
          }
      );
      newUser = response.data['foundUser'];
    } catch (err) {
        console.log(err.message);
    }
    newUser.cash -= 10.0;
    const response = await axios.put('/user/randotron', newUser);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

cron.schedule('0 * * * *', task);

//alpha vantage api key:MG0ID5XPDBCTO9FF

function App() {

  const [user, setUser] = useState(null);

  return (
    <div className="App">
        {user == null ? (<LoginHandler setUser={setUser}/>) : (
            <div>
              <Router>
                <Navbar />
                <div className="content">
                  <Routes>
                    <Route path="/" element={ <Home user={user} /> } />
                    <Route path="/search" element={ <Search /> } />
                    <Route path="/stats" element={ <Stats user={user}/> } />
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
