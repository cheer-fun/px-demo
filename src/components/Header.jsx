import React, { createContext, createElement, useContext } from "react";
import { Link } from "react-router-dom";
import IconBtn from "./btn";
import { useHistory, useLocation } from "react-router-dom";
import { Context } from "../store";

import CommonInput from "./Input";
import { PUBLIC_PATH } from "../assets/config/index.yml";

export default function Header() {
  const {state, dispatch} = useContext(Context);
  const as = SearchHeader;
  const cfg = {
    simple: HomeHeader,
    search: SearchHeader,
    dark: DarkHeader,
    white: WhiteHeader,
    opacity: OpacityHeader
  };
  const callback = () => dispatch({type: "toggleMenu"});
  return createElement(cfg?.[state.header] ?? cfg.simple, {callback});
}

function OpacityHeader({callback}) {
  const history = useHistory();
  
  const btnOptions = [
    {
      btnClass: "",
      iconName: "back",
      callback: () => history.goBack()
    },
    {
      btnClass: "f-right",
      iconName: "menu",
      callback
    }
  ];
  const headerClass = "px-header__opacity";
  return (<CommonHeader {...{headerClass, btnOptions, callback}}/>);
}

function WhiteHeader({callback}) {
  const history = useHistory();
  
  const btnOptions = [
    {
      btnClass: "",
      iconName: "back",
      callback: () => history.goBack()
    },
    {
      btnClass: "f-right",
      iconName: "menu",
      callback
    }
  ];
  const headerClass = "px-header__white";
  return (<CommonHeader {...{headerClass, btnOptions, callback}}/>);
}

function DarkHeader({callback}) {
  const history = useHistory();
  
  const btnOptions = [
    {
      btnClass: "",
      iconName: "back",
      callback: () => history.goBack()
    },
    {
      btnClass: "f-right",
      iconName: "menu",
      callback
    }
  ];
  const headerClass = "px-header__dark";
  return (<CommonHeader {...{headerClass, btnOptions, callback}}/>);
}

function HomeHeader({callback}) {
  const btnOptions = [
    {
      btnClass: "",
      iconName: "menu",
      callback
    }
  ];
  const headerClass = "px-header__home";
  return (<CommonHeader {...{headerClass, btnOptions, callback}}/>);
}

function SearchHeader({ callback }) {
  return (
    <div className={`px-header px-header__search`}>
      <CommonInput more />
      <IconBtn iconName="menu" callback={callback} />
    </div>
  );
}

function CommonHeader({headerClass, btnOptions, callback}) {
  const location = useLocation();
  const history = useHistory();

  return (
    <div className={`px-header ${headerClass}`}>
      {btnOptions.map((e, idx) => (
        <IconBtn {...{ ...e, key: idx }} />
      ))}
    </div>
  );
}
