import signupWatcher from "./user/userSignupSaga";
import { all } from "redux-saga/effects";
import signInWatcher from "./user/userSignInSaga";

export default function* rootSaga() {
  yield all([
    signupWatcher(),
    signInWatcher(),
  ]);
  // code after all-effect
}
