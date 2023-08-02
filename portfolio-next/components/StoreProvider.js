'use client'
import React from "react";
import { Provider } from "react-redux";
import store from "@/store"; // Make sure to provide the correct path to your Redux store

// Component to provide the Redux store to the entire app
const StoreProvider = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}

export default StoreProvider;
