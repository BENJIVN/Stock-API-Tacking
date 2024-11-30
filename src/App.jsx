import React, { useState, useEffect } from "react";

const App = () => {
  const [stockPriceUSD, setStockPriceUSD] = useState(null); // Stock price in USD
  const [stockSymbol, setStockSymbol] = useState("");
  const [exchangeRate, setExchangeRate] = useState(1); // Default to 1 (USD to USD)
  const [currency, setCurrency] = useState("USD"); // Default to USD
  const [currencies, setCurrencies] = useState([]); // Holds all currency options
  const [fullQuote, setFullQuote] = useState(null); 

  // Fetch the stock price in USD whenever the stock symbol changes
  useEffect(() => {
    if (stockSymbol) {
      fetch(
        `https://financialmodelingprep.com/api/v3/quote/${stockSymbol}?apikey=tK2nptCqhHn1nzSH6gVvvj2orgAIqUCH`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data && data.length > 0) {
            setStockPriceUSD(data[0].price); // Set stock price in USD
          } else {
            setStockPriceUSD(null);
          }
        })
        .catch((error) =>
          console.error("Unable to fetch stock price:", error)
        );
    }
  }, [stockSymbol]);

  // Fetch the exchange rate whenever the selected currency changes
  useEffect(() => {
    fetch(
      `https://openexchangerates.org/api/latest.json?app_id=Y3ca224730bff4743b6a824fc62862764`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.rates) {
          setExchangeRate(data.rates[currency]); // Update the exchange rate for the selected currency
        } else {
          setExchangeRate(1); // Fallback to 1 if there's an issue
        }
      })
      .catch((error) =>
        console.error("Unable to fetch exchange rate:", error)
      );
  }, [currency]);

  // Fetch the list of currencies on component mount
  useEffect(() => {
    fetch(`https://openexchangerates.org/api/currencies.json`)
      .then((response) => response.json())
      .then((data) => {
        setCurrencies(Object.entries(data)); // Convert the object to an array of [code, name]
      })
      .catch((error) =>
        console.error("Unable to fetch currencies:", error)
      );
  }, []);

  // Calculate the stock price in the selected currency
  const stockPriceInCurrency =
    stockPriceUSD !== null ? (stockPriceUSD * exchangeRate).toFixed(2) : null;

    useEffect(() => {
      if (fullQuote) {
        fetch(
          `https://financialmodelingprep.com/api/v3/quote/AAPL?apikey=0TkE4OLaR7y4D935kMqMaPJioF26kGj3`
        )
          .then((response) => response.json())
          .then((data) => {
            if (data && data.length > 0) {
              setFullQuote(data[0].price); // Set stock price in USD
            } else {
              setFullQuote(null);
            }
          })
          .catch((error) =>
            console.error("Unable to fetch stock price:", error)
          );
      }
    }, [fullQuote]);
  
  return (
    <>
      <h2>Stock Price in Selected Currency</h2>
      <div>
        <input
          type="text"
          value={stockSymbol}
          onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
          placeholder="Enter stock symbol (e.g., AAPL)"
        />
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          {currencies.length > 0 ? (
            currencies.map(([code, name]) => (
              <option key={code} value={code}>
                {code} - {name}
              </option>
            ))
          ) : (
            <option>Loading currencies...</option>
          )}
        </select>
      </div>
      <div>
        {stockPriceUSD !== null ? (
          <p>
            Stock Price in {currency}:{" "}
            {stockPriceInCurrency} {currency}
          </p>
        ) : (
          <p>Processing...</p>
        )}
      </div>
    </>
  );
};

export default App;

