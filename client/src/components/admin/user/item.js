import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { setAlert } from "../../../actions/alert";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { Popconfirm, Drawer, Select } from "antd";

const Item = ({ user, deleteUser, admin, setAlert, userUpdated }) => {
  const [state, setState] = useState({
    visible: false,
    placement: "bottom"
  });
  const [formData, setFormData] = useState({
    form_territory: user.territory,
    route: user.routes,
    company: admin.company
  });
  const [isLoading, setIsLoading] = useState(false);
  const [territories, setTerritories] = useState([]);
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    fetchTerritories();
    fetchRoute();
  }, []);

  const { form_territory, route } = formData;

  const { Option } = Select;

  const children = [];
  for (let i = 0; i < routes.length; i++) {
    children.push(<Option key={routes[i].name}>{routes[i].name}</Option>);
  }

  const handleChange = value => {
    setFormData({ ...formData, route: value });
  };

  const fetchRoute = () => {
    try {
      setIsLoading(true);
      axios
        .get(`http://localhost:5000/admin/route/${user.territory}`)
        .then(res => {
          setRoutes(res.data);
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

  const fetchTerritories = () => {
    try {
      setIsLoading(true);
      axios.get(`http://localhost:5000/admin/territories`).then(res => {
        setTerritories(res.data);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  //   const onChange = e => {
  //     setFormData({ ...formData, [e.target.name]: e.target.value });
  //     console.log(e.target.value);
  //   };
  const submitForm = async e => {
    e.preventDefault();

    setIsLoading(true);
    if (form_territory === "") {
      setAlert("Territory is required", "red-400");
      setIsLoading(false);
      return;
    } else if (route.length < 1) {
      setAlert("Routes is required", "red-400");
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
      const res = await axios.patch(
        `http://localhost:5000/admin/user/route/${user._id}`,
        body,
        config
      );
      // console.log(res);
      userUpdated(res.data.user);
      setState({ ...state, visible: false });
      setAlert("User Routes Updated", "green-400");
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach(error => setAlert(error.msg, "red-400"));
      }
      setIsLoading(false);
    }
  };

  const showDrawer = () => {
    setState({ ...state, visible: true });
  };

  const onClose = () => {
    setState({ ...state, visible: false });
  };

  function confirm(user) {
    deleteUser(user);
  }

  function cancel(e) {
    return;
  }
  return (
    <Fragment>
      <div className="lg:w-1/3 w-full px-1 mb-2" key={user._id}>
        <div className="bg-white rounded w-full h-full hover:shadow-md text-gray-700 px-3 py-1 relative">
          <div className="absolute opacity-25" style={{ top: 70, right: 15 }}>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-10 icon-user"
              >
                <path
                  className="primary"
                  d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"
                />
                <path
                  className="secondary"
                  d="M21 20v-1a5 5 0 0 0-5-5H8a5 5 0 0 0-5 5v1c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2z"
                />
              </svg>
            </span>
          </div>
          <div className="absolute top-0 right-0 pr-2 pt-2 flex">
            <button
              className="text-xs hover:text-lg text-cyan-300 hover:text-cyan-500"
              onClick={showDrawer}
            >
              <i className="fa fa-edit" />
            </button>
            <Popconfirm
              title="Are you sure delete this target?"
              onConfirm={() => {
                confirm(user._id);
              }}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <button className="ml-4 text-xs hover:text-lg text-red-300 hover:text-red-500">
                <i className="fa fa-trash" />
              </button>
            </Popconfirm>
          </div>
          <p className="font-semibold text-lg text-cyan-500 mb-0 uppercase">
            <span>{user.name}</span>
          </p>
          <p className="text-sm font-semibold text-gray-700 mb-0">
            Designation: <span>{user.designation_name}</span>
          </p>
          <p className="text-sm text-gray-700 mb-0">
            Email: <span>{user.email}</span>
          </p>
          <p className="text-sm text-gray-700 mb-0">
            Phone: <span>{user.phone}</span>
          </p>
          <p className="text-sm text-gray-700 mb-0">
            Territory: <span>{user.territory_name}</span>
          </p>
        </div>
      </div>
      <Drawer
        title="Edit User Routes"
        placement={state.placement}
        height={350}
        closable={false}
        onClose={onClose}
        visible={state.visible}
      >
        <h2 className="text-base font-semibold text-gray-700 lg:px-2 px-0">
          Name: <span className="mr-2">{user.name}</span>
          Territory: <span className="mr-1">{user.territory_name}</span>
        </h2>
        <div className="py-2 px-2 text-sm text-gray-600 my-1 bg-gray-200 rounded inline-block">
          <span className="mr-1">
            <i className="fa fa-wifi" />
          </span>
          <span>
            If you wish to reassign a new territory to this user make sure you
            clear all the routes
          </span>
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/4 w-full lg:px-2 px-0">
            <label
              className="block text-gray-700 text-sm font-bold  mb-1"
              htmlFor="name"
            >
              Territory
            </label>
            <div className="inline-block relative w-full">
              <select
                className="block appearance-none text-gray-700 w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                name="form_territory"
                value={form_territory}
                onChange={e => fetchRoutes(e)}
                required
              >
                <option value="">Select Territory</option>
                {territories.map(territory => {
                  return (
                    <option
                      value={territory._id}
                      key={territory._id}
                      selected={territory._id === user.territory}
                    >
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
          <div className="lg:w-2/4 w-full lg:px-2 px-0">
            <label
              className="block text-gray-700 text-sm font-bold  mb-1"
              htmlFor="name"
            >
              Routes
            </label>
            <div className="inline-block relative w-full">
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Please select"
                defaultValue={route}
                onChange={handleChange}
              >
                {children}
              </Select>
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
          <div className="lg:w-1/4 w-full lg:px-2 px-0 mt-4">
            {isLoading ? (
              <button className="bg-transparent shadow py-1 rounded text-white">
                <img src={require("../../../img/Spinner2.svg")} alt="Spinner" />
              </button>
            ) : (
              <div>
                <button
                  className="bg-white border border-gray-500 px-5 py-2 rounded mr-1 focus:outline-none"
                  onClick={onClose}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-blue-400 shadow px-3 py-2 rounded text-white"
                  onClick={e => submitForm(e)}
                >
                  <img src="" alt="" />
                  Update Target
                </button>
              </div>
            )}
          </div>
        </div>
      </Drawer>
    </Fragment>
  );
};

Item.propTypes = {
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
)(Item);
