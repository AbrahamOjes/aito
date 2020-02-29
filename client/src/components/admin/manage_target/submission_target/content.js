import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Spinner from "../../layouts/spinner";
import Modal from "./modal";
import { setAlert } from "../../../../actions/alert";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import Target from "./item";

import Alert from "../../layouts/alert";
import { Empty } from "antd";

const Content = ({ setAlert, admin }) => {
  const [targets, setTargets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    fetchTargets();
  }, []);

  const fetchTargets = () => {
    try {
      axios
        .get(`http://localhost:5000/admin/submission-targets/${admin.company}`)
        .then(res => {
          setTargets(res.data);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const updateTarget = target => {
    const updatedTargets = targets;
    updatedTargets.push(target);
    setTargets(updatedTargets);
  };

  const deleteTarget = id => {
    try {
      axios.delete(`/admin/submission-target/${id}`);
      const updatedTargets = targets.filter(target => {
        return target._id !== id;
      });
      setTargets(updatedTargets);
      setAlert("Target Deleted", "blue-400");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const targetUpdated = () => {
    fetchTargets();
  };

  const openModalHandler = () => {
    setModalIsOpen(true);
  };

  const closeModalHandler = () => {
    setModalIsOpen(false);
  };

  let sn = 1;
  let modal;

  if (modalIsOpen) {
    modal = (
      <Modal closeModal={closeModalHandler} updateTargets={updateTarget} />
    );
  }
  return (
    <Fragment>
      <div className="w-full h-screen mx-0 lg:mx-2 mt-16">
        {modal}
        <div className="content-header w-full px-4 py-2 flex justify-between">
          <h1 className="text-lg font-bold text-gray-700">Visit Targets</h1>
          <div>
            <button
              className="mr-2 text-sm text-white font-bold bg-blue-400 py-1 px-2 rounded focus:outline-none"
              onClick={openModalHandler}
            >
              Add
              <i className="fas fa-plus text-white text-sm ml-1" />
            </button>
          </div>
        </div>
        <div className="text-center">
          <Alert />
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="content-body px-2 flex lg:flex-row flex-wrap flex-col">
            <Fragment>
              {targets.length > 0 ? (
                targets.map(target => {
                  return (
                    <Target
                      target={target}
                      deleteTarget={deleteTarget}
                      targetUpdated={targetUpdated}
                    />
                  );
                })
              ) : (
                <div className="mx-auto mt-32">
                  <Empty />
                </div>
              )}
            </Fragment>
          </div>
        )}
      </div>
    </Fragment>
  );
};

Content.propTypes = {
  setAlert: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  // isAdminAuthenticated: state.adminAuth.isAdminAuthenticated,
  // loading: state.adminAuth.loading
  admin: state.adminAuth.admin
});

export default connect(
  mapStateToProps,
  { setAlert }
)(Content);
