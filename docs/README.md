---
sidebar_position: 2
---

# Project Setup Guide

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn
- Git

## Clone the Repository

```
    git clone https://github.com/Asjad1007/crypto-price-tracker-app.git

    cd crypto_price_tracker
```

## Install Dependencies

```
    npm install
```

    or

```
    yarn install
```

## Running the Web App

```
    npm run dev
```

or

```
    yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Running the Mobile App

Currently, our project does not include a mobile-specific application. However, the web app is fully responsive and works seamlessly on mobile devices.




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


---
sidebar_position: 4
---

# State Management Documentation

## Overview

This app uses React's built-in hooks (useState, useEffect) for state management. It’s simple and lightweight, perfect for small apps like this. However, for larger apps, consider these alternatives:

# 1. React Query

Use Case: Fetching and caching data.

Why? Handles loading, error states, and auto-refreshing with less code.

Example:

```js
const { data, isLoading, error } = useQuery("cryptoPrices", fetchData, {
  refetchInterval: 30000,
});
```

# 2. Zustand

Use Case: Global state management.

Why? Lightweight and centralized state for larger apps.

Example:

```js
const useStore = create((set) => ({
  data: {},
  setData: (newData) => set({ data: newData }),
}));
```

# 3. Context API

Use Case: Sharing state across components.

Why? Built into React, no extra dependencies, great for medium-sized apps.

## Why Not Use Them Here?

- Simplicity: Built-in hooks are enough for this small app.
- No Complexity: No need for global state or advanced caching.



---
sidebar_position: 5
---

# Challenges & Solutions

## 1. API Rate Limits

**Challenge:** CoinGecko API has rate limits that could block frequent requests.

**Solution:** Used React Query with caching and refetchInterval instead of polling.

## 2. UI Freezing on API Call

**Challenge:** Fetching large data caused UI lag.

**Solution:** Added a loading state and displayed a "Loading..." message.

```html
if (loading) return
<p>Loading...</p>
;
```

## 3. Mobile Compatibility

**Challenge:** Mobile UI was breaking on small screens.

**Solution:** Used Tailwind's responsive utilities:

```html
<div
  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
></div>
```

## 4. Persistent State on Refresh

**Challenge:** Data resets when page reloads.

**Solution:** Used localStorage to persist crypto prices:

```js
useEffect(() => {
  const savedData = JSON.parse(localStorage.getItem("cryptoData"));
  if (savedData) setData(savedData);
}, []);

useEffect(() => {
  localStorage.setItem("cryptoData", JSON.stringify(data));
}, [data]);
```
