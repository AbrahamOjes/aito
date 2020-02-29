import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import confirmed from "../../../img/confirm.svg";
import unchecked from "../../../img/unchecked.svg";
import Spinner from "../layout/spinner";
import { Rate, Switch } from "antd";

const desc = ["Terrible", "Bad", "Normal", "Good", "Wonderful"];

const Modal = ({ auth: { user }, closeModal, updateFeedbacks }) => {
  useEffect(() => {
    getLocation();
    fetchProducts();
    fetchSubjects();
  }, []);

  // useEffect(() => {
  //   imageInput.click();
  // }, []);

  const [formData, setFormData] = useState({
    feedback: "",
    subject: "",
    rating: 0,
    product: "",
    latitude: "",
    longitude: "",
    user: user._id
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const { feedback, latitude, longitude, rating, product, subject } = formData;

  const [isLoading, setIsLoading] = useState(false);

  const [showFeedback, setShowFeedback] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showProduct, setShowProduct] = useState(false);

  const handleChange = value => {
    setFormData({ ...formData, rating: value });
    console.log(value, formData);
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(SetPosition);
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  const fetchProducts = () => {
    try {
      setIsLoading(true);
      axios
        .get(`http://localhost:5000/user/products/${user.company}`)
        .then(res => {
          setProducts(res.data);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const fetchSubjects = () => {
    try {
      setIsLoading(true);
      axios.get(`http://localhost:5000/user/feedback-subjects`).then(res => {
        setSubjects(res.data);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const SetPosition = position => {
    setFormData({
      ...formData,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  };

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const submitForm = async e => {
    e.preventDefault();
    if (subject === "") {
      setTimeout(() => {
        setError(null);
      }, 5000);
      return setError(" Subject is Required");
    } else if (feedback === "") {
      setTimeout(() => {
        setError(null);
      }, 5000);
      return setError(" Feedback is Required");
    } else if (rating === 0) {
      setTimeout(() => {
        setError(null);
      }, 5000);
      return setError(" Rating is Required");
    }
    if (showProduct) {
      if (product === "") {
        setTimeout(() => {
          setError(null);
        }, 5000);
        return setError(" Product is Required");
      }
    }
    console.log(formData);
    setIsLoading(true);
    const body = JSON.stringify(formData);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const res = await axios.post(
        "http://localhost:5000/user/feedback",
        body,
        config
      );
      console.log(res.data);
      updateFeedbacks(res.data.feedback);
      setResult(res.data);
      setShowResult(true);
      setShowError(false);
      setShowFeedback(false);

      setIsLoading(false);
    } catch (error) {
      console.error(error.message);
      setError(error.message);
      setShowResult(false);
      setShowError(true);
      setIsLoading(false);
    }
  };

  const switchToFeedback = () => {
    setShowFeedback(true);
    setShowResult(false);
    setShowError(false);
  };

  let sectionToShow;
  let errorAlerts;

  if (showFeedback) {
    sectionToShow = (
      <form onSubmit={submitForm} className="w-full">
        <div className="w-full pr-1 mb-2">
          <label
            className="block text-gray-700 text-sm font-bold  mb-1"
            htmlFor="name"
          >
            Subject
          </label>
          <div className="inline-block relative w-full">
            <select
              className="block appearance-none text-gray-700 w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              name="subject"
              value={subject}
              onChange={e => onChange(e)}
            >
              <option value="">Select Subject</option>
              {subjects.map(subject => {
                return (
                  <option value={subject._id} key={subject._id}>
                    {subject.name}
                  </option>
                );
              })}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="w-full pr-1 mb-2">
          <label className="md:w-2/3 block text-gray-700">
            <Switch className="mr-2"  onChange={(() => {setShowProduct(!showProduct);})} />
            <span className="text-sm">For Product?</span>
          </label>
        </div>
        {showProduct ? (
          <div className="w-full pr-1 mb-2">
            <label
              className="block text-gray-700 text-sm font-bold  mb-1"
              htmlFor="name"
            >
              Product
            </label>
            <div className="inline-block relative w-full">
              <select
                className="block appearance-none text-gray-700 w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                name="product"
                value={product}
                onChange={e => onChange(e)}
              >
                <option value="">Select Products</option>
                {products.map(product => {
                  return (
                    <option value={product._id} key={product._id}>
                      {product.name}
                    </option>
                  );
                })}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="w-full mb-2">
          <label
            className="block text-gray-700 text-sm font-bold  mb-1"
            htmlFor="name"
          >
            Feebacks
          </label>
          <textarea
            className="shadow appearance-none border border-gray-500 w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Feebacks"
            name="feedback"
            rows="8"
            value={feedback}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="w-full mb-4">
          <label
            className="block text-gray-700 text-sm font-bold  mb-1"
            htmlFor="name"
          >
            Rating
          </label>
          <span>
            <Rate tooltips={desc} onChange={handleChange} value={rating} />
            {rating ? (
              <span className="ant-rate-text">{desc[rating - 1]}</span>
            ) : (
              ""
            )}
          </span>
        </div>
        <div>
          {isLoading ? (
            <button className="bg-blue-500 text-white w-full rounded shadow-md flex justify-center">
              <img src={require("../../../img/Spinner2.svg")} alt="Spinner" />
            </button>
          ) : (
            <button
              className="bg-blue-500 p-2 text-white w-full rounded shadow-md"
              onClick={submitForm}
            >
              Send Feedback
            </button>
          )}
        </div>
      </form>
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
              <span className="capitalize ">Feedback Submitted</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="text-center border border-cyan-400 py-1 w-1/2 rounded text-gray-600  focus:outline-none"
            onClick={() => closeModal()}
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
            onClick={switchToFeedback}
          >
            Ok
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    errorAlerts = (
      <div className="bg-red-300 text-white font-semibold w-full text-sm text-center py-2 px-2 mb-2  mt-1 rounded">
        {error}
      </div>
    );
  }

  return (
    <Fragment>
      {isLoading ? <Spinner /> : ""}
      <div className="modal-backdrop transparent fixed inset-0 h-full w-full z-40">
        <div className="modal center-pos w-full h-full bg-white">
          <div className="header w-full flex items-center rounded justify-between px-2 py-3 text-gray-700 text-base font-bold border-b border-gray-300">
            <div>Submit a feedback</div>

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
          <div className="body w-full lg:w-2/5 mx-auto  h-4/5 flex flex-col items-center p-2">
            {errorAlerts}
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
