import {  EDIT_DOG, GET_EDIT_DOG } from "../types/dogTypes"

const dogReducer = (state = {}, action) => {


  switch (action.type) {
    case GET_EDIT_DOG:
      return action.payload

      case EDIT_DOG:
      return action.payload;

      
    default:
      return state
  }
}
export default dogReducer
