import React, { useState, useEffect } from "react";
import axios from "axios";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import confirmed from "../../../img/confirm.svg";
import unchecked from "../../../img/unchecked.svg";

const Modal = ({ auth: { user }, closeModal, updateOutlets }) => {
  const [formData, setFormData] = useState({
    name: "",
    route: "",
    territory: "",
    area_name: "",
    region_name: "",
    country_name: "",
    phone: "",
    address: "",
    latitude: "",
    longitude: "",
    image: "",
    user: user._id
  });

  const {
    name,
    route,
    territory,
    area_name,
    region_name,
    country_name,
    phone,
    address,
    latitude,
    longitude,
    image
  } = formData;

  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [areas, setAreas] = useState([]);
  const [territories, setTerritories] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [submissionError, setSubmissionError] = useState(null);

  const [outletLocation, setOutletLocation] = useState(false);
  const [outletInfo, setOutletInfo] = useState(false);
  const [outletImage, setOutletImage] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(SetPosition);
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  let widget = window.cloudinary.createUploadWidget(
    {
      cloudName: "feta",
      uploadPreset: "ap40mei6"
    },
    (error, result) => {
      setIsLoading(true);
      if (!error && result && result.event === "success") {
        setFormData({ ...formData, image: result.info.secure_url });
        setIsLoading(false);
      }
    }
  );

  const SetPosition = position => {
    setFormData({
      ...formData,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  };

  const fetchCountries = () => {
    try {
      setIsLoading(true);
      axios.get("http://localhost:5000/user/countries").then(res => {
        setCountries(res.data);
        console.log(res.data);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const fetchRegions = e => {
    try {
      setIsLoading(true);
      setFormData({ ...formData, [e.target.name]: e.target.value });
      axios
        .get(`http://localhost:5000/user/regions/${e.target.value}`)
        .then(res => {
          setRegions(res.data);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const fetchAreas = e => {
    try {
      setIsLoading(true);
      setFormData({ ...formData, [e.target.name]: e.target.value });
      axios
        .get(`http://localhost:5000/user/areas/${e.target.value}`)
        .then(res => {
          setAreas(res.data);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const fetchTerritories = e => {
    try {
      setIsLoading(true);
      setFormData({ ...formData, [e.target.name]: e.target.value });
      axios
        .get(`http://localhost:5000/user/territory/${e.target.value}`)
        .then(res => {
          setTerritories(res.data);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const fetchRoutes = e => {
    console.log(e.target.value, e.target);
    try {
      setIsLoading(true);
      setFormData({ ...formData, [e.target.name]: e.target.value });
      axios
        .get(`http://localhost:5000/user/routes/${e.target.value}`)
        .then(res => {
          setRoutes(res.data);
          console.log(res.data);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const submitForm = async e => {
    e.preventDefault();
    setIsLoading(true);
    if (name === "") {
      setTimeout(() => {
        setError(null);
      }, 5000);
      return setError(" Outlet Name is Required");
    } else if (address === "") {
      setTimeout(() => {
        setError(null);
      }, 5000);
      return setError(" Outlet Address is Required");
    } else if (phone === "") {
      setTimeout(() => {
        setError(null);
      }, 5000);
      return setError(" Outlet Phone is Required");
    }

    console.log(formData);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };

      const body = JSON.stringify(formData);
      const res = await axios.post(
        "http://localhost:5000/user/outlet",
        body,
        config
      );
      console.log(res.data);
      updateOutlets(res.data.outlet);
      setShowResult(true);
      setShowError(false);
      setOutletImage(false);
      setOutletLocation(false);
      setOutletInfo(false);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      const errors = error.response.data.errors;
      setSubmissionError(errors);
      setShowError(true);
      setOutletImage(false);
      setOutletLocation(false);
      setOutletInfo(false);
      setShowResult(false);
      setIsLoading(false);
    }
  };

  const switchToOutletInfo = () => {
    if (country_name === "") {
      setTimeout(() => {
        setError(null);
      }, 5000);
      return setError("Country is Required");
    } else if (region_name === "") {
      setTimeout(() => {
        setError(null);
      }, 5000);
      return setError(" Region is Required");
    } else if (area_name === "") {
      setTimeout(() => {
        setError(null);
      }, 5000);
      return setError("Area is Required");
    } else if (territory === "") {
      setTimeout(() => {
        setError(null);
      }, 5000);
      return setError("Territory is Required");
    } else if (route === "") {
      setTimeout(() => {
        setError(null);
      }, 5000);
      return setError("Route is Required");
    }
    setOutletInfo(true);
    setOutletLocation(false);
    setOutletImage(false);
  };

  const switchToOutletLocation = () => {
    setOutletInfo(false);
    setOutletLocation(true);
    setOutletImage(false);
    setShowError(false);
    setShowResult(false);
  };

  const switchToOutletImage = () => {
    setOutletInfo(false);
    setOutletLocation(false);
    setOutletImage(true);
    setShowError(false);
    setShowResult(false);
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

  if (outletLocation) {
    showForm = (
      <div className="outlet-location">
        <h2 className="my-2 text-gray-700 font-semibold text-center text-base">
          Outlet Location Details
        </h2>
        {errorAlerts}
        {/* <div className="location flex justify-between text-gray-700 text-sm font-bold  mb-2">
          <span>Latitude: {latitude}</span>
          <span>Longitude: {longitude}</span>
        </div> */}
        <div className="w-full pr-1 mb-3">
          <label
            className="block text-gray-700 text-sm font-bold  mb-2"
            htmlFor="name"
          >
            Country
          </label>
          <div className="inline-block relative w-full">
            <select
              className="block appearance-none text-gray-700 w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              name="country_name"
              value={country_name}
              onChange={e => fetchRegions(e)}
              required
            >
              <option value="">Select Country</option>
              {countries.map(country => {
                return (
                  <option value={country._id} key={country._id}>
                    {country.name}
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
        <div className="w-full pr-1 mb-3">
          <label
            className="block text-gray-700 text-sm font-bold  mb-2"
            htmlFor="name"
          >
            Region
          </label>
          <div className="inline-block relative w-full">
            <select
              className="block appearance-none text-gray-700 w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              name="region_name"
              value={region_name}
              onChange={e => fetchAreas(e)}
              required
            >
              <option value="">Select Region</option>
              {regions.map(region => {
                return (
                  <option value={region._id} key={region._id}>
                    {region.name}
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
        <div className="w-full pr-1 mb-3">
          <label
            className="block text-gray-700 text-sm font-bold  mb-2"
            htmlFor="name"
          >
            Area
          </label>
          <div className="inline-block relative w-full">
            <select
              className="block appearance-none text-gray-700 w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              name="area_name"
              value={area_name}
              onChange={e => fetchTerritories(e)}
              required
            >
              <option value="">Select Area</option>
              {areas.map(area => {
                return (
                  <option value={area._id} key={area._id}>
                    {area.name}
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
        <div className="w-full pr-1 mb-3">
          <label
            className="block text-gray-700 text-sm font-bold  mb-2"
            htmlFor="name"
          >
            Territory
          </label>
          <div className="inline-block relative w-full">
            <select
              className="block appearance-none text-gray-700 w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              name="territory"
              value={territory}
              onChange={e => fetchRoutes(e)}
              required
            >
              <option value="">Select Territory</option>
              {territories.map(territory => {
                return (
                  <option value={territory._id} key={territory._id}>
                    {territory.name}
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
        <div className="w-full pr-1 mb-3">
          <label
            className="block text-gray-700 text-sm font-bold  mb-2"
            htmlFor="name"
          >
            Route
          </label>
          <div className="inline-block relative w-full">
            <select
              className="block appearance-none text-gray-700 w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              name="route"
              value={route}
              onChange={e => onChange(e)}
              required
            >
              <option value="">Select Route</option>
              {routes.map(route => {
                return (
                  <option value={route._id} key={route._id}>
                    {route.name}
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
        <div className="w-full mb-4">
          <button
            className="bg-blue-500 text-center py-2 text-white text-base rounded shadow hover:bg-blue-500 w-full"
            onClick={switchToOutletInfo}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
  if (outletInfo) {
    showForm = (
      <div className="outlet-info">
        <h2 className="my-2 text-gray-700 font-semibold text-center text-lg">
          Outlet Information
        </h2>
        {errorAlerts}
        <div className="w-full pl-1 mb-4">
          <label
            className="block text-gray-700 text-sm font-bold  mb-2"
            htmlFor="name"
          >
            Outlet Name
          </label>
          <div className="inline-block relative w-full">
            <input
              className="shadow appearance-none border border-gray-500 w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Outlet Name"
              name="name"
              value={name}
              onChange={e => onChange(e)}
              required
            />
          </div>
        </div>
        <div className="w-full pl-1 mb-4">
          <label
            className="block text-gray-700 text-sm font-bold  mb-2"
            htmlFor="name"
          >
            Outlet Address
          </label>
          <div className="inline-block relative w-full">
            <input
              className="shadow appearance-none border border-gray-500 w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Outlet Address"
              name="address"
              value={address}
              onChange={e => onChange(e)}
              required
            />
          </div>
        </div>
        <div className="w-full pl-1 mb-4">
          <label
            className="block text-gray-700 text-sm font-bold  mb-2"
            htmlFor="name"
          >
            Phone Number
          </label>
          <div className="inline-block relative w-full">
            <input
              className="shadow appearance-none border border-gray-500 w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Phone Number"
              name="phone"
              value={phone}
              onChange={e => onChange(e)}
              required
            />
          </div>
        </div>
        <div className="w-full mb-4 flex pl-1">
          <button
            className="border border-gray-600 text-center py-2 text-gray-600 text-base rounded shadow hover:bg-gray-200 mr-1 w-1/2"
            onClick={switchToOutletLocation}
          >
            Previous
          </button>
          <button
            className="text-center py-2 text-white bg-blue-500 text-base rounded shadow hover:bg-blue-600 ml-1 w-1/2"
            onClick={switchToOutletImage}
          >
            Next
          </button>
        </div>
      </div>
    );
  }

  if (outletImage) {
    showForm = (
      <div className="outlet-image">
        <h2 className="my-2 text-gray-700 font-semibold text-center text-lg">
          Upload Images of shelf
        </h2>
        <div className="my-4">
          <div className="w-full h-70 mb-2 overflow-hidden">
            <img className="object-cover" src={image} alt="" />
          </div>
          <button
            className="text-center bg-blue-500 py-1 rounded text-white w-full text-xl mb-2"
            onClick={() => widget.open()}
          >
            <i className="fa fa-camera" />
          </button>
          {image ? (
            <button
              className="bg-blue-500 text-center py-2 w-full text-white text-base rounded w-full"
              onClick={submitForm}
            >
              Next
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }

  if (showResult) {
    showForm = (
      <div className="result-section lg:w-1/3 w-4/5 center-pos rounded shadow-lg pb-4">
        <div className="py-2 result-header h-1/5 bg-cyan-500 text-white font-semibold text-base flex items-center justify-center uppercase rounded">
          <p>Successfull</p>
        </div>
        <div className="result-body my-6">
          <img className="w-16 h-16 mx-auto mb-3" src={confirmed} alt="" />

          <div className="flex flex-col justify-center items-center text-gray-600 mb-2">
            <div className="flex flex-col justify-center items-center">
              <span className="capitalize ">New Outlet Created</span>
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
    showForm = (
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
            onClick={switchToOutletInfo}
          >
            Ok
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-backdrop transparent fixed inset-0 h-full w-full z-40">
      <div className="modal center-pos w-full h-full bg-white overflow-y-auto">
        <div className="header w-full flex items-center rounded justify-between p-5 text-gray-700 text-base font-bold border-b border-gray-300">
          <div>Add An Outlet</div>

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
        <div className="body w-full lg:w-1/2 mx-auto h-4/5 px-5  ">
          {showForm}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.userAuth
});

export default connect(mapStateToProps)(Modal);
