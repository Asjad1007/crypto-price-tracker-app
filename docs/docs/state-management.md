# State Management

We use **React Query** for API data caching and **Zustand** for local state management.

## Why React Query?

- Automatic caching of fetched data.
- Background re-fetching for up-to-date information.
- Eliminates the need for manual state handling with `useState`.

### Example Usage

```js
import { useQuery } from "react-query";

const { data, error, isLoading } = useQuery("cryptoPrices", fetchCryptoPrices);
```

## Why Zustand?

- Minimalistic and lightweight state management.
- No unnecessary re-renders.
- Easy-to-use API.

### Example Store

```js
import create from "zustand";

const useCryptoStore = create((set) => ({
  cryptoData: [],
  setCryptoData: (data) => set({ cryptoData: data }),
}));

export default useCryptoStore;
```