/*import React, { useState, useEffect } from "react";

const App = () => {
  const [stockPrice, setStockPrice] = useState(null);
  const [stockSymbol, setStockSymbol] = useState("");
  const [exchangeRate, setExchangeRate] = useState(null);
  const [currency, setCurrency] = useState("USD"); // Default to USD
  const [currencies, setCurrencies] = useState([]); // Holds all currency option

  // Fetch the stock price whenever the stock symbol changes
  useEffect(() => {
    if (stockSymbol) {
      fetch(
        `https://financialmodelingprep.com/api/v3/search?query=${stockSymbol}&limit=10&apikey=tK2nptCqhHn1nzSH6gVvvj2orgAIqUCH`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data && data.length > 0) {
            setStockPrice(data[0].price);
          } else {
            setStockPrice(null);
          }
        })
        .catch((error) =>
          console.error("Unable to fetch stock price:", error)
        );
    }
  }, [stockSymbol]);

  // Fetch the stock price whenever the stock symbol changes
  useEffect(() => {
    if (stockSymbol) {
      fetch(
        `https://financialmodelingprep.com/api/v3/search?query=${stockSymbol}&limit=10&apikey=tK2nptCqhHn1nzSH6gVvvj2orgAIqUCH`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data && data.length > 0) {
            setStockPrice(data[0].price);
          } else {
            setStockPrice(null);
          }
        })
        .catch((error) =>
          console.error("Unable to fetch stock price:", error)
        );
    }
  }, [stockSymbol]);

  // Fetch the exchange rate whenever the selected currency changes
  useEffect(() => {
    fetch(
      `https://openexchangerates.org/api/latest.json?app_id=YOUR_API_KEY`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.rates) {
          setExchangeRate(data.rates[currency]); // Update the exchange rate for the selected currency
        } else {
          setExchangeRate(null);
        }
      })
      .catch((error) =>
        console.error("Unable to fetch exchange rate:", error)
      );
  }, [currency]);

  // Fetch the list of currencies on component mount
  useEffect(() => {
    fetch(`https://openexchangerates.org/api/currencies.json`)
      .then((response) => response.json())
      .then((data) => {
        setCurrencies(Object.entries(data)); // Convert the object to an array of [code, name]
      })
      .catch((error) =>
        console.error("Unable to fetch currencies:", error)
      );
  }, []);

  return (
    <>
      <h2>Stock Price and Exchange Rate Checker</h2>
      <div>
        <input
          type="text"
          value={stockSymbol}
          onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
          placeholder="Search for a stock"
        />
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          {currencies.length > 0 ? (
            currencies.map(([code, name]) => (
              <option key={code} value={code}>
                {code} - {name}
              </option>
            ))
          ) : (
            <option>Loading currencies...</option>
          )}
        </select>
      </div>
      <div>
        {stockPrice !== null ? (
          <p>Stock Price: ${stockPrice}</p>
        ) : (
          <p>Processing...</p>
        )}
        {exchangeRate !== null ? (
          <p>Exchange Rate (1 USD to {currency}): {exchangeRate}</p>
        ) : (
          <p>Processing...</p>
        )}
      </div>
    </>
  );
};

export default App;


//   const[weather, setWeather] = useState(null)

//   useEffect(() => {
//     fetch("https://api.open-meteo.com/v1/forecast?latitude=40.486217&longitude=-74.451820&current=temperature_2m,wind_speed_10m")
//       .then((response) => response.json())
//       .then((data) => setWeather(data.current))
//       .catch((error) => console.error("Error weather data: ", error))
//   }, [])

//   return (
//     <>
//       <h2>Current Weather</h2>
//       { weather ? (
//         <div>
//           <p>Temperature: {weather.temperature_2m}</p>
//           <p>Wind Speed: {weather.wind_speed_10m}</p>
//         </div>
//       ) : (
//         <p>Loading weather data...</p>
//       )}
//     </>
//   )
// }

  //const [count, setCount] = useState(0)
  // return (
  //   <>
  //     <div>
  //       <a href="https://vite.dev" target="_blank">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div>
  //     <h1>Vite + React</h1>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {count}
  //       </button>
  //       <p>
  //         Edit <code>src/App.jsx</code> and save to test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p>
  //   </>
  // )
  8/
  */

