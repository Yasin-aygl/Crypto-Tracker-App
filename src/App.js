import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import "./index.css";

//COMPONENTS
import Coins from "./components/coins/Coins";
import Navbar from "./components/navbar/Navbar";
import Coin from "./routes/Coin";

function App() {
  const [coins, setCoins] = useState([]);
  const [input,setInput] = useState("")

const handleChange = (e) => {
  setInput(e.target.value)
}

  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setCoins(response.data);
        // console.log(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Coins coins={coins} handleChange={handleChange} input={input}/>} />
        <Route path="/coin" element={<Coin />}>
          <Route path=":coinId" element={<Coin />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;