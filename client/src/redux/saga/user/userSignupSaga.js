import { call, put, takeEvery } from "redux-saga/effects";
import { SAGA_SIGNUP } from "../../types/usertypes";
import { signupAC } from "../../actionCreators/userAC";

function signupFetch(action) {
  return fetch("http://localhost:3000/user/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(action.payload),
  }).then((response) => response.status);
}

function* signupWorker(action) {
  try {
    const signupStatus = yield call(signupFetch, action);
    if (signupStatus === 200) yield put(signupAC(action.payload.email));
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
  }
}

function* signupWatcher() {
  yield takeEvery(SAGA_SIGNUP, signupWorker);
}

export default signupWatcher;
