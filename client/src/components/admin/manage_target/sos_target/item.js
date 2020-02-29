import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { setAlert } from "../../../../actions/alert";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { Popconfirm, Drawer } from "antd";

const Item = ({ target, deleteTarget, admin, setAlert, targetUpdated }) => {
  const [state, setState] = useState({
    visible: false,
    placement: "bottom"
  });
  const [formData, setFormData] = useState({
    form_target: target.target,
    territory: target.territory,
    product: target.product,
    company: admin.company
  });
  const [isLoading, setIsLoading] = useState(false);
  const [territories, setTerritories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchTerritories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  const { territory, product, form_target } = formData;

  const fetchProducts = () => {
    try {
      setIsLoading(true);
      axios
        .get(`http://localhost:5000/admin/products/${admin.company}`)
        .then(res => {
          console.log(res.data);
          setProducts(res.data);
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

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };
  const submitForm = async e => {
    e.preventDefault();
    console.log(formData);
    setIsLoading(true);
    if (form_target === "") {
      setAlert("Target is required", "red-400");
      setIsLoading(false);
      return;
    } else if (territory === "") {
      setAlert("Territory is required", "red-400");
      setIsLoading(false);
      return;
    } else if (product === "") {
      setAlert("Product is required", "red-400");
      setIsLoading(false);
      return;
    } else if (form_target > 100) {
      setAlert("Target must be betweeen 1 and 100", "red-400");
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
        `http://localhost:5000/admin/sos-target/${target._id}`,
        body,
        config
      );
      // console.log(res);
      targetUpdated(res.data.target);
      console.log(res.data.target);
      setAlert("SOS Target Updated", "green-400");
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

  function confirm(target) {
    deleteTarget(target);
  }

  function cancel(e) {
    return;
  }
  return (
    <Fragment>
      <div className="lg:w-1/3 w-full px-1 mb-2" key={target._id}>
        <div className="bg-white rounded hover:shadow-md w-full h-full text-gray-700 px-3 py-1 relative">
          <div className="absolute opacity-25" style={{ top: 15, right: 150 }}>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-12 icon-click-target"
              >
                <path
                  className="primary"
                  d="M21.97 12.73c-.25-.22-.56-.4-.92-.54L20 11.8a8 8 0 1 0-8.2 8.2l.4 1.06c.12.36.3.67.53.92a10 10 0 1 1 9.25-9.25zm-10.95 5.19a6 6 0 1 1 6.9-6.9l-2.39-.9a4 4 0 1 0-5.41 5.41l.9 2.39z"
                />
                <path
                  className="secondary"
                  d="M17.96 16.54l3.75 3.75a1 1 0 0 1-1.42 1.42l-3.75-3.75-.57 2.28a1 1 0 0 1-1.9.11l-3-8a1 1 0 0 1 1.28-1.29l8 3a1 1 0 0 1-.1 1.91l-2.3.57z"
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
                confirm(target._id);
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
          <p className="font-semibold text-lg text-cyan-500 mb-0">
            Target: <span>{target.target}</span>
          </p>
          <p className="font-normal text-sm mb-0">
            Products: <span>{target.product_name}</span>
          </p>
          <p className="font-normal text-sm mb-0">
            Territory: <span className="mr-1">{target.territory_name},</span>
            <span className="mr-1">{target.area_name},</span>
            <span className="mr-1">{target.region_name}</span>
          </p>
        </div>
      </div>
      <Drawer
        title="Edit SOS Target"
        placement={state.placement}
        height={350}
        closable={false}
        onClose={onClose}
        visible={state.visible}
      >
        <h2 className="text-base font-semibold text-gray-700">
          Territory: <span className="mr-1">{target.territory_name},</span>
          <span className="mr-1">{target.area_name},</span>
          <span className="mr-1">{target.region_name}</span>
        </h2>
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
                name="territory"
                value={territory}
                onChange={e => onChange(e)}
                required
              >
                <option value="">Select Territory</option>
                {territories.map(territory => {
                  return (
                    <option
                      value={territory._id}
                      key={territory._id}
                      selected={territory._id === target.territory}
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
          <div className="lg:w-1/4 w-full lg:px-2 px-0">
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
                required
              >
                <option value="">Select Product</option>
                {products.map(product => {
                  return (
                    <option
                      value={product._id}
                      key={product._id}
                      selected={product._id === target.product}
                    >
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
          <div className="lg:w-1/4 w-full lg:px-2 px-0">
            <label
              className="block text-gray-700 text-sm font-bold  mb-1"
              htmlFor="name"
            >
              Target
            </label>
            <div className="inline-block relative w-full">
              <input
                className="shadow appearance-none border border-gray-500 w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                min="1"
                max="100"
                placeholder="Target"
                name="form_target"
                value={form_target}
                onChange={e => onChange(e)}
                required
              />
            </div>
          </div>
          <div className="lg:w-1/4 w-full lg:px-2 px-0 mt-6">
            {isLoading ? (
              <button className="bg-transparent shadow py-1 rounded text-white">
                <img
                  src={require("../../../../img/Spinner2.svg")}
                  alt="Spinner"
                />
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
