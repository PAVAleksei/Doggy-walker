import { VERIFICATION_USER } from "../types/verificationUserTypes";

export const verificationUser = () => {
	return {
		type: VERIFICATION_USER,
	};
};

export const verificationUserThunk = (valuesOfFields) => async (
	dispatch,
	getState
) => {
	const { user } = getState();
	const userEmail = user.email;
	const response = await fetch("http://127.0.0.1:3001/verification", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify({ ...valuesOfFields, email: userEmail }),
	});
	const status = await response.status;
	if (status === 200) {
		dispatch(verificationUser());
	}
};
