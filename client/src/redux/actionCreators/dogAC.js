import { GET_DOGS, DOG_AVATAR, GET_EDIT_DOG, } from "../types/dogTypes";

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

export const uploadDogAvatarFetch = (formData, id) => async (dispatch) => {
  try {
    // console.log(formData.get('file'), 'formData');
   const response =  await fetch(`http://localhost:3001/api/v1/dog/avatar/${id}`, {
      method: "POST",
      credentials: "include",
      body: formData
    })
    const responseFromServ = await response.json()
    console.log(responseFromServ, 'responseFromServ');
    dispatch(uploadAvatarAC(responseFromServ))
  } catch (e) {
    console.log(e);
  }
}

export const uploadAvatarAC = (avatar) => {
  console.log(avatar, 'avatar');
  return {
    type: DOG_AVATAR,
    payload: avatar,
  }
};
