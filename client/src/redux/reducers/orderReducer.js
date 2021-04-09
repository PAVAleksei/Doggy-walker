import { ADD_ORDER, SET_ORDERS } from "../types/orderTypes";

function orderReducer(state = [], action) {
  switch (action.type) {
    case SET_ORDERS:
      return action.payload;

    case ADD_ORDER:
      return action.payload;

    
    default:
      return state;
  }
}

export default orderReducer;
