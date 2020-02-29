import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import Spinner from "../layout/spinner";
import { Alert } from "antd";
import store from "../../../store";
import { loadUser } from "../../../actions/user/auth";

const EditProfile = ({ isAuthenticated, loading, userAuth: { user } }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    user_id: user._id
  });

  const [alert, setAlert] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [showButton, setShowButton] = useState(false);

  if (!isAuthenticated) {
    return <Redirect to="/Login" />;
  }

  const { name, email, phone } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setShowButton(true);
  };

  const submitForm = async e => {
    e.preventDefault();
    if (name === "") {
      setTimeout(() => {
        setError(null);
      }, 5000);
      return setError(" Name is Required");
    } else if (email === "") {
      setTimeout(() => {
        setError(null);
      }, 5000);
      return setError(" Email is Required");
    } else if (phone === "") {
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
    console.log(formData);
    setIsLoading(true);
    const body = JSON.stringify(formData);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const res = await axios.put(
        "http://localhost:5000/user/update-profile",
        body,
        config
      );
      console.log(res.data);
      setAlert(res.data.msg);
      setTimeout(() => {
        setAlert(null);
        store.dispatch(loadUser());
      }, 4000);
      setIsLoading(false);
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    }
  };

  let showAlert;
  if (alert) {
    showAlert = (
      <Alert
        message="Successfull"
        description={alert}
        type="success"
        showIcon
      />
    );
  }

  return (
    <Fragment>
      {isLoading ? <Spinner /> : ""}
      {loading ? <Spinner /> : ""}
      <div className="w-full h-screen">
        <div className="bg-white h-12 w-full flex items-center justify-center leading px-2 relative shadow-md">
          <div className="flex items-center absolute" style={{ left: "5px" }}>
            <Link to="/user/account">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 mr-1 icon-arrow-thin-left-circle"
              >
                <circle cx="12" cy="12" r="10" className="primary" />
                <path
                  className="secondary"
                  d="M9.41 11H17a1 1 0 0 1 0 2H9.41l2.3 2.3a1 1 0 1 1-1.42 1.4l-4-4a1 1 0 0 1 0-1.4l4-4a1 1 0 0 1 1.42 1.4L9.4 11z"
                />
              </svg>
            </Link>
          </div>
          <div className="flex justify-center">
            <h3 className="text-gray-700 font-semibold text-lg text-gray-700 leading">
              Edit Profile
            </h3>
          </div>
        </div>
        <div className="w-full lg:w-1/2 mb-4 mt-12 px-2 mx-auto">
          {showAlert}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={e => onChange(e)}
              required
            />
          </div>
          {showButton ? (
            <div className="mb-2">
              {isLoading ? (
                <button className="bg-blue-500 w-full rounded shadow-md flex justify-center">
                  <img
                    src={require("../../../img/Spinner2.svg")}
                    alt="Spinner"
                  />
                </button>
              ) : (
                <button
                  className="w-full bg-blue-500 text-white py-2 font-semibold shadow-md rounded"
                  onClick={submitForm}
                >
                  Update
                </button>
              )}
            </div>
          ) : (
            <Alert
              message="Note"
              description="To update the above information, start editing the information and an update button will appear"
              type="info"
              showIcon
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};
EditProfile.propTypes = {
  userAuth: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.userAuth.isUserAuthenticated,
  userAuth: state.userAuth,
  loading: state.userAuth.loading
});
export default connect(
  mapStateToProps,
  null
)(EditProfile);
