import { call, put, takeEvery } from "redux-saga/effects";
import { SAGA_SIGNUP } from "../../types/usertypes";
import { signupAC } from "../../actionCreators/userAC";

function signupFetch(action) {
	return fetch("http://127.0.0.1:3001/auth/register", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify(action.payload),
	}).then((response) => response.json())
}

function* signupWorker(action) {
	try {
		const dataFromServer = yield call(signupFetch, action);
		if (dataFromServer) yield put(signupAC(dataFromServer));
	} catch (e) {
		yield put({ type: "USER_FETCH_FAILED", message: e.message });
	}
}

function* signupWatcher() {
	yield takeEvery(SAGA_SIGNUP, signupWorker);
}

export default signupWatcher;
