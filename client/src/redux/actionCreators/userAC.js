import {
  AUTH,
  SAGA_SIGNUP,
  SAGA_SIGN_IN,
  SIGN_IN,
  EDIT_USER,
} from "../types/usertypes";

export const sagaSignupAC = ({
  email,
  firstname,
  lastname,
  kind,
  password,
  district,
  passport,
}) => {
  return {
    type: SAGA_SIGNUP,
    payload: {
      email,
      firstname,
      lastname,
      kind,
      password,
      district,
      passport,
    },
  };
};

export const signupAC = (resFromServer) => {
  console.log(resFromServer);
  return {
    type: AUTH,
    payload: {
      ...resFromServer,
      isAuth: true,
    },
  };
};

export const SagaSignInAC = (loginData = {}) => {
  return {
    type: SAGA_SIGN_IN,
    payload: loginData,
  };
};

export const signinAC = (resFromServer) => {
  // console.log(resFromServer)
  return {
    type: SIGN_IN,
    payload: {
      ...resFromServer,
      isAuth: true,
    },
  };
};

// export const registerWithGoogleThunk = () => async (dispatch, getState) => {
//   const response = await fetch("http://localhost:3001/auth/google");
//   const dataFromServer = await response.json();
//   dispatch(signupAC(dataFromServer));
// };

export const editUserFetch = (editUser) => async (dispatch) => {
  const response = await fetch(`http://localhost:3001/user/edit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(editUser),
  });
  const responseFromServ = await response.json();
  dispatch(editUserAC(responseFromServ));
};

export const editUserAC = (editUser) => {
  return {
    type: EDIT_USER,
    payload: editUser,
  };
};
