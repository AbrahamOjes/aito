import {
  USER_LOADED,
  USER_AUTH_ERROR,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT
} from "../../actions/types";

const initialState = {
  userToken: localStorage.getItem("userToken"),
  isUserAuthenticated: null,
  loading: true,
  user: null,
  submissions: null,
  submissionCount: null,
  submissionTarget: null,
  visitTarget: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isUserAuthenticated: true,
        loading: false,
        user: payload.user,
        submissionTarget: payload.submissionTarget,
        visitTarget: payload.visitTarget,
        submissions: payload.submissions,
        submissionCount: payload.submissionCount
      };
    case USER_LOGIN_SUCCESS:
      localStorage.setItem("userToken", payload.userToken);
      return {
        ...state,
        ...payload,
        isUserAuthenticated: true,
        loading: false
      };
    case USER_AUTH_ERROR:
    case USER_LOGIN_FAIL:
    case USER_LOGOUT:
      localStorage.removeItem("userToken");
      return {
        ...state,
        userToken: null,
        isUserAuthenticated: false,
        loading: false
      };
    default:
      return state;
  }
}
