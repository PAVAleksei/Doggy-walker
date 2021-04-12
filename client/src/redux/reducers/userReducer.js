import initState from "../initState";
import { AUTH, SIGN_IN, EDIT_USER, LOGOUT } from "../types/usertypes";
import { VERIFICATION_USER } from "../types/verificationUserTypes";

function userReducer(state = initState.user, action) {
  switch (action.type) {
    case AUTH:
      // console.log(action.payload);
      return action.payload;

    case SIGN_IN:
      // console.log(action.payload);
      console.log("=============>", action.payload);
      return action.payload;

    case VERIFICATION_USER:
      return {
        ...state,
        verification: true,
      };

    case EDIT_USER:
      return {
        ...action.payload,
        isAuth: true
      };

    default:
      return state;
  }
}

export default userReducer;
