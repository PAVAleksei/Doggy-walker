import { ADD_DOG, GET_DOGS, EDIT_DOG, GET_EDIT_DOG, DELETE_DOG } from "../types/dogTypes";




export const getDogsAC = (Dogs) => {
  return {
    type: GET_DOGS,
    payload: Dogs,
  }
};




export const getDogAC = (dog) => {
  return {
    type: GET_EDIT_DOG,
    payload: dog,
  }
};

