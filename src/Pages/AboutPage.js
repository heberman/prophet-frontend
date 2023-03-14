import React from 'react';

const AboutPage = () => {
    return (
        <div>
            <h2>About Prophet</h2>
            <p>
                Welcome to Prohpet! Prophet is a simulated stock trading environment that allows users trade stocks based on real data using a virtual currency. Due to the difficulty of accessing real-time data, all functionality is based on the US stock market status exactly 24 hours prior. Therefore, instead of the trading days being Monday through Friday like in reality, Prophet's trading days are Tuesday through Saturday to allow for functional portfolio management without relying on live data. Users are given $10,000 to virtually buy and sell shares of real stocks, then view their trading progress and history. Users may view Prophet as a tool to practice their day and/or long-term trading skills without risking real money, or simply a game in which they attempt to gain the highest amount of profit possible.
            </p>
            <p>
                Another integral aspect of Prophet is the predictive models in the background working to maximize their own profit through stock trading within the same conditions as the user. All activity of the models is visualized on the Trading Bots page which allows users to learn from and compete with algorithms that work to optimize stock trading. As of now, the only trading bot that is up and running is Randotron, which acts as a control by trading random stocks one share at a time. This should help users and other models compare their trading skills against an algorithm that simulates blindly choosing stocks and the times to trade them. As most of us are aware, the stock market can be very volitile and unpredictable, meaing users and alogrithms can make all the "right" decisions, yet still trade for losses. The goal for these models is to simply perform better on average over the long term than the control, which can never be guaranteed.
            </p>
            <p>
                Prophet was created and is managed by me, Henry Berman, a senior Computer Science student at Cal Poly San Luis Obispo for my senior project. I was inspired by the growing popularity of using predictive models and AI to optimize tasks that have long been only possible for humans. While I would like to translate an success of these models to the real stock market, I wanted to create a virtual environment to study the decisions made by the models while not risking any real money, and allow myself and others to compare the trading abilites of humans to those of artificial intelligence.
            </p>
        </div>
    );
}
 
export default AboutPage;