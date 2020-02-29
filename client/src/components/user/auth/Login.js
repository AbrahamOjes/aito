import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../../actions/alert";
import { login } from "../../../actions/user/auth";
import { Link, Redirect } from "react-router-dom";
// import Alert from "../../admin/layouts/alert";
import Spinner from "../../admin/layouts/spinner";
import PropTypes from "prop-types";

const Login = ({ setAlert, login, isUserAuthenticated, loading }) => {
  const [formData, setFormData] = useState({
    phone: "",
    password: ""
  });
  const { phone, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login({ phone, password });

    // try {
    //   const config = {
    //     headers: {
    //       "Content-Type": "application/json"
    //     }
    //   };

    //   const body = JSON.stringify(user);
    //   const res = await axios.post("/admin/signin", body, config);
    //   console.log(res.data);
    // } catch (error) {
    //   console.error(error.response.data);
    // }
  };

  //Redirect if logged in
  if (isUserAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return loading ? (
    <Spinner />
  ) : (
    <div className="user-login w-full max-w-sm center-pos mt-5 mb-2 px-4">
      <div className="logo flex justify-center">
        <img
          className="w-32 h-16"
          src={require("../../../img/logo1.png")}
          alt="logo"
        />
      </div>
      <form
        className="rounded px-8 pt-2 pb-8 mb-4 rounded-lg"
        onSubmit={e => onSubmit(e)}
      >
        <h1 className="font-bold text-center text-gray-700 text-lg mb-2">
          Welcome Back
        </h1>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Phone
          </label>
          <input
            className="shadow appearance-none border border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Phone"
            name="phone"
            value={phone}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-gray-600">
            <input className="mr-2 leading-tight" type="checkbox" />
            <span className="text-sm">Remember me</span>
          </label>
          <Link
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            to="/forget-password"
          >
            Forgot Password?
          </Link>
        </div>
        <div>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Log In
          </button>
        </div>
        {/* <div className="flex items-center justify-between my-4">
          <span className="text-sm text-gray-600">No account?</span>
          <Link
            className="inline-block align-baseline text-sm text-blue-500 hover:text-blue-800"
            to="/register"
          >
            Create one here
          </Link>
        </div> */}
      </form>
      <p className="text-center text-gray-500 text-xs">
        &copy;2019 Field Execution Tracking Application. All rights reserved.
      </p>
    </div>
  );
};

Login.propTypes = {
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isUserAuthenticated: PropTypes.bool,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  isUserAuthenticated: state.userAuth.isUserAuthenticated,
  loading: state.userAuth.loading
});

export default connect(
  mapStateToProps,
  { setAlert, login }
)(Login);
