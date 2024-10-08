import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import App from "./App";
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <BrowserRouter>
      <App />    
    </BrowserRouter>
  </StrictMode>
);
