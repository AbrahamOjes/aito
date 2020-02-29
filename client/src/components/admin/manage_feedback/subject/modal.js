import React, { useState } from "react";
import axios from "axios";
import { setAlert } from "../../../../actions/alert";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

const Modal = ({ closeModal, setAlert, updateSubjects }) => {
  const [formData, setFormData] = useState({
    name: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const { name } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const submitForm = async e => {
    e.preventDefault();
    setIsLoading(true);
    if (name === "") {
      setAlert("subject Name is required", "red-400");
      setIsLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };

      const body = JSON.stringify(formData);
      const res = await axios.post(
        "http://localhost:5000/admin/feedback-subject",
        body,
        config
      );
      // console.log(res);
      updateSubjects(res.data.subject);
      setAlert("Subject Added", "green-400");
      setIsLoading(false);
      closeModal();
    } catch (error) {
      console.error(error);
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach(error => setAlert(error.msg, "red-400"));
      }
      setIsLoading(false);
    }
  };
  return (
    <div className="modal-backdrop transparent fixed top-0 left-0 button-0 h-screen w-full z-100">
      <div className="modal center-pos w-full lg:w-1/2 h-76 rounded shadow bg-white">
        <div className="header w-full flex items-center rounded justify-between p-5 text-gray-700 text-base font-bold">
          <div>Add Feedback Subject</div>
          <div
            className="cursor-pointer"
            onClick={() => {
              closeModal();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-8 fill-current"
            >
              <path d="M15.78 14.36a1 1 0 0 1-1.42 1.42l-2.82-2.83-2.83 2.83a1 1 0 1 1-1.42-1.42l2.83-2.82L7.3 8.7a1 1 0 0 1 1.42-1.42l2.83 2.83 2.82-2.83a1 1 0 0 1 1.42 1.42l-2.83 2.83 2.83 2.82z" />
            </svg>
          </div>
        </div>
        <div className="body w-full h-4/5 px-5 ">
          <div className=" w-full h-full flex flex-col">
            <div className="center-pos w-full px-6">
              <label
                className="block text-gray-700 text-sm font-bold  mb-2"
                htmlFor="region"
              >
                Subject Name
              </label>
              <input
                className="shadow appearance-none border border-gray-600 w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                placeholder="Subject Name"
                name="name"
                value={name}
                onChange={e => onChange(e)}
                required
              />
            </div>
          </div>
        </div>
        <div className="footer w-full bg-blue-050 -mb-2 px-5 py-3 text-gray-700 rounded">
          {isLoading ? (
            <button className="bg-blue-400 shadow px-8 rounded">
              <img
                src={require("../../../../img/Spinner2.svg")}
                alt="Spinner"
              />
            </button>
          ) : (
            <div>
              <button
                className="bg-white border border-gray-500 px-5 py-2 rounded mr-1 focus:outline-none"
                onClick={() => {
                  closeModal();
                }}
              >
                Close
              </button>
              <button
                type="submit"
                className="bg-blue-400 shadow px-3 py-2 rounded text-white"
                onClick={e => submitForm(e)}
              >
                <img src="" alt="" />
                Add Subject
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  setAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  // isAdminAuthenticated: state.adminAuth.isAdminAuthenticated,
  // loading: state.adminAuth.loading
});

export default connect(
  mapStateToProps,
  { setAlert }
)(Modal);
