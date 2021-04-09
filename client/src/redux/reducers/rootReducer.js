import { combineReducers } from "redux";
import { LOGOUT } from "../types/usertypes";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
