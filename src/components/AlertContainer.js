"use client";
import { AlertContext } from "@/context/AlertContext";
import { Alert } from "@/components";
import { useContext } from "react";

const AlertContainer = () => {
  const { alerts } = useContext(AlertContext);

  return (
    <div>
      {alerts?.map(({ message, type, timestamp }) => (
        <Alert key={timestamp} message={message} type={type} />
      ))}
    </div>
  );
};

export default AlertContainer;
