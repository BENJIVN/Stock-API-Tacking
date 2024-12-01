import React, { useState, useEffect } from "react";
import Header from "./header/header.jsx";

const App = () => {
  const [stockList, setStockList] = useState([]); 
  const [selectedStock, setSelectedStock] = useState(null); 
  const [fullQuote, setFullQuote] = useState(null); 

  useEffect(() => {
    fetch(
      `https://financialmodelingprep.com/api/v3/stock/list?apikey=tK2nptCqhHn1nzSH6gVvvj2orgAIqUCH`
    )
      .then((response) => response.json())
      .then((data) => {
        setStockList(data.slice(0, 100)); 
      })
      .catch((error) =>
        console.error("Unable to fetch stock list:", error)
      );
  }, []);

  const fetchFullQuote = (symbol) => {
    fetch(
      `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=tK2nptCqhHn1nzSH6gVvvj2orgAIqUCH`
    )
      .then((response) => response.json())
      .then((data) => {
        setFullQuote(data[0]); 
      })
      .catch((error) => console.error("Unable to fetch full quote:", error));
  };

  // Handle dropdown selection
  const handleStockSelection = (symbol) => {
    const stock = stockList.find((s) => s.symbol === symbol);
    setSelectedStock(stock); 
    if (stock) fetchFullQuote(symbol); 
  };

  return (
    <>
    <Header />
      <div>
        <label htmlFor="stock">Select a Stock from the dropdown menu:</label>
        <select
          id="stock"
          onChange={(e) => handleStockSelection(e.target.value)}
        >
          <option value="">Select a stock</option>
          {stockList.map((stock) => (
            <option key={stock.symbol} value={stock.symbol}>
              {stock.symbol} - {stock.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        {selectedStock ? (
          <div>
            <h3>Selected Stock Details</h3>
            <p><strong>Name:</strong> {selectedStock.name}</p>
            <p><strong>Symbol:</strong> {selectedStock.symbol}</p>
            <p><strong>Exchange:</strong> {selectedStock.exchange}</p>
          </div>
        ) : (
          <p>Select a stock to see its details.</p>
        )}
      </div>
      <div>
        {fullQuote ? (
          <div>
            <h3>Full Quote Details</h3>
            <p><strong>Price:</strong> {fullQuote.price}</p>
            <p><strong>Change in Percentage</strong> {fullQuote.changesPercentage}</p>
            <p><strong>Day Low:</strong> {fullQuote.dayLow}</p>
            <p><strong>Day High:</strong> {fullQuote.dayHigh}</p>
            <p><strong>Year Low:</strong> {fullQuote.yearLow}</p>
            <p><strong>Year High:</strong> {fullQuote.yearHigh}</p>
            <p><strong>Previous Close:</strong> {fullQuote.previousClose}</p>
            <p><strong>Open:</strong> {fullQuote.open}</p>
          </div>
        ) : (
          selectedStock && <p>Loading full quote details...</p>
        )}
      </div>
    </>
  );
};

export default App;
