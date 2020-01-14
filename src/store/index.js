import React, { createContext, useReducer, useContext } from "react";
import {init} from './state';
import reducers from './reducers';

export const Context = createContext({});

export function initStore() {
  return useReducer(reducers, init());
}

export function useStore() {
  return useContext(Context);
}
