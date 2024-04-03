"use client";
import { createContext, useState } from "react";
const AlertContext = createContext({
  alerts: [],
  showAlert: () => {},
  hideAlert: () => {},
});

const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const showAlert = ({ type, message }) => {
    setAlerts([{ type, message, timestamp: Date.now() }]);
  };

  const hideAlert = () => {
    setAlerts([]);
  };

  return (
    <AlertContext.Provider value={{ alerts, showAlert, hideAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export { AlertProvider, AlertContext };
