"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import IconMap from "@/components/IconMap.js";

export default function Home() {
  const [data, setData] = useState({
    bitcoin: { usd: 0 },
    ethereum: { usd: 0 },
    ripple: { usd: 0 },
    cardano: { usd: 0 },
    polkadot: { usd: 0 },
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const icons = IconMap();
  console.log(icons);


  // Fetch function
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,cardano,polkadot&vs_currencies=usd"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      console.log(result)
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch + auto-update every 30s
  useEffect(() => {
    fetchData(); // initial
    const interval = setInterval(fetchData, 30000); // auto-refresh
    return () => clearInterval(interval);
  }, []);

  // Filter coins based on searchTerm
  const filteredCoins = Object.keys(data).filter((coin) =>
    coin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Loading & error states
  if (loading) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-50 to-pink-50">
        <h1 className="text-3xl font-bold text-blue-600 animate-pulse">
          Loading...
        </h1>
      </main>
    );
  }


  return (
    <main className="flex flex-col items-center justify-start min-h-screen w-full bg-gradient-to-r from-purple-50 to-pink-50 py-10 px-4">
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Crypto Prices
      </h1>
      <p className="text-gray-600 mt-2">Auto-updates every 30 seconds</p>

      {/* Search & Refresh Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-2 mt-6 w-full max-w-xl">
        <input
          type="text"
          placeholder="Search for a coin..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-black-600 sm:w-auto flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent "
        />
        <button
          onClick={fetchData}
          className="px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-indigo-500 rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Refresh
        </button>
      </div>
      {/* // if error comes display items */}
      {error && (
        // <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-50 to-pink-50">
        <h3 className="text-3xl font-bold text-red-600 animate-pulse mt-8 mb-8">
          Error: {error.message} - API Rate Limit Resulting in Default Values
        </h3>
        // </div>
      )}

      {/* Coins Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-8">
        {filteredCoins.map((coin) => (
          <div
            key={coin}
            className="flex flex-col items-center justify-center bg-white rounded-lg 
                   shadow hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1 px-12 py-6"
          >
            <Image
              src={icons[coin]}
              alt={coin}
              width={100}
              height={100}
              className="mb-2"
            />

            {/* Coin Name */}
            <h2 className="text-xl font-semibold mt-2 capitalize text-gray-800">
              {coin}
            </h2>

            {/* Price */}
            <p className="text-lg font-medium text-gray-600 mt-1 animate-pulse" >
              ${data[coin].usd}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
