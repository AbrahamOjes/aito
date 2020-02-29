import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { setAlert } from "../../../actions/alert";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { Steps, Select } from "antd";

const Modal = ({ closeModal, setAlert, updateUsers, admin }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    route: "",
    designation: "",
    territory: "",
    company: admin.company
  });

  const [state, setState] = useState({
    currentStep: 0,
    titleOne: "In Progress",
    titleTwo: "Waiting"
  });

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    fetchDesignations();
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [areas, setAreas] = useState([]);
  const [territories, setTerritories] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [userDetails, setUserDetails] = useState(true);
  const [userLocation, setUserLocation] = useState(false);

  const {
    name,
    email,
    phone,
    route,
    region,
    country,
    area,
    territory,
    designation
  } = formData;
  const { Step } = Steps;
  const { Option } = Select;

  const fetchDesignations = () => {
    try {
      axios.get("http://localhost:5000/admin/user/designations").then(res => {
        setDesignations(res.data);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const fetchCountries = () => {
    try {
      setIsLoading(true);
      axios.get("http://localhost:5000/admin/countries").then(res => {
        setCountries(res.data);
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
        .get(`http://localhost:5000/admin/regions/${e.target.value}`)
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
        .get(`http://localhost:5000/admin/areas/${e.target.value}`)
        .then(res => {
          setAreas(res.data);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const fetchTerriories = e => {
    try {
      setIsLoading(true);
      setFormData({ ...formData, [e.target.name]: e.target.value });
      axios
        .get(`http://localhost:5000/admin/territory/${e.target.value}`)
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
    try {
      setIsLoading(true);
      setFormData({ ...formData, [e.target.name]: e.target.value });
      axios
        .get(`http://localhost:5000/admin/route/${e.target.value}`)
        .then(res => {
          setRoutes(res.data);
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
    if (country === "") {
      setAlert("Country is required", "red-400");
      setIsLoading(false);
      return;
    } else if (region === "") {
      setAlert("Region is required", "red-400");
      setIsLoading(false);
      return;
    } else if (area === "") {
      setAlert("Area is required", "red-400");
      setIsLoading(false);
      return;
    } else if (territory === "") {
      setAlert("Territory is required", "red-400");
      setIsLoading(false);
      return;
    } else if (route === "") {
      setAlert("Route is required", "red-400");
      setIsLoading(false);
      return;
    }
    console.log(formData);
    setIsLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };

      const body = JSON.stringify(formData);
      const res = await axios.post(
        "http://localhost:5000/admin/user/signup",
        body,
        config
      );
      // console.log(res);
      updateUsers(res.data.user);
      setAlert("User Added", "green-400");
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
  const children = [];
  for (let i = 0; i < routes.length; i++) {
    children.push(<Option key={routes[i].name}>{routes[i].name}</Option>);
  }

  const handleChange = value => {
    setFormData({ ...formData, route: value });
  };

  const nextForm = () => {
    if (name === "") {
      setAlert("Name is required", "red-400");
      setIsLoading(false);
      return;
    } else if (email === "") {
      setAlert("Email is required", "red-400");
      setIsLoading(false);
      return;
    } else if (phone === "") {
      setAlert("Phone is required", "red-400");
      setIsLoading(false);
      return;
    } else if (designation === "") {
      setAlert("Designation is required", "red-400");
      setIsLoading(false);
      return;
    }
    setUserDetails(false);
    setUserLocation(true);
    setState({
      ...state,
      currentStep: 1,
      titleOne: "Finshed",
      titleTwo: "In Progress"
    });
  };

  const previousForm = () => {
    setUserDetails(true);
    setUserLocation(false);
    setState({
      ...state,
      currentStep: 0,
      titleOne: "In Progress",
      titleTwo: "Waiting"
    });
  };

  let formToShow;
  if (userDetails) {
    formToShow = (
      <Fragment>
        <div className=" w-full px-6 mb-2">
          <label
            className="block text-gray-700 text-sm font-bold  mb-1"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border border-gray-500 w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            placeholder="Name"
            name="name"
            value={name}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className=" w-full px-6 mb-2">
          <label
            className="block text-gray-700 text-sm font-bold  mb-2"
            htmlFor="name"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border border-gray-500 w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="email"
            placeholder="email"
            value={email}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className=" w-full px-6 mb-2">
          <label
            className="block text-gray-700 text-sm font-bold  mb-2"
            htmlFor="name"
          >
            Phone
          </label>
          <input
            className="shadow appearance-none border border-gray-500 w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="phone"
            placeholder="Phone Number"
            value={phone}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="w-full px-6 mb-1">
          <label
            className="block text-gray-700 text-sm font-bold  mb-1"
            htmlFor="name"
          >
            Designation
          </label>
          <div className="inline-block relative w-full">
            <select
              className="block appearance-none text-gray-700 w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              name="designation"
              value={designation}
              onChange={e => onChange(e)}
              required
            >
              <option value="">Select Designation</option>
              {designations.map(designation => {
                return (
                  <option value={designation._id} key={designation._id}>
                    {designation.name}
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
        <div className="px-6 my-4">
          <div>
            <button
              className="bg-blue-400 text-white border border-gray-500 px-5 py-2 px-8 rounded mr-1 focus:outline-none"
              onClick={() => {
                nextForm();
              }}
            >
              Next
            </button>
          </div>
        </div>
      </Fragment>
    );
  }

  if (userLocation) {
    formToShow = (
      <Fragment>
        <div className="flex px-6 mb-2">
          <div className="w-full pr-1 mb-1">
            <label
              className="block text-gray-700 text-sm font-bold  mb-1"
              htmlFor="name"
            >
              Country
            </label>
            <div className="inline-block relative w-full">
              <select
                className="block appearance-none text-gray-700 w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                name="country"
                value={country}
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
          <div className="w-full pl-1 mb-1">
            <label
              className="block text-gray-700 text-sm font-bold  mb-1"
              htmlFor="name"
            >
              Region
            </label>
            <div className="inline-block relative w-full">
              <select
                className="block appearance-none text-gray-700 w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                name="region"
                value={region}
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
        </div>
        <div className="flex px-6">
          <div className="w-full pr-1 mb-1">
            <label
              className="block text-gray-700 text-sm font-bold  mb-1"
              htmlFor="name"
            >
              Area
            </label>
            <div className="inline-block relative w-full">
              <select
                className="block appearance-none text-gray-700 w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                name="area"
                value={area}
                onChange={e => fetchTerriories(e)}
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
          <div className="w-full pl-1 mb-1">
            <label
              className="block text-gray-700 text-sm font-bold  mb-1"
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
        </div>
        <div className="w-full my-1 px-6">
          <div>
            <label
              className="block text-gray-700 text-sm font-bold  mb-2"
              htmlFor="name"
            >
              Assign Routes
            </label>
            <div className="inline-block relative w-full">
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Please select"
                onChange={handleChange}
              >
                {children}
              </Select>
            </div>
          </div>
          <div className="my-4">
            {isLoading ? (
              <button className="bg-blue-400 shadow px-8 rounded">
                <img src={require("../../../img/Spinner2.svg")} alt="Spinner" />
              </button>
            ) : (
              <div>
                <button
                  className="bg-white border border-gray-500 px-5 py-2 rounded mr-1 focus:outline-none"
                  onClick={() => {
                    previousForm();
                  }}
                >
                  Previous
                </button>
                <button
                  type="submit"
                  className="bg-blue-400 shadow px-4 py-2 rounded text-white"
                  onClick={e => submitForm(e)}
                >
                  Add User
                </button>
              </div>
            )}
          </div>
        </div>
      </Fragment>
    );
  }

  return (
    <div className="modal-backdrop transparent fixed top-0 left-0 button-0 h-screen w-full z-50">
      <div className="modal center-pos w-full lg:w-1/2 h-auto rounded shadow bg-white">
        <div className="header w-full flex items-center rounded justify-between p-5 border-b bordergrey-grey text-gray-700 text-base font-bold">
          <div>Add User</div>
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
        <div className="body w-full h-4/5 px-5 flex flex-col pt-2">
          <div className=" w-full px-2 mb-2">
            <Steps current={state.currentStep}>
              <Step title={state.titleOne} description="Personal Details" />
              <Step title={state.titleTwo} description="Location" />
            </Steps>
          </div>
          {formToShow}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  setAlert: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  // isAdminAuthenticated: state.adminAuth.isAdminAuthenticated,
  // loading: state.adminAuth.loading
  admin: state.adminAuth.admin
});

export default connect(
  mapStateToProps,
  { setAlert }
)(Modal);
