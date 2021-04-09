import initState from "../initState";
import { AUTH, LOGOUT } from "../types/usertypes";

function userReducer(state = initState.user, action) {
  switch (action.type) {
    case AUTH:
      return action.payload;

    default:
      return state;
  }
}

export default userReducer;
