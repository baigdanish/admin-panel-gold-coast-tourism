import { StyledEngineProvider, ThemeProvider } from "@mui/system";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import { SnackbarProvider } from "./components/Snackbar";
import "./index.css";
import { persister, store } from "./redux/store";
import { AlertProvider } from "./components/Alert";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function AppRoot() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={{}}>
            <StyledEngineProvider injectFirst>
              <SnackbarProvider>
                <AlertProvider>
                  <App />
                </AlertProvider>
              </SnackbarProvider>
            </StyledEngineProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <AppRoot />
    </Router>
  </StrictMode>
);
