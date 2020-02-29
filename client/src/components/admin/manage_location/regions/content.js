import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Spinner from "../../layouts/spinner";
import Modal from "./modal";
import { setAlert } from "../../../../actions/alert";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

import Alert from "../../layouts/alert";

const Content = ({ setAlert }) => {
  const [regions, setRegions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    fetchRegions();
  }, []);

  const fetchRegions = () => {
    try {
      axios.get("http://localhost:5000/admin/regions").then(res => {
        console.log(res);
        setRegions(res.data);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const updateRegions = region => {
    const updatedRegions = regions;
    updatedRegions.push(region);
    setRegions(updatedRegions);
  };

  const deleteRegion = id => {
    try {
      axios.delete(`/admin/region/${id}`);
      const UpdatedRegions = regions.filter(region => {
        return region._id !== id;
      });
      setRegions(UpdatedRegions);
      setAlert("Region Deleted", "blue-400");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
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
      <Modal closeModal={closeModalHandler} updateRegions={updateRegions} />
    );
  }
  return (
    <Fragment>
      <div className="w-full h-screen mx-0 lg:mx-2 mt-16">
        {modal}
        <div className="content-header w-full px-4 py-2 flex justify-between">
          <h1 className="text-lg font-bold text-gray-700">Regions</h1>
          <div>
            <button
              className="mr-2 text-sm text-white font-bold bg-blue-400 py-1 px-2 rounded focus:outline-none"
              onClick={openModalHandler}
            >
              Add
              <i class="fas fa-plus text-white text-sm ml-1" />
            </button>
          </div>
        </div>
        <div className="text-center">
          <Alert />
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="content-body px-2">
            <table className="w-full text-center text-gray-700 bg-white rounded-lg shadow">
              <tbody>
                <tr className="bg-blue-050">
                  <th className="p-3 border-t border-gray-300 text-sm text-gray-600 whitespace-no-wrap text-left">
                    #
                  </th>
                  <th className="p-3 border-t border-gray-300 text-sm text-gray-600 whitespace-no-wrap text-left">
                    Name
                  </th>
                  <th className="p-3 border-t border-gray-300 text-sm text-gray-600 whitespace-no-wrap text-left">
                    Delete
                  </th>
                </tr>
                {regions.map(region => (
                  <tr key={region._id}>
                    <td className="p-3 border-t border-gray-300 text-sm text-gray-700 whitespace-no-wrap text-left">
                      {sn++}
                    </td>
                    <td className="p-3 capitalize border-t border-gray-300 text-sm text-gray-700 whitespace-no-wrap text-left">
                      {region.name}
                    </td>
                    <td className="px-3 pt-3 pb-2 border-t border-gray-300 text-sm text-gray-600 whitespace-no-wrap text-left">
                      <button
                        onClick={() => {
                          deleteRegion(region._id);
                        }}
                      >
                        <i class="far fa-times-circle text-lg " />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Fragment>
  );
};

Content.propTypes = {
  setAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  // isAdminAuthenticated: state.adminAuth.isAdminAuthenticated,
  // loading: state.adminAuth.loading
});

export default connect(
  mapStateToProps,
  { setAlert }
)(Content);
