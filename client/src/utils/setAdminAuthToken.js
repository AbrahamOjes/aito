import axios from "axios";

const setAdminAuthToken = token => {
  if (token) {
    axios.defaults.headers.common["admin-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["admin-auth-token"];
  }
};

export default setAdminAuthToken;
