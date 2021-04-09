import initState from "../initState";
import { AUTH, SIGN_IN, LOGOUT } from "../types/usertypes";

function userReducer(state = initState.user, action) {
  switch (action.type) {
    case AUTH:
      return action.payload;

    case SIGN_IN:
      console.log(action.payload);
      return {
        email: action.payload.login.email,
        password: action.payload.login.password,
        isAuth: true
      };

    default:
      return state;
  }
}

export default userReducer;
