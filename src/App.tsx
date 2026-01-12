import { Fragment } from "react";
import { useSelector } from "react-redux";
import { useRoutes } from "react-router-dom";

import "./App.css";
import { APP_ROUTES, AUTH_ROUTES } from "./routes/Routes";
import type { RootState } from "./redux/store";

function App() {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  // const isLoggedIn = true;

  const routing = useRoutes(isLoggedIn ? APP_ROUTES : AUTH_ROUTES);

  return <Fragment>{routing}</Fragment>;
}

export default App;
