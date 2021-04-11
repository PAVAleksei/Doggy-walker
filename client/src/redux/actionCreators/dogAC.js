import { ADD_DOG, GET_DOGS, EDIT_DOG, GET_EDIT_DOG } from "../types/dogTypes";


export const addNewDogFetch = (newDog) => async (dispatch) => {
  const response = await fetch('http://localhost:3001/api/v1/dog', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({newDog})
  })
  const responseFromServ = await response.json()
  dispatch(addDogAC(responseFromServ))
}

export const addDogAC = (newDog) => {
  return {
    type: ADD_DOG,
    payload: newDog,
  }
};

export const getDogsAC = (Dogs) => {
  return {
    type: GET_DOGS,
    payload: Dogs,
  }
};


export const editDogFetch = (editDog, id) => async (dispatch) => {
  const response = await fetch(`http://localhost:3001/api/v1/dog/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(editDog, id)
  })
  const responseFromServ = await response.json()
  console.log(responseFromServ, 'responseFromServ');
  dispatch(editDogAC(responseFromServ))
}

export const editDogAC = (editDog) => {
  return {
    type: EDIT_DOG,
    payload: editDog,
  }
};

export const getDogAC = (dog) => {
  return {
    type: GET_EDIT_DOG,
    payload: dog,
  }
};
