"use client";
import { AlertContext } from "@/app/context/AlertContext";
import { closeIcon } from "@/assets";
import Image from "next/image";
import { useContext, useEffect } from "react";

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
        className={`fixed z-50 top-4 right-4 bg-white border border-accent-1-base shadow-xl rounded-lg flex items-center gap-4 overflow-hidden`}>
        <span className="pl-4">{message}</span>
        <button className="p-4" onClick={hideAlert}>
          <Image src={closeIcon} alt="close" />
        </button>
        <div
          className={`${
            type === "success"
              ? "bg-green-500"
              : type === "error"
              ? "bg-red-500"
              : type === "warning"
              ? "bg-yellow-500"
              : "bg-blue-500"
          } h-1 absolute bottom-0 left-0 right-0 animate-alert`}></div>
      </div>
    </>
  );
};

export default Alert;
