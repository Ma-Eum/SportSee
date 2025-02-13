import React from "react";
import ReactDOM from "react-dom/client";
import Profile from "./pages/Profile.jsx"; // Vérifie bien que le fichier existe
import "./index.css";
import "./styles/main.scss"; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Profile />
  </React.StrictMode>
);
