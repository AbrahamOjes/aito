import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import axios from "axios";
import Modal from "./modal";
import { Rate } from "antd";
import moment from "moment";
import { setAlert } from "../../../actions/alert";
import Spinner from "../layout/spinner";

const Content = ({ authUser: { submissionTarget, visitTarget, user } }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const openModalHandler = () => {
    setModalIsOpen(true);
  };

  const closeModalHandler = () => {
    setModalIsOpen(false);
  };

  const fetchFeedbacks = () => {
    setIsLoading(true);
    try {
      axios
        .get(`http://localhost:5000/user/feedbacks/${user._id}`)
        .then(res => {
          setFeedbacks(res.data);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const deleteFeedback = async id => {
    setIsLoading(true);
    try {
      await axios.delete(`/user/feedback/${id}`);
      const updatedFeedbacks = feedbacks.filter(feedback => {
        return feedback._id !== id;
      });
      setFeedbacks(updatedFeedbacks);
      setAlert("Feedback Deleted", "blue-400");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const updateFeedbacks = feedback => {
    const updatedFeedbacks = feedbacks;
    updatedFeedbacks.unshift(feedback);
    setFeedbacks(updatedFeedbacks);
  };

  let modal;

  if (modalIsOpen) {
    modal = (
      <Modal closeModal={closeModalHandler} updateFeedbacks={updateFeedbacks} />
    );
  }
  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="w-full lg:w-1/2 h-screen mt-16 container mx-auto px-2">
          {feedbacks.length > 0 ? (
            <div>
              {feedbacks.map(feedback => {
                return (
                  <div
                    className="w-full bg-white rounded hover:shadow-md py-2 px-2 mb-2"
                    key={feedback._id}
                  >
                    <div className="flex justify-between">
                      <div className="flex">
                        <div className="text-sm text-gray-700 mr-2 flex flex-col">
                          <span className="font-semibold">
                            {feedback.subject_name}
                          </span>
                          <span className="text-xs text-gray-600">
                            {moment(feedback.date).format(
                              "MMMM Do YYYY, h:mm:ss a"
                            )}
                          </span>
                        </div>
                        <div>
                          <Rate
                            disabled
                            defaultValue={feedback.rating}
                            style={{ fontSize: 14 }}
                          />
                        </div>
                      </div>
                      <div className="text-red-400 hover:text-red-600 text-xs pr-2">
                        <button
                          onClick={() => {
                            deleteFeedback(feedback._id);
                          }}
                        >
                          {" "}
                          <i className="fa fa-trash" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-700 text-sm mt-2">
                        {feedback.feedback}
                      </p>
                    </div>
                    <div className="flex items-center mt-2">
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
                      <span className="text-xs text-gray-600 ">
                        {feedback.outlet_name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center text-gray-600 mt-32">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-12 icon-inbox-upload"
                >
                  <path
                    className="primary"
                    d="M8 4a1 1 0 0 1-1 1H5v10h2a2 2 0 0 1 2 2c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h2V5h-2a1 1 0 0 1 0-2h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h2a1 1 0 0 1 1 1z"
                  />
                  <path
                    className="secondary"
                    d="M11 6.41V13a1 1 0 0 0 2 0V6.41l1.3 1.3a1 1 0 0 0 1.4-1.42l-3-3a1 1 0 0 0-1.4 0l-3 3a1 1 0 0 0 1.4 1.42L11 6.4z"
                  />
                </svg>
              </span>
              <span>No Feedback Submitted</span>
            </div>
          )}
        </div>
      )}

      <span
        className="submit-button bg-white font-semibold w-12 h-12 rounded-full shadow-lg fixed snackbar-button cursor-pointer flex justify-center items-center text-blue-500 outline-none"
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
      {modal}
    </Fragment>
  );
};

Content.propTypes = {
  authUser: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  authUser: state.userAuth
});

export default connect(
  mapStateToProps,
  { setAlert }
)(Content);
