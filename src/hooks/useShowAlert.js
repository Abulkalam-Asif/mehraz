"use client";
import { AlertContext } from "@/context/AlertContext";
import { useContext } from "react";

export const useShowAlert = () => {
  const { showAlert } = useContext(AlertContext);
  return showAlert;
};
