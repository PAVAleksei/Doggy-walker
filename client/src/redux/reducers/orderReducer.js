import { ADD_ORDER, CHANGE_ORDER_STATUS_IN_WORK, CHANGE_ORDER_STATUS_REQUESTED, SET_ORDERS, SET_ORDERS_CUSTOMER } from "../types/orderTypes";

function orderReducer(state = [], action) {
  switch (action.type) {
    case SET_ORDERS:
      return action.payload;

    case SET_ORDERS_CUSTOMER:
        return action.payload;
    
    case ADD_ORDER:
      return [
        ...state, action.payload
      ];

    case CHANGE_ORDER_STATUS_REQUESTED:
      return state.map(el => (el._id === action.payload._id) ? action.payload : el);
    
    
    
    default:
      return state;
  }
}

export default orderReducer;
