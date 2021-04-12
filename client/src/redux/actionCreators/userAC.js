import { ADD_DOG } from "../types/dogTypes";
import { AUTH, SAGA_SIGNUP, SAGA_SIGN_IN, SIGN_IN, EDIT_USER, ADD_ORDER_CUSTOMER } from "../types/usertypes";

export const sagaSignupAC = ({
  email,
  firstname,
  lastname,
  kind,
  password,
  district,
  passport,
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
  // console.log(resFromServer)
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

    fetch('http://localhost:3001/api/customer/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(order),
    })
      .then(response => response.json())
      .then((newOrder) => {
        console.log(newOrder); 
        dispatch(addOrderCustomerFromServer(newOrder))
        // return history.push('/account');
      })
  }
};

export const addOrderCustomerFromServer = (newOrder) => {
  return {
    type: ADD_ORDER_CUSTOMER,
    payload: newOrder,
  };
};

export const addNewDogFetch = (newDog) => async (dispatch) => {
  const response = await fetch('http://localhost:3001/api/v1/dog', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ newDog })
  })
  const responseFromServ = await response.json()
  dispatch(addDogAC(responseFromServ))
}

export const addDogAC = (newDog) => {
  return {
    type: ADD_DOG,
    payload: newDog,
  }
};
