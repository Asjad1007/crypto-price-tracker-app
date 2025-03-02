---
sidebar_position: 3
---

# API Integration Details

## API Used: CoinGecko

We fetch real-time cryptocurrency price data using CoinGecko's API.

## API Endpoint Used

- GET https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,cardano,polkadot&vs_currencies=usd

## Fetching Data in Web App (Next.js)

```js
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
    console.log(result);
    setData(result);
  } catch (err) {
    setError(err);
  } finally {
    setLoading(false);
  }
};
```

## Auto-Update Interval (Live Updates)

### To refresh data automatically every 30 seconds:

```js
useEffect(() => {
  fetchData(); // initial
  const interval = setInterval(fetchData, 30000); // auto-refresh
  return () => clearInterval(interval);
}, []);
```
