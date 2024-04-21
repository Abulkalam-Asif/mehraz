"use client";
import { useContext, useEffect } from "react";
import { AlertContext } from "@/context/AlertContext";
import { closeIcon } from "@/assets";
import Image from "next/image";

const Alert = ({ message, type }) => {
  const { hideAlert } = useContext(AlertContext);

  useEffect(() => {
    const alertTimeout = setTimeout(() => {
      hideAlert();
    }, 5000);

    return () => {
      clearTimeout(alertTimeout);
    };
  }, []);

  return (
    <>
      <div
        className={`fixed z-50 top-4 right-4 bg-white border-2 border-accent-1-base shadow-xl rounded-lg flex items-center gap-4 overflow-hidden`}>
        <span className="pl-4 py-3">{message}</span>
        <button className="p-4" onClick={hideAlert}>
          <Image src={closeIcon} alt="close" width={14} />
        </button>
        <div
          className={`${
            type === "SUCCESS"
              ? "bg-green-500"
              : type === "ERROR"
              ? "bg-red-500"
              : type === "WARNING"
              ? "bg-yellow-500"
              : "bg-blue-500"
          } h-1.5 absolute bottom-0 left-0 right-0 animate-alert`}></div>
      </div>
    </>
  );
};

export default Alert;
