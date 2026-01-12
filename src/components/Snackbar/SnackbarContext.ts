import React from "react";
import type { SnackbarContextType } from "./SnackbarProvider";

const SnackbarContext = React.createContext<SnackbarContextType | undefined>(
  undefined
);
export default SnackbarContext;
