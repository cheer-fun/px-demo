import "core-js/stable";
import "regenerator-runtime/runtime";
import React, { Component, useReducer } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { Context, initStore } from "./store";
import "normalize.css";
import "animate.css";
import "./app.styl";
import "./assets/iconfont/iconfont.css";
import styles from "./styles";
import Routers from "./router";
import createStore from "./store";
import Vconsole from "vconsole";

new Vconsole();

function App() {
  const [state, dispatch] = initStore();
  return (
    <Context.Provider value={{state, dispatch}}>
      <Routers />
    </Context.Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
