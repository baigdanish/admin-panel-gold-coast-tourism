import React from "react";
import type { AlertContextType } from "./AlertProvider";

const AlertContext = React.createContext<AlertContextType | undefined>(
  undefined
);
export default AlertContext;
