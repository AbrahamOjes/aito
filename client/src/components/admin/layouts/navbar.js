import React from "react";
import { connect } from "react-redux";
import Logo from "../../../img/logo1.png";
import { PropTypes } from "prop-types";
import { logout } from "../../../actions/admin/auth";

const Navbar = ({
  auth: { admin, isAdminAuthenticated, loading },
  logout,
  handleToggle
}) => {
  // console.log(handleToggle);
  return (
    <div>
      <div className="navbar flex items-center justify-between fixed transit top-0 inset-x-0 bg-white h-12 border-b shadow border-blue-100 w-full px-6 z-50">
        <div className="left-navside flex items-center">
          <div className="cursor-pointer" onClick={handleToggle}>
            <span className="w-6 h-1 bg-gray-700 mb-1 block" />
            <span className="w-6 h-1 bg-gray-700 mb-1 block" />
            <span className="w-6 h-1 bg-gray-700 block" />
          </div>
          <div className="logo">
            <img className="ml-3 w-24 h-12" src={Logo} alt="logo" />
          </div>
        </div>
        <div className="flex items-center">
          <div className="right-navside flex items-center mr-2">
            <img
              className="w-8 h-8 hidden sm:block rounded-full object-cover border border-blue-500"
              src={admin && admin.avatar}
              alt=""
            />
            <span className="text-xs text-gray-700 ml-1 ">
              Welcome {admin && admin.name}
            </span>
          </div>
          <div
            className="text-gray-700 text-sm  cursor-pointer"
            onClick={logout}
          >
            <a href="#!">
              <i className="fas fa-sign-out-alt" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.adminAuth
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
