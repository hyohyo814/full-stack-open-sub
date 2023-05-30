import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";

axios
  .get("https://studies.cs.helsinki.fi/restcountries/api/name/China")
  .then((response) => {
    ReactDOM.createRoot(document.getElementById("root")).render(<App />);
  });
