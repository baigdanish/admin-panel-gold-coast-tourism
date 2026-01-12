import React from "react";

import SnackbarContext from "./SnackbarContext";

export default function useConfirmModal() {
  return React.useContext(SnackbarContext);
}
