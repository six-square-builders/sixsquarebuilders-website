import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// Directly set the base path to "/App"
const basename = "/";

ReactDOM.render(
  <BrowserRouter basename={basename}>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
