import { combineReducers } from "redux";
import alert from "./alert";
import adminAuth from "./admin/auth";
import userAuth from "./user/auth";

export default combineReducers({
  alert,
  adminAuth,
  userAuth
});
