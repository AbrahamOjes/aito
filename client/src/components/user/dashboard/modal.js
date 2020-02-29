import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import uploadImage from "../../../img/uploading.svg";
import confirmed from "../../../img/confirm.svg";
import unchecked from "../../../img/unchecked.svg";
import Spinner from "../layout/spinner";

const Modal = ({ auth: { user }, closeModal, updateCategories }) => {
  let imageInput = null;
  useEffect(() => {
    getLocation();
  }, []);

  // useEffect(() => {
  //   imageInput.click();
  // }, []);

  const [formData, setFormData] = useState({
    name: "",
    blobImage: "",
    latitude: "",
    longitude: "",
    user_id: user._id
  });

  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const { name, latitude, longitude, blobImage } = formData;

  const [isLoading, setIsLoading] = useState(false);

  const [showUpload, setShowUpload] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [showError, setShowError] = useState(false);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(SetPosition);
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  const SetPosition = position => {
    setFormData({
      ...formData,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  };

  const imageSelectedHandler = async e => {
    let file = e.target.files[0];
    setImage(file);

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = e => {
      setFormData({ ...formData, blobImage: e.target.result });
    };
  };

  const submitForm = async e => {
    e.preventDefault();
    console.log(formData);
    setIsLoading(true);
    const body = JSON.stringify(formData);
    try {
      const formdata = new FormData();
      formdata.append("form", body);
      formdata.append("image", image);
      const res = await axios.post(
        "http://localhost:5000/user/submission",
        formdata
      );
      console.log(res.data);
      if (res.status === 201) {
        setResult(res.data);
        setShowResult(true);
        setShowUpload(false);
        setShowError(false);
      }
      if (res.status === 202) {
        setError(res.data.errors[0].msg);
        setShowResult(false);
        setShowUpload(false);
        setShowError(true);
      }
      if (res.status === 400) {
        console.log(res.data.errors);
        setError(res.data.errors[0].msg);
        setShowResult(false);
        setShowUpload(false);
        setShowError(true);
      }

      setIsLoading(false);
    } catch (error) {
      console.error(error.message);
      setError(error.message);
      setShowResult(false);
      setShowUpload(false);
      setShowError(true);
      setIsLoading(false);
    }
  };

  const changeToUpload = () => {
    setFormData({ ...formData, blobImage: "", name: "" });
    setImage(null);
    setShowUpload(true);
    setShowResult(false);
    setShowError(false);
  };

  let showForm;
  let errorAlerts;

  if (error) {
    errorAlerts = (
      <div className="bg-red-400 text-white font-semibold text-sm text-center py-2 px-2 mb-2  mt-1 rounded">
        {error}
      </div>
    );
  }

  let sectionToShow;

  if (showUpload) {
    sectionToShow = (
      <Fragment>
        <div className="image-holder w-full lg:w-1/2 lg:mx-auto lg:mt-4 mt-0 h-4/5 overflow-hidden cursor-pointer">
          {image ? (
            <div className="rounded w-full ">
              <img className="object-cover rounded" src={blobImage} alt="" />
            </div>
          ) : (
            <Fragment>
              <div
                className="w-full h-full flex flex-col justify-center items-center"
                onClick={() => imageInput.click()}
              >
                <span className="w-2/4 h-2/4 mb-2">
                  <img src={uploadImage} alt="upload" />
                </span>
                <span>
                  <p className="text-center text-gray-600 font-semibold text-base leading-tight px-8">
                    Click here to take a photo of the product you want to submit
                  </p>
                </span>
              </div>
            </Fragment>
          )}
        </div>
        {image ? (
          <div className=" lg:w-1/2 w-full mx-auto flex justify-between ">
            <button
              className="px-10 lg:px-12  py-1 text-blue-400 border border-blue-600 font-semibold shadow-lg rounded lg:mx-auto mr-1 mt-2 flex items-center justify-center "
              onClick={() => imageInput.click()}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-6 icon-refresh"
                >
                  <circle cx="12" cy="12" r="10" className="primary" />
                  <path
                    className="white"
                    d="M8.52 7.11a5.98 5.98 0 0 1 8.98 2.5 1 1 0 1 1-1.83.8 4 4 0 0 0-5.7-1.86l.74.74A1 1 0 0 1 10 11H7a1 1 0 0 1-1-1V7a1 1 0 0 1 1.7-.7l.82.81zm5.51 8.34l-.74-.74A1 1 0 0 1 14 13h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1.7.7l-.82-.81A5.98 5.98 0 0 1 6.5 14.4a1 1 0 1 1 1.83-.8 4 4 0 0 0 5.7 1.85z"
                  />
                </svg>
              </span>
              Change
            </button>
            <button
              className="px-10 lg:px-12 py-1 text-white bg-blue-500 font-semibold shadow-lg rounded lg:mx-auto ml-1 mt-2 flex items-center justify-center "
              onClick={submitForm}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-6 icon-send"
                >
                  <path
                    className="primary"
                    d="M12 20.1L3.4 21.9a1 1 0 0 1-1.3-1.36l9-18a1 1 0 0 1 1.8 0l9 18a1 1 0 0 1-1.3 1.36L12 20.1z"
                  />
                  <path
                    className="white"
                    d="M12 2c.36 0 .71.18.9.55l9 18a1 1 0 0 1-1.3 1.36L12 20.1V2z"
                  />
                </svg>
              </span>
              Upload
            </button>
          </div>
        ) : (
          ""
        )}
        <input
          className="hidden"
          type="file"
          accept="image/*"
          onChange={imageSelectedHandler}
          ref={input => (imageInput = input)}
        />
      </Fragment>
    );
  }

  if (showResult) {
    sectionToShow = (
      <div className="result-section lg:w-1/3 w-4/5 center-pos rounded shadow-lg pb-4">
        <div className="py-2 result-header h-1/5 bg-cyan-500 text-white font-semibold text-base flex items-center justify-center uppercase rounded">
          <p>Successfull</p>
        </div>
        <div className="result-body my-6">
          <img className="w-16 h-16 mx-auto mb-3" src={confirmed} alt="" />

          <div className="flex flex-col justify-center items-center text-gray-600 mb-2">
            <div className="flex flex-col justify-center items-center">
              <span className="capitalize ">Photo Submitted Successfully</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="text-center border border-cyan-400 py-1 w-1/2 rounded text-gray-600  focus:outline-none"
            onClick={changeToUpload}
          >
            DONE
          </button>
        </div>
      </div>
    );
  }

  if (showError) {
    sectionToShow = (
      <div className="result-section lg:w-1/3 w-4/5 center-pos rounded shadow-lg pb-4">
        <div className="py-2 result-header h-1/5 bg-red-400 text-white font-semibold text-base flex items-center justify-center uppercase rounded">
          <p>Error</p>
        </div>
        <div className="result-body my-6">
          <img className="w-24 h-24 mx-auto mb-3" src={unchecked} alt="" />

          <div className="flex flex-col justify-center items-center  text-gray-600 mb-2">
            <span className="text-sm">{error && error}</span>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="text-center border border-red-400 py-1 w-1/2 rounded text-gray-600  focus:outline-none"
            onClick={changeToUpload}
          >
            Ok
          </button>
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      {isLoading ? <Spinner /> : ""}
      <div className="modal-backdrop transparent fixed inset-0 h-full w-full z-40">
        <div className="modal center-pos w-full h-full bg-white overflow-y-auto">
          <div className="header w-full flex items-center rounded justify-between p-5 text-gray-700 text-base font-bold border-b border-gray-300">
            <div>Take a photo</div>

            <div
              className="cursor-pointer"
              onClick={() => {
                closeModal();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 fill-current"
              >
                <path d="M15.78 14.36a1 1 0 0 1-1.42 1.42l-2.82-2.83-2.83 2.83a1 1 0 1 1-1.42-1.42l2.83-2.82L7.3 8.7a1 1 0 0 1 1.42-1.42l2.83 2.83 2.82-2.83a1 1 0 0 1 1.42 1.42l-2.83 2.83 2.83 2.82z" />
              </svg>
            </div>
          </div>
          <div className="body w-full h-4/5 flex flex-col items-center p-2">
            {sectionToShow}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Modal.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.userAuth
});

export default connect(mapStateToProps)(Modal);
