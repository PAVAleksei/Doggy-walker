import {
  AUTH,
  SAGA_SIGNUP,
  SAGA_SIGN_IN,
  SIGN_IN,
  EDIT_USER,
  ADD_ORDER_CUSTOMER,
  CHANGE_ORDER_STATUS_IN_WORK,
  ADD_ORDER_EXECUTOR,
  USER_AVATAR,
  CLOSE_ORDER_CUSTOMER,
  CHANGE_ORDER_EXECUTOR_STATUS_IN_WORK,
} from "../types/usertypes";
import { setError } from "./errorAC";
import { ADD_DOG, DELETE_DOG, EDIT_DOG } from "../types/dogTypes";


export const sagaSignupAC = ({
  email,
  firstname,
  lastname,
  kind,
  password,
  district,
  passport,
  passportSeries,
  passportNumber,
  telegram,

}) => {
  return {
    type: SAGA_SIGNUP,
    payload: {
      email,
      firstname,
      lastname,
      kind,
      password,
      district,
      passport,
      passportSeries,
      passportNumber,
      telegram,
    },
  };
};

export const signupAC = (resFromServer) => {
  console.log(resFromServer);
  return {
    type: AUTH,
    payload: {
      ...resFromServer,
      isAuth: true,
    },
  };
};

export const SagaSignInAC = (loginData = {}) => {
  return {
    type: SAGA_SIGN_IN,
    payload: loginData,
  };
};

export const signinAC = (resFromServer) => {
  return {
    type: SIGN_IN,
    payload: {
      ...resFromServer,
      isAuth: true,
    },
  };
};

// export const registerWithGoogleThunk = () => async (dispatch, getState) => {
//   const response = await fetch("http://localhost:3001/auth/google");
//   const dataFromServer = await response.json();
//   dispatch(signupAC(dataFromServer));
// };

export const editUserFetch = (editUser) => async (dispatch) => {
  const response = await fetch(`http://localhost:3001/user/edit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(editUser),
  });
  const responseFromServ = await response.json();
  dispatch(editUserAC(responseFromServ));
};

export const editUserAC = (editUser) => {
  return {
    type: EDIT_USER,
    payload: editUser,
  };
};

export const addOrderCustomer = (order) => async (dispatch, setState) => {
  if (order) {
    fetch("http://localhost:3001/api/customer/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(order),
    })
      .then((response) => response.json())
      .then((newOrder) => {
        console.log(newOrder);
        dispatch(addOrderCustomerFromServer(newOrder));
        // return history.push('/account');
      });
  }
};

export const addOrderCustomerFromServer = (newOrder) => {
  return {
    type: ADD_ORDER_CUSTOMER,
    payload: newOrder,
  };
};

export const addOrderFromExecutorThunk = (id) => async (dispatch, setState) => {
  if (id) {
    fetch("http://localhost:3001/api/executor/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ id }),
    })
      .then((response) => response.json())
      .then((newOrder) => {
        console.log(newOrder);
        dispatch(addOrderFromExecutor(newOrder));
      });
  }
};

export const addOrderFromExecutor = (newOrder) => {
  return {
    type: ADD_ORDER_EXECUTOR,
    payload: newOrder,
  };
};
export const changeOrderStatusInWork = (id, socket) => (dispatch, setState) => {
  fetch(`http://localhost:3001/api/orders/inwork/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ id }),
  })
    .then((res) => res.json())
    .then((updatedOrder) => {

      const messageToServer = {
        type: 'approve executor',
        payload: {
          message: id,
        }
      }
      socket.send(JSON.stringify(messageToServer));

      dispatch(changeOrderStatusInWorkFromServer(updatedOrder));
    })
    .catch((error) => {
      dispatch(
        setError({ status: true, text: "Не удалось изменить задание." })
      );
    });
};

export const changeOrderStatusInWorkFromServer = (updatedOrder) => {
  return {
    type: CHANGE_ORDER_STATUS_IN_WORK,
    payload: updatedOrder,
  };
};

export const changeOrderCustomerStatusRequested = (id) => (
  dispatch,
  setState
) => {
  fetch(`http://localhost:3001/api/orders/requestedChange/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ id }),
  })
    .then((res) => res.json())
    .then((updatedOrder) => {
  
      dispatch(changeOrderStatusInWorkFromServer(updatedOrder));
    })
    .catch((error) => {
      dispatch(
        setError({ status: true, text: "Не удалось изменить задание." })
      );
    });
};

export const changeOrderCustomerStatusRequestedFromServer = (updatedOrder) => {
  return {
    type: CHANGE_ORDER_STATUS_IN_WORK,
    payload: updatedOrder,
  };
};

export const addNewDogFetch = (newDog) => async (dispatch) => {
  const response = await fetch("http://localhost:3001/api/v1/dog", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ newDog }),
  });
  const responseFromServ = await response.json();
  dispatch(addDogAC(responseFromServ));
};

export const addDogAC = (newDog) => {
  return {
    type: ADD_DOG,
    payload: newDog,
  };
};

export const deleteFetchDogAC = (id) => async (dispatch) => {
  console.log(id);
  const response = await fetch(`http://localhost:3001/api/v1/dog/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (response.status === 200) {
    dispatch(deleteDogAC(id));
  }
};

export const deleteDogAC = (id) => {
  return {
    type: DELETE_DOG,
    payload: id,
  };
};

export const editDogFetch = (editDog, id) => async (dispatch) => {
  const response = await fetch(`http://localhost:3001/api/v1/dog/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(editDog, id),
  });
  const responseFromServ = await response.json();
  console.log(responseFromServ, "responseFromServ");
  dispatch(editDogAC(responseFromServ));
};

export const editDogAC = (editDog) => {
  return {
    type: EDIT_DOG,
    payload: editDog,
  };
};

////////

export const uploadAvatarFetch = (formData) => async (dispatch) => {
  try {
    // console.log(formData.get('file'), 'formData');
    const response = await fetch(`http://localhost:3001/user/avatar`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    const responseFromServ = await response.json();
    dispatch(uploadAvatarAC(responseFromServ));
  } catch (e) {
    console.log(e);
  }
};

export const uploadAvatarAC = (avatar) => {
  return {
    type: USER_AVATAR,
    payload: avatar,
  };
};

export const closeOrderCustomer = (id) => (dispatch, setState) => {
  fetch(`http://localhost:3001/api/orders/closed/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ id }),
  })
    .then((res) => res.json())
    .then((closedOrder) => {
      dispatch(changeOrderStatusInWorkFromServer(closedOrder));
    })
    .catch((error) => {
      dispatch(
        setError({ status: true, text: "Не удалось изменить задание." })
      );
    });
};

export const closeOrderCustomerFromServer = (updatedOrder) => {
  return {
    type: CLOSE_ORDER_CUSTOMER,
    payload: updatedOrder,
  };
};

export const changeStatusExecutorInWorkFromServer = (updatedOrder) => {
  return {
    type: CHANGE_ORDER_EXECUTOR_STATUS_IN_WORK,
    payload: updatedOrder,
  };
};
