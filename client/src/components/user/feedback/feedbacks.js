import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import NavBar from "../layout/navbar";
import Content from "./content";
import FooterNav from "../layout/footer_nav";

const Feedbacks = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Redirect to="/Login" />;
  }
  return (
    <Fragment>
      <NavBar title={"Feedbacks"} />
      <Content />
      <FooterNav />
    </Fragment>
  );
};

Feedbacks.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.userAuth.isUserAuthenticated
});

export default connect(mapStateToProps)(Feedbacks);
