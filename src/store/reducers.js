import {headerType} from "./state";

export default function reducers(state, action) {
  switch (action.type) {
  case "changeHeader":
    if (headerType.includes(action.value)) {
      return {
        ...state,
        header: action.value
      };
    } else {
      throw new Error(`${action.value} is not optional header type.`);
    }
  case "toggleMenu":
    return {
      ...state,
      showMenu: !state.showMenu
    };
   case "setMenu":
    return {
      ...state,
      showMenu: Boolean(action.value)
    };
  default:
    throw new Error(`${action.type} is not defined.`);
  }
}
