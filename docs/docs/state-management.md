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
