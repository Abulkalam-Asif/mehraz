"use client";
import { AlertContext } from "@/context/AlertContext";
import { useContext } from "react";

export const useShowAlert = () => useContext(AlertContext)?.showAlert;
