import {
	ADD_ORDER,
	CHANGE_ORDER_STATUS_COMPLETED,
	CHANGE_ORDER_STATUS_REQUESTED,
	CHANGE_STATUS,
	DELETE_ORDER,
	EDIT_ORDER,
	SET_ORDERS,
	SET_ORDERS_CUSTOMER,
} from "../types/orderTypes";
import { setError } from "./errorAC";

export const setOrders = () => (dispatch, getState) => {
	fetch("http://127.0.0.1:3001/api/orders")
		.then((res) => res.json())
		.then((orders) => dispatch(setOrdersFromServer(orders)));
};

export const setOrdersFromServer = (orders) => {
	return {
		type: SET_ORDERS,
		payload: orders,
	};
};

export const setOrdersCustomer = () => (dispatch, getState) => {
	fetch("http://127.0.0.1:3001/api/customer/orders", {
		credentials: "include",
	})
		.then((res) => res.json())
		.then((orders) => dispatch(setOrdersCustomerFromServer(orders)));
};

export const setOrdersCustomerFromServer = (orders) => {
	return {
		type: SET_ORDERS_CUSTOMER,
		payload: orders,
	};
};

export const addOrder = (order) => async (dispatch, setState) => {
	if (order) {
		fetch("http://127.0.0.1:3001/api/customer/orders", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify(order),
		}).then((response) => response.json());
	}
};

export const addOrderFromServer = (newOrder) => {
	return {
		type: ADD_ORDER,
		payload: newOrder,
	};
};

export const deleteOrder = (id) => {
	return {
		type: DELETE_ORDER,
		payload: id,
	};
};

export const changeStatus = (id) => async (dispatch, setState) => {
	dispatch(setError({ status: false, text: "" }));

	const response = await fetch(`http://127.0.0.1:3001/api/customer/orders`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify({ id }),
	});

	if (response.ok) {
		return dispatch(changeStatusFromServer(id));
	} else {
		dispatch(setError({ status: true, text: "Не удалось изменить статус." }));
	}
};

export const changeStatusFromServer = (id) => {
	return {
		type: CHANGE_STATUS,
		payload: id,
	};
};

export const editOrder = (id, editValue) => (dispatch, setState) => {
	dispatch(setError({ status: false, text: "" }));

	// dispatch(showLoader(true));

	fetch("http://127.0.0.1:3001/api/customer/orders", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify({ id, editValue }),
	})
		.then((res) => res.json())
		.then((updatedOrder) => {
			dispatch(editOrderFromServer(updatedOrder));
		})
		.catch((error) => {
			dispatch(
				setError({ status: true, text: "Не удалось изменить задание." })
			);
		});
	// .then(() => dispatch(hideLoader(false)))
};

export const editOrderFromServer = (updatedOrder) => {
	return {
		type: EDIT_ORDER,
		payload: updatedOrder,
	};
};

export const changeOrderStatusRequested = (id) => (dispatch, setState) => {
	fetch(`http://127.0.0.1:3001/api/orders/requested/${id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify({ id }),
	})
		.then((res) => res.json())
		.then((updatedOrder) => {
			dispatch(changeOrderStatusRequestedFromServer(updatedOrder));
		})
		.catch((error) => {
			dispatch(
				setError({ status: true, text: "Не удалось изменить задание." })
			);
		});
};

export const changeOrderStatusRequestedFromServer = (updatedOrder) => {
	return {
		type: CHANGE_ORDER_STATUS_REQUESTED,
		payload: updatedOrder,
	};
};

export const changeOrderStatusCompleted = (id) => (dispatch, setState) => {
	fetch(`http://127.0.0.1:3001/api/orders/completed/${id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify({ id }),
	})
		.then((res) => res.json())
		.then((updatedOrder) => {
			dispatch(changeOrderStatusCompletedFromServer(updatedOrder));
		})
		.catch((error) => {
			dispatch(
				setError({ status: true, text: "Не удалось изменить задание." })
			);
		});
};

export const changeOrderStatusCompletedFromServer = (updatedOrder) => {
	return {
		type: CHANGE_ORDER_STATUS_COMPLETED,
		payload: updatedOrder,
	};
};
