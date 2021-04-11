import { ADD_DOG, EDIT_DOG, GET_DOGS } from "../types/dogTypes"

const addDogsReducer = (state = [], action) => {


  switch (action.type) {
    case ADD_DOG:
      return [
        ...state,
        action.payload
      ]
      
      case GET_DOGS:
      return [
        ...state,
        action.payload
      ]

      case EDIT_DOG:
      return action.payload;

      
    default:
      return state
  }
}
export default addDogsReducer
