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
