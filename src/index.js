import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from './api/axios';
const schedule = require('node-schedule');

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

schedule.scheduleJob('0 * * * *', task);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
