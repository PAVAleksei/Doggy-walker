import { AUTH, SAGA_SIGNUP } from "../types/usertypes";

export const sagaSignupAC = ({
  email,
  firstname,
  lastname,
  kind,
  password,
}) => {
  return {
    type: SAGA_SIGNUP,
    payload: {
      email,
      firstname,
      lastname,
      kind,
      password,
    },
  };
};

export const signupAC = (email = "") => {
  return {
    type: AUTH,
    payload: {
      email,
      isAuth: true,
    },
  };
};
