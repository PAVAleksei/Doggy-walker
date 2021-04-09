import signupWatcher from "./user/userSignupSaga";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([signupWatcher()]);
  // code after all-effect
}
