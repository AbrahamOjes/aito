import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

const Routes = ({ isAuthenticated, userAuth: { user } }) => {
  if (!isAuthenticated) {
    return <Redirect to="/Login" />;
  }

  console.log(user);

  return (
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
            Assigned Routes
          </h3>
        </div>
      </div>
      <div className="w-full lg:w-1/2 mt-4 px-2 mx-auto">
        <h4 className=" font-semibold text-gray-700 text-sm">
          Territory: Marian Calabar South
        </h4>
        <div className="flex flex-col mt-2">
          {user.routes.map((route, index) => {
            return (
              <span
                className="border-b border-gray-400 py-2 px-2 text-gray-700 text-sm"
                key={index}
              >
                {route}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};
Routes.propTypes = {
  userAuth: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.userAuth.isUserAuthenticated,
  userAuth: state.userAuth
});
export default connect(
  mapStateToProps,
  null
)(Routes);
