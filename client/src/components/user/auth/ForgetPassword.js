import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

const ForgetPassword = () => {
  const [showResetForm, setResetForm] = useState(true);
  const [showVerificationForm, setVerificationForm] = useState(false);
  const [showChangeForm, setChangeForm] = useState(false);
  let formToShow;

  const [formPhone, setFormPhone] = useState({
    phone: ""
  });

  const [formToken, setFormToken] = useState({
    code: ""
  });

  const [formChange, setFormChange] = useState({
    password: "",
    confirmPassword: "",
    userId: ""
  });

  const [errors, setErrors] = useState(null);
  const [alert, setAlert] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { phone } = formPhone;
  const { code } = formToken;
  const { password, confirmPassword } = formChange;

  const onChangePhone = e =>
    setFormPhone({ ...formPhone, [e.target.name]: e.target.value });

  const onChangeToken = e =>
    setFormToken({ ...formToken, [e.target.name]: e.target.value });

  const onChangePassword = e =>
    setFormChange({ ...formChange, [e.target.name]: e.target.value });

  const onSubmitPhone = async e => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };

      const body = JSON.stringify(formPhone);
      const res = await axios.post("/forgot-password", body, config);
      setResetForm(false);
      setVerificationForm(true);
      setChangeForm(false);
      setIsLoading(false);
      // console.log(res);
    } catch (error) {
      // console.error(error.response.data.errors[0].msg);
      setErrors(error.response.data.errors[0].msg);
      setIsLoading(false);
      setTimeout(() => {
        setErrors(null);
      }, 5000);
    }
  };

  const onSubmitToken = async e => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };

      const body = JSON.stringify(formToken);
      const res = await axios.post("/verify-token", body, config);
      setResetForm(false);
      setVerificationForm(false);
      setChangeForm(true);
      // console.log(res.data.token);
      setFormChange({ ...formChange, userId: res.data.token.user });
      setIsLoading(false);
    } catch (error) {
      // console.error(error.response.data.errors[0].msg);
      setErrors(error.response.data.errors[0].msg);
      setTimeout(() => {
        setErrors(null);
      }, 5000);
      setIsLoading(false);
    }
  };

  const onSubmitPassword = async e => {
    e.preventDefault();
    setIsLoading(true);
    if (password === "") {
      setIsLoading(false);
      setTimeout(() => {
        setErrors(null);
      }, 5000);
      return setErrors("Password is required");
    } else if (confirmPassword === "") {
      setIsLoading(false);
      setTimeout(() => {
        setErrors(null);
      }, 5000);
      return setErrors("Confirm Password is required");
    } else if (password < 6) {
      setIsLoading(false);
      setTimeout(() => {
        setErrors(null);
      }, 5000);
      return setErrors("Password must be minimum of 6 Characters");
    } else if (password !== confirmPassword) {
      setIsLoading(false);
      setTimeout(() => {
        setErrors(null);
      }, 5000);
      return setErrors("Passwords does not match");
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };

      const body = JSON.stringify(formChange);
      const res = await axios.post(`/change-password`, body, config);
      setResetForm(false);
      setVerificationForm(false);
      setChangeForm(true);
      setAlert(res.data.msg);
      setFormChange({ ...formChange, password: "", confirmPassword: "" });
      setIsLoading(false);
      setTimeout(() => {
        setAlert(null);
      }, 5000);
    } catch (error) {
      // console.error(error.response.data.errors[0].msg);
      setErrors(error.response.data.errors[0].msg);
      setTimeout(() => {
        setErrors(null);
      }, 5000);
      setIsLoading(false);
    }
  };

  let errorAlerts;
  let successAlert;

  if (errors) {
    errorAlerts = (
      <div className="bg-red-400 text-white font-semibold text-center py-3 px-2 mb-2">
        {errors}
      </div>
    );
  }

  if (alert) {
    successAlert = (
      <div className="bg-green-400 text-white font-semibold text-center py-3 px-2 mb-2">
        {alert}
      </div>
    );
  }

  if (showResetForm) {
    formToShow = (
      <form
        className="rounded px-8 pb-8 mb-1 rounded-lg mb-2"
        onSubmit={onSubmitPhone}
      >
        <h1 className="font-bold text-center text-gray-700 text-lg mb-2">
          Forgot Password
        </h1>
        <p className="mb-4 text-gray-700 text-xs text-center">
          Enter your registered phone number below to recieve a password reset
          code
        </p>

        {errorAlerts}
        <div className="mb-4">
          <input
            className="shadow appearance-none border border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Phone Number"
            name="phone"
            value={phone}
            onChange={e => onChangePhone(e)}
            required
          />
        </div>
        <div>
          {isLoading ? (
            <button className="bg-red-300 shadow px-8 rounded w-full text-center py-1 rounded flex justify-center">
              <img src={require("../../../img/Spinner2.svg")} alt="Spinner" />
            </button>
          ) : (
            <button
              className="bg-red-300 hover:bg-red-500 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Reset Password
            </button>
          )}
        </div>
        <div className="text-center my-4">
          <Link
            className="inline-block align-baseline text-sm font-semibold text-blue-500 hover:text-blue-800"
            to="/login"
          >
            Back to login
          </Link>
        </div>
      </form>
    );
  }

  if (showVerificationForm) {
    formToShow = (
      <form
        className="rounded px-8 pb-8 mb-1 rounded-lg mb-2"
        onSubmit={onSubmitToken}
      >
        <h1 className="font-bold text-center text-gray-700 text-lg mb-2">
          Code Verification
        </h1>
        <p className="mb-4 text-gray-700 text-xs text-center">
          Enter your password reset code sent to your email/phone
        </p>
        {errorAlerts}
        <div className="mb-4">
          <input
            className="shadow appearance-none border border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Enter code"
            name="code"
            value={code}
            onChange={e => onChangeToken(e)}
            required
          />
        </div>
        <div>
          {isLoading ? (
            <button className="bg-blue-400 shadow px-8 rounded w-full text-center py-1 rounded flex justify-center">
              <img src={require("../../../img/Spinner2.svg")} alt="Spinner" />
            </button>
          ) : (
            <button
              className="bg-blue-400 hover:bg-blue-500 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Verify
            </button>
          )}
        </div>
        <div className="text-center my-4">
          <Link
            className="inline-block align-baseline text-sm font-semibold text-blue-500 hover:text-blue-800"
            to="/login"
          >
            Back to login
          </Link>
        </div>
      </form>
    );
  }

  if (showChangeForm) {
    formToShow = (
      <form
        className="rounded px-8 pb-8 mb-1 rounded-lg"
        onSubmit={onSubmitPassword}
      >
        <h1 className="font-bold text-center text-gray-700 text-lg mb-2">
          Change Password
        </h1>
        <p className="mb-4 text-gray-700 text-xs text-center">
          Enter your new password
        </p>
        {errorAlerts}
        {successAlert}
        <div className="mb-4">
          <input
            className="shadow appearance-none border border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e => onChangePassword(e)}
            required
          />
        </div>
        <div className="mb-4">
          <input
            className="shadow appearance-none border border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={e => onChangePassword(e)}
            required
          />
        </div>
        <div>
          {isLoading ? (
            <button className="bg-green-500 shadow px-8 rounded w-full text-center py-1 rounded flex justify-center">
              <img src={require("../../../img/Spinner2.svg")} alt="Spinner" />
            </button>
          ) : (
            <button
              className="bg-green-500 hover:bg-green-700 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Change Password
            </button>
          )}
        </div>
        <div className="text-center my-4">
          <Link
            className="inline-block align-baseline text-sm font-semibold text-blue-500 hover:text-blue-800"
            to="/login"
          >
            Back to login
          </Link>
        </div>
      </form>
    );
  }

  return (
    <div className="user-login w-full max-w-sm center-pos mt-5 mb-2 px-4">
      <div className="logo flex justify-center">
        <img
          className="w-32 h-16"
          src={require("../../../img/logo1.png")}
          alt="logo"
        />
      </div>
      {formToShow}
      <p className="text-center text-gray-500 text-xs">
        &copy;2019 Field Execution Tracking Application. All rights reserved.
      </p>
    </div>
  );
};

export default ForgetPassword;
