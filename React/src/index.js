import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { MaterialUIControllerProvider } from "context";
import { Provider } from "react-redux";
import store from "./redux/index";
const container = document.getElementById("app");
const root = createRoot(container);
import 'rsuite/dist/rsuite.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <MaterialUIControllerProvider>
        <App />
        <ToastContainer />
      </MaterialUIControllerProvider>
    </BrowserRouter>
  </Provider>
);
