API Integration
===============

Fetching Crypto Prices
----------------------

We fetch live cryptocurrency prices from an external API using `fetch` inside React Query.

### API Endpoint

We use the following API to retrieve real-time cryptocurrency prices:

    GET https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd

### Example API Call
```js
const fetchCryptoPrices = async () => {
  const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");
  return response.json();
};

### Updating Data

*   The refresh button triggers a re-fetch of the data.
*   React Query automatically updates the cache when new data arrives.
*   Users always see the latest prices without manually refreshing.