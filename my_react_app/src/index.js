import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import RealAPI from "./components/RealAPI";
import * as serviceWorker from "./serviceWorker";
import LifecycleA from "./components/LifecycleMount";
import LifecycleB from "./components/LifecycleUpdate";
import MainComponent from "./components/RealAPI";
ReactDOM.render(
  <div>
    <RealAPI />
  </div>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
if (module.hot) {
  module.hot.accept();
}
