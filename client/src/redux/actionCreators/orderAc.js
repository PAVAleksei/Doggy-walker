import { ADD_ORDER, CHANGE_STATUS, DELETE_ORDER, EDIT_ORDER, SET_ORDERS } from "../types/orderTypes";
import { setError } from "./errorAC";

export const setOrders = (orders) => {
  return {
    type: SET_ORDERS,
    payload: orders,
  };
};

export const addOrder = (order) => async (dispatch, setState) => {

  if (order) {
    fetch(`http://localhost:3001/api/customer/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    })
    .then(response => response.json())
    .then(newOrder => dispatch(addOrderFromServer(newOrder)))
    .catch(() => {
      dispatch(setError({ status: true, text: 'Не удалось добавить новый заказ.'}))
    })
}

};

export const addOrderFromServer = (newOrder) => {
  return {
    type: ADD_ORDER,
    payload: newOrder
  }
}

export const deleteOrder = (id) => {
  return {
    type: DELETE_ORDER,
    payload: id
  };
}

export const changeStatus = (id) => async (dispatch, setState) => {

  dispatch(setError({status: false, text: ''}))

  const response = await fetch(`http://localhost:3001/api/customer/orders`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({id})
  })

  if (response.ok) {
    return dispatch(changeStatusFromServer(id));
  } else {
    dispatch(setError({status: true, text: 'Не удалось изменить статус.'}));
  }
}

export const changeStatusFromServer = (id) => {
  return {
    type: CHANGE_STATUS,
    payload: id
  }
}

export const editOrder = (id, editValue) => (dispatch, setState) => {
  dispatch(setError({status: false, text: ''}))

    // dispatch(showLoader(true));

    fetch('http://localhost:3001/api/customer/orders', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id, editValue})
    })
    .then(res => res.json())
    .then(updatedOrder => {
      dispatch(editOrderFromServer(updatedOrder));
      
    })
    .catch(error => {
      dispatch(setError({status: true, text: 'Не удалось изменить задание.'}));
    })
    // .then(() => dispatch(hideLoader(false)))
  
}

export const editOrderFromServer = (updatedOrder) => {
  return {
    type: EDIT_ORDER,
    payload: updatedOrder
  }
}