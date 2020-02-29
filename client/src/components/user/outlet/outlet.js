import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import NavBar from "../layout/navbar";
import Content from "./content";
import FooterNav from "../layout/footer_nav";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

const Outlet = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }
  return (
    <Fragment>
      <NavBar title={"Outlets"} />
      <FooterNav />
      <Content />
    </Fragment>
  );
};

Outlet.propTypes = {
  // setAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.userAuth.isUserAuthenticated
  // loading: state.adminAuth.loading
});

export default connect(mapStateToProps)(Outlet);
