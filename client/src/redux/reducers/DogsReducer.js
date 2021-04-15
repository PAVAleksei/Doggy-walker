import { ADD_DOG, DELETE_DOG, GET_DOGS } from "../types/dogTypes"

const addDogsReducer = (state = [], action) => {


  switch (action.type) {
    

    case GET_DOGS:
      return action.payload

    

    default:
      return state
  }
}
export default addDogsReducer
