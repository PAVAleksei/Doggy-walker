import { combineReducers } from "redux";
import orderReducer from "./orderReducer";
import userReducer from "./userReducer";
import errorReducer from './errorReducer'
import DogsReducer from "./DogsReducer";
import dogReducer from "./dogReducer";

const rootReducer = combineReducers({
  user: userReducer,
  orders: orderReducer,
  error: errorReducer,
  dog: dogReducer,
  dogs: DogsReducer,
});

export default rootReducer;
