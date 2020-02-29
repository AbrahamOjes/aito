import axios from "axios";
import {
  USER_LOADED,
  USER_AUTH_ERROR,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT
} from "../types";
import { setAlert } from "../alert";
import setUserAuthToken from "../../utils/setUserAuthToken";

//Load User
export const loadUser = () => async dispatch => {
  if (localStorage.userToken) {
    setUserAuthToken(localStorage.userToken);
  }
  try {
    const res = await axios.get("http://localhost:5000/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: USER_AUTH_ERROR
    });
  }
};

//Register User
// export const register = ({ name, email, password }) => async dispatch => {
//     const config = {
//         headers: {
//             "Content-Type": "application/json"
//         }
//     };

//     const body = JSON.stringify({ name, email, password });

//     try {
//         const res = await axios.post("/api/users", body, config);
//         dispatch({
//             type: REGISTER_SUCCESS,
//             payload: res.data
//         });
//         dispatch(loadUser());
//     } catch (error) {
//         const errors = error.response.data.errors;
//         if (errors) {
//             errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
//         }
//         dispatch({
//             type: REGISTER_FAIL
//         });
//     }
// };

//Login User
export const login = ({ phone, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ phone, password });

  try {
    const res = await axios.post("http://localhost:5000/signin", body, config);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: res.data
    });
    console.log(res.data);
    dispatch(loadUser());
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "red-400")));
    }
    dispatch({
      type: USER_LOGIN_FAIL
    });
  }
};

//Logout / clear everything
export const logout = () => dispatch => {
  dispatch({
    type: USER_LOGOUT
  });
};
