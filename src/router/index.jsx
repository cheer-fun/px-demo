import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation
} from "react-router-dom";
import { Provider, KeepAlive } from "react-keep-alive";
import ScrollMemory from "react-router-scroll-memory";

import { Context } from "../store";
import Home from "../scenes/Home";
import Detail from "../scenes/Detail";
import Search from "../scenes/Search";

import Menu from "../components/Menu";
import MenuHeader from "../components/Header";

import { PUBLIC_PATH } from "../assets/config/index.yml";

function RouterList(e) {
  const { state, dispatch } = useContext(Context);
  let location = useLocation();
  let toggle = () => dispatch({ type: "toggleMenu" });

  function setShowMenu(value) {
    dispatch({ type: "setMenu", value });
  }

  useEffect(() => {
    state.showMenu && setShowMenu(false);
  }, [location]);

  const isActive = state.showMenu ? "is-active" : "";
  return (
    <div className={`px-wrapper ${isActive}`}>
      <div
        className={`px-mask ${isActive}`}
        onClick={() => setShowMenu(false)}
      />
      <Menu />
      <div className="px-container">
        <Provider>
          <Switch>
            <Route path={`${PUBLIC_PATH}/search`}>
              <KeepAlive name="search">
                <Search />
              </KeepAlive>
            </Route>
            <Route path={`${PUBLIC_PATH}/detail`}>
              <Detail />
            </Route>
            <Route exact path={`${PUBLIC_PATH}/`} component={Home} />
          </Switch>
        </Provider>
      </div>
      <MenuHeader callback={() => toggle()} />
    </div>
  );
}

function Routers() {
  return (
    <Router>
      <ScrollMemory />
      <RouterList />
    </Router>
  );
}
export default Routers;
