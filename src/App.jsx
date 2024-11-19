import React, { useState, useEffect } from "react";

const App = () => {
  const [stockPrice, setStockPrice] = useState(null);
  const [stockSymbol, setStockSymbol] = useState(''); 

  useEffect(() => { //useEffect is triggered first on load 
    fetch(`https://financialmodelingprep.com/api/v3/search?query=Tesla&limit=10&apikey=tK2nptCqhHn1nzSH6gVvvj2orgAIqUCH`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) { //if there is data to obtain 
          setStockPrice(data[0].price);  //update the stockPrice 
        } else {
          setStockPrice(null); 
        }
      })
      .catch((error) => console.error("unable to grab stock price", error)); //error message
  }, [stockSymbol])

  return (
    <>
      <h2>Stock Price Checker</h2>
      <input
        type="text"
        value={stockSymbol}
        onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
        placeholder="Search for a stock"
      />
      {stockPrice !== null ? ( //while we're waiting for the fetch, if its still null, loading stock price
        <p>Current Price: ${stockPrice}</p>
      ) : (
        <p>Processing</p>
      )}
    </>
  )
}

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

