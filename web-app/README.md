# Crypto Price Tracker - Documentation

## Table of Contents

1. [Project Setup Guide](#project-setup-guide)
2. [API Integration Details](#api-integration-details)
3. [State Management Explanation](#state-management-explanation)
4. [Challenges & Solutions](#challenges--solutions)

---

## Project Setup Guide

### Prerequisites

Ensure you have the following installed:

- Node.js (Latest LTS recommended)
- npm or yarn
- Expo (for mobile, if using React Native)

### Clone the Repository

```bash
git clone https://github.com/your-username/crypto-price-tracker.git
cd crypto-price-tracker
```

````

### Setup & Run Web App (Next.js)

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open `http://localhost:3000` in your browser.

### Setup & Run Mobile App (React Native + Expo)

1. Navigate to the mobile directory:

   ```bash
   cd mobile
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start Expo development server:

   ```bash
   npx expo start
   ```

4. Scan the QR code in the Expo Go app (iOS/Android) or run the app in an emulator.

---

## API Integration Details

### API Used: **CoinGecko**

We fetch real-time cryptocurrency price data using [CoinGecko's API](https://www.coingecko.com/en/api).

### API Endpoint Used

```
GET https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,cardano,polkadot&vs_currencies=usd
```

### Fetching Data in Web App (Next.js)

```js
const fetchData = async () => {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,cardano,polkadot&vs_currencies=usd"
    );
    if (!response.ok) throw new Error("Failed to fetch data");
    const result = await response.json();
    setData(result);
  } catch (err) {
    setError(err);
  }
};
```

### Fetching Data in Mobile App (React Native)

```js
const fetchCryptoPrices = async () => {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,cardano,polkadot&vs_currencies=usd"
    );
    const data = await response.json();
    setPrices(data);
  } catch (error) {
    console.error("Error fetching prices:", error);
  }
};
```

### Auto-Update Interval (Live Updates)

To refresh data automatically every 30 seconds:

```js
useEffect(() => {
  fetchData();
  const interval = setInterval(fetchData, 30000);
  return () => clearInterval(interval);
}, []);
```

---

## State Management Explanation

We chose **React's `useState` & `useEffect`** for simplicity, but for scalability, you can integrate a state management library like:

### **1. Zustand (Recommended for Simplicity & Performance)**

Zustand is a lightweight state management solution:

```js
import create from "zustand";

const useStore = create((set) => ({
  prices: {},
  fetchPrices: async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    set({ prices: data });
  },
}));

export default useStore;
```

### **2. React Query (Recommended for API Caching & Fetching)**

If you need better caching and automatic refetching, React Query is useful:

```js
import { useQuery } from "@tanstack/react-query";

const fetchPrices = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

const { data, isLoading, error } = useQuery(["cryptoPrices"], fetchPrices, {
  refetchInterval: 30000, // Auto-refresh every 30 seconds
});
```

### **3. Context API (If Global State is Needed)**

For simple state sharing across components:

```js
const CryptoContext = createContext();

export const CryptoProvider = ({ children }) => {
  const [prices, setPrices] = useState({});

  return (
    <CryptoContext.Provider value={{ prices, setPrices }}>
      {children}
    </CryptoContext.Provider>
  );
};
```

### Which One to Use?

- **Zustand** → Best for simple, fast state management.
- **React Query** → Best for API fetching, caching, and automatic updates.
- **Context API** → Works for small global state but less optimal for frequent updates.

---

## Challenges & Solutions

### **1. API Rate Limits**

**Challenge**: CoinGecko API has rate limits that could block frequent requests.
**Solution**: Used React Query with caching and `refetchInterval` instead of polling.

### **2. UI Freezing on API Call**

**Challenge**: Fetching large data caused UI lag.
**Solution**: Added a `loading` state and displayed a "Loading..." message.

```js
if (loading) return <p>Loading...</p>;
```

### **3. Mobile Compatibility**

**Challenge**: Mobile UI was breaking on small screens.
**Solution**: Used Tailwind's responsive utilities:

```html
<div
  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
></div>
```

### **4. Persistent State on Refresh**

**Challenge**: Data resets when page reloads.
**Solution**: Used `localStorage` to persist crypto prices:

```js
useEffect(() => {
  const savedData = JSON.parse(localStorage.getItem("cryptoData"));
  if (savedData) setData(savedData);
}, []);

useEffect(() => {
  localStorage.setItem("cryptoData", JSON.stringify(data));
}, [data]);
```

---

## Conclusion

- **Web App**: Built with **Next.js** + **Tailwind CSS**, fetching data from CoinGecko.
- **Mobile App**: Built with **React Native + Expo**.
- **State Management**: Zustand, React Query, or Context API.
- **Live Updates**: Auto-refreshing every 30 seconds.

This project can be **expanded** by adding:

- **More coins** (fetching a broader list dynamically).
- **Charts** using `chart.js` or `recharts`.
- **Historical price data** for trends.

Happy coding! 🚀

```

---

### 🔹 How to Use This Markdown File?
1. **Save this as `README.md`** or another `.md` file.
2. **Upload it to your GitHub repository**.
3. **GitHub will render this beautifully** in the repository view.

This single Markdown file **fully documents your project** in a clean, professional format. 🚀
```
````
