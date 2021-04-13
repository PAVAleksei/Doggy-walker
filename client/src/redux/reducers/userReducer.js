import initState from "../initState";
import {
  AUTH,
  SIGN_IN,
  EDIT_USER,
  LOGOUT,
  ADD_ORDER_CUSTOMER,
  USER_AVATAR,
  CHANGE_ORDER_STATUS_IN_WORK,
  CHANGE_ORDER_CUSTOMER_STATUS_REQUESTED,
  ADD_ORDER_EXECUTOR,
  CLOSE_ORDER_CUSTOMER,
} from "../types/usertypes";
import { ADD_DOG, DOG_AVATAR, DELETE_DOG, EDIT_DOG } from "../types/dogTypes";
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
    case ADD_DOG:
      return {
        ...state,
        animal: [...state.animal, action.payload],
      };

    case DELETE_DOG:
      console.log(state);
      console.log(action.payload);
      return {
        ...state,
        animal: [...state.animal.filter((el) => el._id !== action.payload)],
      };

    case EDIT_DOG:
      return {
        ...state,
        animal: [action.payload],
      };

    case CHANGE_ORDER_STATUS_IN_WORK:
      return {
        ...state,
        orders: [
          ...state.orders.map((el) =>
            el._id === action.payload._id ? action.payload : el
          ),
        ],
      };

    case CHANGE_ORDER_CUSTOMER_STATUS_REQUESTED:
      return {
        ...state,
        orders: [
          ...state.orders.map((el) =>
            el._id === action.payload._id ? action.payload : el
          ),
        ],
      };

      case CLOSE_ORDER_CUSTOMER:
        return {
          ...state,
          orders: [
            ...state.orders.map((el) =>
              el._id === action.payload._id ? action.payload : el
            ),
          ],
        };

    case USER_AVATAR:
      return {
        ...state, photo: [action.payload]
      }

    case DOG_AVATAR:

      const avatar = state.animal.find(
        el => el._id === action.payload.id
      )
      avatar.avatar = action.payload.avatar

      return {
        ...state,
        animal: state.animal.map(el => el._id === avatar._id ? avatar : el)
      }

    default:
      return state;
  }
}

export default userReducer;
