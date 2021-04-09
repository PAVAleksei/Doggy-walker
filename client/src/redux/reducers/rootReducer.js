import { combineReducers } from "redux";
import orderReducer from "./orderReducer";
import userReducer from "./userReducer";
import errorReducer from './errorReducer'

const rootReducer = combineReducers({
  user: userReducer,
  orders: orderReducer,
  error: errorReducer,
});

export default rootReducer;
