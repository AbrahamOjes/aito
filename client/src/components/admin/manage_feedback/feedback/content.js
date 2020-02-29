import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Spinner from "../../layouts/spinner";
import { setAlert } from "../../../../actions/alert";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { Rate, Empty } from "antd";
import moment from "moment";

import Alert from "../../layouts/alert";

const Content = ({ setAlert, auth: { loading, admin } }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = () => {
    try {
      axios
        .get(`http://localhost:5000/admin/feedbacks/${admin.company}`)
        .then(res => {
          setFeedbacks(res.data);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  // const updateSubjects = subject => {
  //   const updatedSubjects = subjects;
  //   updatedSubjects.push(subject);
  //   setSubjects(updatedSubjects);
  // };

  // const deleteSubject = id => {
  //   try {
  //     axios.delete(`/admin/feedback-subject/${id}`);
  //     const UpdatedSubjects = subjects.filter(subject => {
  //       return subject._id !== id;
  //     });
  //     setSubjects(UpdatedSubjects);
  //     setAlert("Country Deleted", "blue-400");
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const openModalHandler = () => {
  //   setModalIsOpen(true);
  // };

  // const closeModalHandler = () => {
  //   setModalIsOpen(false);
  // };

  // let sn = 1;
  // let modal;

  // if (modalIsOpen) {
  //   modal = (
  //     <Modal closeModal={closeModalHandler} updateSubjects={updateSubjects} />
  //   );
  // }
  return (
    <Fragment>
      <div className="w-full h-screen mx-0 lg:mx-2 mt-16">
        <div className="content-header w-full px-4 py-2 flex justify-between">
          <h1 className="text-lg font-bold text-gray-700">Feedbacks</h1>
          <div>
            {/* <button
              className="mr-2 text-sm text-white font-bold bg-blue-400 py-1 px-2 rounded focus:outline-none"
              onClick={openModalHandler}
            >
              Add
              <i className="fas fa-plus text-white text-sm ml-1" />
            </button> */}
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
              {feedbacks.length > 0 ? (
                <Fragment>
                  {feedbacks.map(feedback => {
                    return (
                      <div
                        className="lg:w-1/3 w-full px-1 mb-2"
                        key={feedback._id}
                      >
                        <div className="bg-white rounded hover:shadow-md w-full h-auto lg:h-32 py-2 text-gray-700 px-3 py-1 relative">
                          <div className="w-full h-full overflow-y-visible lg:overflow-y-auto">
                            <div className="flex items-center">
                              <span className="font-bold text-sm mr-2">
                                {feedback.subject_name}
                              </span>
                              <span className="text-sm">
                                <Rate
                                  className="text-sm"
                                  disabled
                                  defaultValue={feedback.rating}
                                />
                              </span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <span className="text-xs mr-2">
                                {feedback.user_name}
                              </span>
                              <span className="text-xs">
                                {moment(feedback.date).format(
                                  "MMMM Do YYYY, h:mm:ss a"
                                )}
                              </span>
                            </div>
                            <div className="text-sm my-2">
                              <p>{feedback.feedback}</p>
                            </div>
                            <div className=" text-xs text-gray-600 flex font-semibold items-center">
                              <span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  className="w-4 mr-1 icon-store"
                                >
                                  <path
                                    className="primary"
                                    d="M5 8h14a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1zm1 2v7h12v-7H6z"
                                  />
                                  <path
                                    className="secondary"
                                    d="M6 12a4 4 0 0 1-4-4 1 1 0 0 1 .1-.45l2-4A1 1 0 0 1 5 3h14a1 1 0 0 1 .9.55l2 4c.06.14.1.3.1.45a4 4 0 0 1-7 2.65 3.99 3.99 0 0 1-6 0A3.99 3.99 0 0 1 6 12z"
                                  />
                                </svg>
                              </span>
                              <span className="text-xs mr-1">
                                {feedback.outlet_name}
                              </span>{" "}
                              |
                              <span className="text-xs">
                                {feedback.territory_name}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Fragment>
              ) : (
                <div className="mx-auto mt-32">
                  {" "}
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
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.adminAuth
});

export default connect(
  mapStateToProps,
  { setAlert }
)(Content);
