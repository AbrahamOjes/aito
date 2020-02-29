import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import axios from "axios";
import Modal from "./modal";
import { Empty } from "antd";
import moment from "moment";

const Content = ({
  authUser: { submissionTarget, visitTarget, submissions, submissionCount }
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModalHandler = () => {
    setModalIsOpen(true);
  };

  const closeModalHandler = () => {
    setModalIsOpen(false);
  };

  const visitPercent = Math.round(
    (submissionCount / submissionTarget.target) * 100
  );
  const submissionPercent = Math.round(
    (submissionCount / visitTarget.target) * 100
  );

  const slicedSubmission = submissions.slice(5);

  console.log(slicedSubmission);

  let modal;

  if (modalIsOpen) {
    modal = <Modal closeModal={closeModalHandler} />;
  }
  return (
    <Fragment>
      <div className="w-full lg:w-1/2 h-screen mt-16 container mx-auto px-2">
        <h2 className="text-gray-700 text-base font-semibold">Targets</h2>
        <div className="stat-section flex flex-no-wrap overflow-x-auto py-2 scrolling-wrapper">
          <div className="bg-blue-500 w-4/5 h-auto mr-2 rounded flex-none flex-none p-2 shadow-lg">
            <div className="card-header flex justify-between text-gray-200 font-bold text-base uppercase">
              <span>Submission Target</span>
              <span>{submissionTarget.target}</span>
            </div>
            <div className="flex justify-between items-center py-4 my-2 px-2">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-8 mr-2 icon-target"
                >
                  <path
                    className="white"
                    d="M15.23 2.53l-.35.35a3 3 0 0 0-.8 1.4 8.01 8.01 0 1 0 5.64 5.63 3 3 0 0 0 1.4-.79l.35-.35A9.99 9.99 0 0 1 12 22a10 10 0 1 1 3.23-19.47zM13.55 6.2L11.75 8a4 4 0 1 0 4.24 4.25l1.8-1.8a6 6 0 1 1-4.24-4.25z"
                  />
                  <path
                    className="white"
                    d="M16 6.59V5a1 1 0 0 1 .3-.7l2-2A1 1 0 0 1 20 3v1h1a1 1 0 0 1 .7 1.7l-2 2a1 1 0 0 1-.7.3h-1.59l-4.7 4.7a1 1 0 0 1-1.42-1.4L16 6.58z"
                  />
                </svg>
              </span>
              <span className="text-white text-4xl font-semibold">
                {submissionPercent}%
              </span>
            </div>
            <div className="card-footer flex justify-between text-gray-200 font-bold text-base uppercase">
              <span>Submissions</span>
              <span>{submissionCount}</span>
            </div>
          </div>

          <div className="bg-cyan-400 w-4/5 h-auto mr-2 rounded flex-none flex-none p-2 shadow-lg">
            <div className="card-header flex justify-between text-gray-200 font-bold text-base uppercase">
              <span>Visits Target</span>
              <span>{visitTarget.target}</span>
            </div>
            <div className="flex justify-between items-center py-4 my-2 px-2">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-8 icon-store"
                >
                  <path
                    className="white"
                    d="M5 8h14a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1zm1 2v7h12v-7H6z"
                  />
                  <path
                    className="white"
                    d="M6 12a4 4 0 0 1-4-4 1 1 0 0 1 .1-.45l2-4A1 1 0 0 1 5 3h14a1 1 0 0 1 .9.55l2 4c.06.14.1.3.1.45a4 4 0 0 1-7 2.65 3.99 3.99 0 0 1-6 0A3.99 3.99 0 0 1 6 12z"
                  />
                </svg>
              </span>
              <span className="text-white font-bold text-4xl">
                {visitPercent}%
              </span>
            </div>
            <div className="card-footer flex justify-between text-gray-200 font-bold text-base uppercase">
              <span>Visits</span>
              <span>submissionCount</span>
            </div>
          </div>
        </div>
        <h2 className="text-gray-700 text-base font-semibold mt-4 mb-1">
          Recent Submissions
        </h2>
        <div className="w-full py-2 mb-12">
          {slicedSubmission.length < 1 ? (
            <div className="flex flex-col justify-center items-center text-gray-600">
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
              <span>Recent Submissions appear here</span>
            </div>
          ) : (
            <div className="flex flex-col">
              {slicedSubmission.map(submission => {
                return (
                  <div className="w-full h-28 mb-2 bg-white rounded flex hover:shadow-md" key={submission._id}>
                    <div className="img-wrapper h-full overflow-hidden px-2 pt-2 pb-4">
                      <span className="overflow-hidden">
                        <img
                          className="w-24 h-24 rounded"
                          src={submission.image}
                          alt=""
                        />
                      </span>
                    </div>
                    <div className="outlet-details px-2 flex flex-col justify-center">
                      <div className="mb-0">
                        <div className="flex flex-col text-gray-700 text-sm">
                          <h2 className="outlet-title font-semibold leading-tight">
                            {submission.outlet_name}
                          </h2>
                          <span>{submission.outlet_address}</span>
                          <span>{submission.route_name}</span>
                        </div>
                        <div className="text-gray-600 text-xs leading-tight mt-1">
                          <span className="text-xs">
                            {moment(submission.date).format(
                              "MMMM Do YYYY, h:mm:ss a"
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <span
        className="submit-button bg-white font-semibold w-12 h-12 rounded-full z-40 shadow-lg fixed snackbar-button cursor-pointer flex justify-center items-center text-blue-500 outline-none"
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
  authUser: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  authUser: state.userAuth
});

export default connect(mapStateToProps)(Content);
