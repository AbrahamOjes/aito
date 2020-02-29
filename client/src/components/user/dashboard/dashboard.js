import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import NavBar from "../layout/navbar";
import Content from "./content";
import FooterNav from "../layout/footer_nav";

const Dashboard = ({ isAuthenticated, user }) => {
  if (!isAuthenticated) {
    return <Redirect to="/Login" />;
  }

  // const openMoreHandler = () => {
  //   setMoreIsOpen(true);
  // };

  // const closeMoreHandler = () => {
  //   setMoreIsOpen(false);
  // };

  // let more;

  // if (moreIsOpen) {
  //   more = <More user={user} closeMore={closeMoreHandler}/>;
  // }
  return (
    <Fragment>
      <NavBar title={"Dashboard"} />
      <Content />
      <FooterNav />
    </Fragment>
  );
};

Dashboard.propTypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  isAuthenticated: state.userAuth.isUserAuthenticated,
  user: state.userAuth.user
});

export default connect(mapStateToProps)(Dashboard);
