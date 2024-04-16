"use client";
import { createContext, useEffect, useState } from "react";
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

  // UNDO
  useEffect(() => {
    if (!AlertContext) {
      console.log(
        "AlertContext is not available. Did you forget to wrap your component with AlertProvider?",
      );
    }
  }, [AlertContext]);

  return (
    <AlertContext.Provider value={{ alerts, showAlert, hideAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export { AlertProvider, AlertContext };
