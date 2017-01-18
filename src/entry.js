import React from "react";
import ReactDOM from "react-dom";
import AppRoutes from "./components/AppRoutes";

// stylesheets
import "./static/scss/game.scss";
import "./static/scss/global.scss";

window.onload = () => {
  ReactDOM.render(<AppRoutes />, document.getElementById("main"));
}