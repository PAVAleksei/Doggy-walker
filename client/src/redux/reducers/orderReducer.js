import {
  ADD_ORDER,
  CHANGE_ORDER_STATUS_COMPLETED,
  CHANGE_ORDER_STATUS_REQUESTED,
  SET_ORDERS,
} from "../types/orderTypes";

function orderReducer(state = [], action) {
  switch (action.type) {
    case SET_ORDERS:
      return action.payload;

    case ADD_ORDER:
      return [...state, action.payload];

    case CHANGE_ORDER_STATUS_REQUESTED:
      return state.map((el) =>
        el._id === action.payload._id ? action.payload : el
      );

    case CHANGE_ORDER_STATUS_COMPLETED:
      return state.map((el) =>
        el._id === action.payload._id ? action.payload : el
      );

    default:
      return state;
  }
}

export default orderReducer;
