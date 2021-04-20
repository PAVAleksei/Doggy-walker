import { call, put, takeEvery } from "redux-saga/effects";
import { SAGA_SIGN_IN } from "../../types/usertypes";
import { signinAC } from "../../actionCreators/userAC";

function signInFetch(action) {
	return fetch("http://127.0.0.1:3001/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify(action.payload),
	}).then((response) => response.json());
}

function* signInWorker(action) {
	try {
		const dataFromServer = yield call(signInFetch, action);
		if (dataFromServer) yield put(signinAC(dataFromServer));
	} catch (e) {
		yield put({ type: "USER_FETCH_FAILED", message: e.message });
	}
}

function* signInWatcher() {
	yield takeEvery(SAGA_SIGN_IN, signInWorker);
}

export default signInWatcher;
