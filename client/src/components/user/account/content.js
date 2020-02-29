import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { setAlert } from "../../../actions/alert";
import { logout } from "../../../actions/user/auth";

const Content = ({ authUser: { user }, logout }) => {
  return (
    <Fragment>
      <div className="w-full lg:w-1/2 h-screen mt-16 container mx-auto px-2">
        <div className="h-1/3 w-full border-b border-gray-400 flex flex-col items-center justify-center">
          <div>
            <img className="w-24 h-24 rounded-full" src={user.avatar} alt="" />
          </div>
          <div className="text-center text-gray-600">
            <h3 className="font-bold text-base">{user.name}</h3>
            <h3 className="text-sm">Designation: {user.designation_name}</h3>
            <h3 className="text-sm">
              Assigned Territory: {user.territory_name}
            </h3>
          </div>
        </div>
        <div className="more-list mb-2">
          <Link
            to="/user/edit-profile"
            className="py-3 border-b border-gray-400 block text-gray-600 flex items-center px-2"
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-5 mr-4 icon-edit"
              >
                <path
                  className="primary"
                  d="M4 14a1 1 0 0 1 .3-.7l11-11a1 1 0 0 1 1.4 0l3 3a1 1 0 0 1 0 1.4l-11 11a1 1 0 0 1-.7.3H5a1 1 0 0 1-1-1v-3z"
                />
                <rect
                  width="20"
                  height="2"
                  x="2"
                  y="20"
                  className="secondary"
                  rx="1"
                />
              </svg>
            </span>
            <span className="text-gray-700 text-sm">Edit Profile</span>
          </Link>
          <Link
            to="/user/routes"
            className="py-3 border-b border-gray-400 block text-gray-600 flex items-center px-2"
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-5 mr-4 icon-sign"
              >
                <path
                  className="primary"
                  d="M14 12h5l3 3-3 3h-5v4h-4v-4H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h6v-1h4v1z"
                />
                <path
                  className="secondary"
                  d="M10 4a2 2 0 1 1 4 0h6a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5L2 7l3-3h5z"
                />
              </svg>
            </span>
            <span className="text-gray-700 text-sm">Assigned Routes</span>
          </Link>
          <span
            className="py-3 border-b border-gray-400 block text-gray-600 flex items-center px-2 cursor-pointer"
            onClick={logout}
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-5 mr-4 icon-door-exit"
              >
                <path
                  className="primary"
                  d="M11 4h3a1 1 0 0 1 1 1v3a1 1 0 0 1-2 0V6h-2v12h2v-2a1 1 0 0 1 2 0v3a1 1 0 0 1-1 1h-3v1a1 1 0 0 1-1.27.96l-6.98-2A1 1 0 0 1 2 19V5a1 1 0 0 1 .75-.97l6.98-2A1 1 0 0 1 11 3v1z"
                />
                <path
                  className="secondary"
                  d="M18.59 11l-1.3-1.3c-.94-.94.47-2.35 1.42-1.4l3 3a1 1 0 0 1 0 1.4l-3 3c-.95.95-2.36-.46-1.42-1.4l1.3-1.3H14a1 1 0 0 1 0-2h4.59z"
                />
              </svg>
            </span>
            <span className="text-gray-700 text-sm">Logout</span>
          </span>
        </div>
      </div>
    </Fragment>
  );
};

Content.propTypes = {
  authUser: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  authUser: state.userAuth
});

export default connect(
  mapStateToProps,
  { setAlert, logout }
)(Content);
