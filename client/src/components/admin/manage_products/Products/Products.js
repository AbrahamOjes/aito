import React, { Fragment, useState } from "react";
import { PropTypes } from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "../../layouts/navbar";
import Sidebar from "../../layouts/sidebar";
import Spinner from "../../layouts/spinner";
import Content from "./content";
import Footer from "../../layouts/footer";

const Products = ({ isAdminAuthenticated, auth: { loading } }) => {
  // Redirect if logged in
  const [isOpen, setIsOpen] = useState(true);
  if (!isAdminAuthenticated) {
    return <Redirect to="/admin/login" />;
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  let sideBar;

  if (isOpen) {
    sideBar = <Sidebar />;
  }

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Navbar handleToggle={toggleSidebar} />
      <div className="flex">
        {sideBar}
        <Content />
      </div>
      <Footer />
    </Fragment>
  );
};

Products.propTypes = {
  isAdminAuthenticated: PropTypes.bool,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isAdminAuthenticated: state.adminAuth.isAdminAuthenticated,
  auth: state.adminAuth
});

export default connect(mapStateToProps)(Products);
