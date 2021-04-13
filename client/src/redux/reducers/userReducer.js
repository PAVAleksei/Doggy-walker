import initState from "../initState";
import {
  AUTH,
  SIGN_IN,
  EDIT_USER,
  LOGOUT,
  ADD_ORDER_CUSTOMER,
  ADD_ORDER_EXECUTOR,
} from "../types/usertypes";
import { VERIFICATION_USER } from "../types/verificationUserTypes";

function userReducer(state = {}, action) {
  switch (action.type) {
    case AUTH:
      // console.log(action.payload);
      return action.payload;

    case SIGN_IN:
      // console.log(action.payload);

      return action.payload;

    case VERIFICATION_USER:
      return {
        ...state,
        verification: true,
      };

    case EDIT_USER:
      return {
        ...action.payload,
        isAuth: true,
      };

    case ADD_ORDER_CUSTOMER:
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };

    case ADD_ORDER_EXECUTOR:
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };

    default:
      return state;
  }
}

export default userReducer;
