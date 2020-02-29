import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import moment from "moment";

const Content = ({ authUser: { submissions } }) => {
  return (
    <Fragment>
      <div className="w-full lg:w-1/2 h-screen mt-16 container mx-auto px-2">
        <div className="w-full py-2 mb-12 mt-2">
          {submissions.length < 1 ? (
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
              <span>No Submissions</span>
            </div>
          ) : (
            <div className="flex flex-col">
              {submissions.map(submission => {
                return (
                  <div className="w-full h-28 mb-2 bg-white rounded flex hover:shadow-md">
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
