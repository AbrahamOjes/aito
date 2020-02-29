import axios from "axios";
import {
  ADMIN_LOADED,
  ADMIN_AUTH_ERROR,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGOUT
} from "../types";
import { setAlert } from "../alert";
import setAdminAuthToken from "../../utils/setAdminAuthToken";

//Load User
export const loadAdmin = () => async dispatch => {
  if (localStorage.token) {
    setAdminAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("http://localhost:5000/admin/auth");
    dispatch({
      type: ADMIN_LOADED,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: ADMIN_AUTH_ERROR
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
export const login = ({ email, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(
      "http://localhost:5000/admin/signin",
      body,
      config
    );
    dispatch({
      type: ADMIN_LOGIN_SUCCESS,
      payload: res.data
    });
    console.log(res.data);
    dispatch(loadAdmin());
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      console.log(errors);
      errors.forEach(error => dispatch(setAlert(error.msg, "red-400")));
    }
    dispatch({
      type: ADMIN_LOGIN_FAIL
    });
  }
};

//Logout / clear everything
export const logout = () => dispatch => {
  dispatch({
    type: ADMIN_LOGOUT
  });
};
