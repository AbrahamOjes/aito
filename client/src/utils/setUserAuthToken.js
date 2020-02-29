import axios from "axios";

const setUserAuthToken = userToken => {
  if (userToken) {
    axios.defaults.headers.common["user-auth-token"] = userToken;
  } else {
    delete axios.defaults.headers.common["user-auth-token"];
  }
};

export default setUserAuthToken;
