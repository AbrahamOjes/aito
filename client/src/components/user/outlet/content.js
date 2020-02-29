import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Modal from "./modal";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import {Empty} from "antd";

const Content = ({ auth: { user } }) => {
  useEffect(() => {
    fetchOutlets();
  }, []);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [outlets, setOutlets] = useState([]);

  const openModalHandler = () => {
    setModalIsOpen(true);
  };

  const closeModalHandler = () => {
    setModalIsOpen(false);
  };

  const fetchOutlets = () => {
    try {
      axios.get(`http://localhost:5000/user/${user._id}/outlets`).then(res => {
        setOutlets(res.data);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const updateOutlets = outlet => {
    const updatedOutlets = outlets;
    updatedOutlets.push(outlet);
    setOutlets(updatedOutlets);
  };

  let modal;

  if (modalIsOpen) {
    modal = <Modal closeModal={closeModalHandler} updateOutlets={updateOutlets} />;
  }

  return (
    <Fragment>
      <div className="w-full lg:w-1/2 mx-auto mt-16">
        {outlets.length > 0 ? (
          <div>
            {outlets.map(outlet => {
          return (
            <div
              className="bg-white w-full h-28 mb-2 flex hover:shadow-lg"
              key={outlet._id}
            >
              <div className="img-wrapper h-full overflow-hidden px-2 pt-2 pb-4">
                <span className="overflow-hidden">
                  <img
                    className="w-24 h-24 rounded"
                    src={outlet.image}
                    alt=""
                  />
                </span>
              </div>
              <div className="outlet-details px-2 flex flex-col justify-center">
                <div className="mb-0">
                  <h2 className="outlet-title text-gray-700 text-sm font-semibold leading-tight">
                    {outlet.name}
                  </h2>
                  <p className="text-gray-600 text-xs leading-tight mt-1">
                    {outlet.address}
                  </p>
                  <div className="text-gray-600 text-xs leading-tight mt-1">
                    <p>
                      <i className="fa fa-map mr-1" />
                      {outlet.route_name}, {outlet.territory_name},
                      <span className="ml-1">{outlet.region_name},</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
          </div>
        ):(<div className="flex flex-col justify-center items-center text-gray-600 mt-8">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-12 icon-inbox-upload"><path className="primary" d="M8 4a1 1 0 0 1-1 1H5v10h2a2 2 0 0 1 2 2c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h2V5h-2a1 1 0 0 1 0-2h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h2a1 1 0 0 1 1 1z"/><path className="secondary" d="M11 6.41V13a1 1 0 0 0 2 0V6.41l1.3 1.3a1 1 0 0 0 1.4-1.42l-3-3a1 1 0 0 0-1.4 0l-3 3a1 1 0 0 0 1.4 1.42L11 6.4z"/></svg>
            </span>
            <span>
              No Outlets
            </span>
          </div>)}
        <span
          className="submit-button bg-white font-semibold w-12 h-12 z-100 rounded-full shadow-lg fixed snackbar-button cursor-pointer flex justify-center items-center text-blue-500"
          onClick={openModalHandler}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="fill-current w-12 icon-add"
          >
            <path d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z" />
          </svg>
        </span>
      </div>
      {modal}
    </Fragment>
  );
};

Content.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.userAuth
});

export default connect(mapStateToProps)(Content);
