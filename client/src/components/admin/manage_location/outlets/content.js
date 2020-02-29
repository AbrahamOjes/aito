import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Spinner from "../../layouts/spinner";
import Modal from "./modal";
import { setAlert } from "../../../../actions/alert";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

import Alert from "../../layouts/alert";

const Content = ({ setAlert }) => {
  const [outlets, setOutlets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    fetchOutlets();
  }, []);

  const fetchOutlets = () => {
    try {
      axios.get("http://localhost:5000/admin/outlets").then(res => {
        console.log(res);
        setOutlets(res.data);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  // const updatecompanies = company => {
  //   const updatedcompanies = companies;
  //   updatedcompanies.push(company);
  //   setcompanies(updatedcompanies);
  // };

  const deleteOutlet = id => {
    try {
      axios.delete(`http://localhost:5000/admin/outlet/${id}`);
      const UpdatedOutlets = outlets.filter(outlet => {
        return outlet._id !== id;
      });
      setOutlets(UpdatedOutlets);
      setAlert("Outlet Deleted", "blue-400");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // const openModalHandler = () => {
  //   setModalIsOpen(true);
  // };

  const closeModalHandler = () => {
    setModalIsOpen(false);
  };

  let sn = 1;
  let modal;

  if (modalIsOpen) {
    modal = <Modal closeModal={closeModalHandler} />;
  }
  return (
    <Fragment>
      <div className="w-full h-screen mx-0 lg:mx-2 mt-16">
        {modal}
        <div className="content-header w-full px-4 py-2 flex justify-between">
          <h1 className="text-lg font-bold text-gray-700">Outlets</h1>
          {/* <div>
            <button
              className="mr-2 text-sm text-white font-bold bg-blue-400 py-1 px-2 rounded focus:outline-none"
              onClick={openModalHandler}
            >
              Add
              <i class="fas fa-plus text-white text-sm ml-1" />
            </button>
          </div> */}
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
                    Outlet
                  </th>
                  <th className="p-3 border-t border-gray-300 text-sm text-gray-600 whitespace-no-wrap text-left">
                    Route
                  </th>
                  <th className="p-3 border-t border-gray-300 text-sm text-gray-600 whitespace-no-wrap text-left">
                    Territory
                  </th>
                  <th className="p-3 border-t border-gray-300 text-sm text-gray-600 whitespace-no-wrap text-left">
                    Region
                  </th>
                  <th className="p-3 border-t border-gray-300 text-sm text-gray-600 whitespace-no-wrap text-left">
                    Delete
                  </th>
                </tr>
                {outlets.map(outlet => (
                  <tr key={outlet._id}>
                    <td className="p-3 border-t border-gray-300 text-sm text-gray-700 whitespace-no-wrap text-left">
                      {sn++}
                    </td>
                    <td className="p-3 capitalize border-t border-gray-300 text-sm text-gray-700 whitespace-no-wrap text-left">
                      {outlet.name}
                    </td>
                    <td className="p-3 capitalize border-t border-gray-300 text-sm text-gray-700 whitespace-no-wrap text-left">
                      {outlet.route_name}
                    </td>
                    <td className="p-3 capitalize border-t border-gray-300 text-sm text-gray-700 whitespace-no-wrap text-left">
                      {outlet.territory_name}
                    </td>
                    <td className="p-3 capitalize border-t border-gray-300 text-sm text-gray-700 whitespace-no-wrap text-left">
                      {outlet.region_name}
                    </td>
                    <td className="px-3 pt-3 pb-2 border-t border-gray-300 text-sm text-gray-600 whitespace-no-wrap text-left">
                      <button
                        onClick={() => {
                          deleteOutlet(outlet._id);
                        }}
                      >
                        <i className="far fa-times-circle text-lg " />
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
