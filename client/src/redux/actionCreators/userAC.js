import { AUTH, SAGA_SIGNUP, SAGA_SIGN_IN, SIGN_IN } from "../types/usertypes";

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

export const SagaSignInAC = (login = {}) => {
  return {
    type: SAGA_SIGN_IN,
    payload: login,
  };
};

export const signinAC = (login) => {
  return {
    type: SIGN_IN,
    payload: {
      login,
      isAuth: true,
    },
  };
};
