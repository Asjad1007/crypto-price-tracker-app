# Challenges & Solutions

## 1\. **Ensuring UI Responsiveness**

**Problem:** The initial layout was too constrained, making the UI feel congested.

**Solution:** Increased container width for better desktop experience while maintaining mobile responsiveness.

## 2\. **Refresh Button UI Issue**

**Problem:** The refresh button was breaking the layout on smaller screens.

**Solution:** Applied `flex-wrap` to ensure proper alignment and added appropriate margins.

## 3\. **Data Fetching Performance**

**Problem:** Frequent API calls were slowing down performance.

**Solution:** Used React Query for caching and background re-fetching.

## 4\. **Ensuring Smooth State Management**

**Problem:** Initially, all state was stored in React’s `useState`, causing unnecessary re-renders.

**Solution:** Moved local state to Zustand and API state to React Query for optimized performance.
