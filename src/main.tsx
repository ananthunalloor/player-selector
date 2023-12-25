import "@mantine/core/styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

import { createTheme, MantineProvider } from "@mantine/core";
import { Toaster } from "react-hot-toast";

const theme = createTheme({});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <Toaster />
      <App />
    </MantineProvider>
  </React.StrictMode>
);
