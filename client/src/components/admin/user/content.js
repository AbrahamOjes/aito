import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Spinner from "../layouts/spinner";
import Modal from "./modal";
import { setAlert } from "../../../actions/alert";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import User from "./item";

import Alert from "../layouts/alert";
import { Empty } from "antd";
import Designation from "../designation/designation";

const Content = ({ setAlert, admin }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    try {
      axios
        .get(`http://localhost:5000/admin/users/${admin.company}`)
        .then(res => {
          setUsers(res.data);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const updateUsers = user => {
    const updatedUsers = users;
    updatedUsers.push(user);
    setUsers(updatedUsers);
  };

  const deleteUser = id => {
    try {
      axios.delete(`http://localhost:5000/admin/remove/user/${id}`);
      const UpdatedUsers = users.filter(user => {
        return user._id !== id;
      });
      setUsers(UpdatedUsers);
      setAlert("User Deleted", "blue-400");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const userUpdated = () => {
    fetchUsers();
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
    modal = <Modal closeModal={closeModalHandler} updateUsers={updateUsers} />;
  }
  return (
    <Fragment>
      <div className="w-full h-screen mx-0 lg:mx-2 mt-16">
        {modal}
        <div className="content-header w-full px-4 py-2 flex justify-between">
          <h1 className="text-lg font-bold text-gray-700">Users</h1>
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
            {users.length < 1 ? (
              <div className="mx-auto">
                <Empty />
              </div>
            ) : (
              <Fragment>
                {users.map(user => {
                  return (
                    <User
                      user={user}
                      deleteUser={deleteUser}
                      userUpdated={userUpdated}
                    />
                  );
                })}
              </Fragment>
            )}
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
  admin: state.adminAuth.admin
});

export default connect(
  mapStateToProps,
  { setAlert }
)(Content);
