import {
  ADMIN_LOADED,
  ADMIN_AUTH_ERROR,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGOUT
} from "../../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAdminAuthenticated: null,
  loading: true,
  admin: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADMIN_LOADED:
      return {
        ...state,
        isAdminAuthenticated: true,
        loading: false,
        admin: payload
      };
    case ADMIN_LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAdminAuthenticated: true,
        loading: false
      };
    case ADMIN_AUTH_ERROR:
    case ADMIN_LOGIN_FAIL:
    case ADMIN_LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAdminAuthenticated: false,
        loading: false
      };
    default:
      return state;
  }
}
