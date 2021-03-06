import React, { useState, useEffect } from "react";
import axios from "axios";
import { setAlert } from "../../../../actions/alert";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

const Modal = ({ closeModal, setAlert, updateTargets, admin }) => {
  const [formData, setFormData] = useState({
    target: "",
    company: admin.company
  });
  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [areas, setAreas] = useState([]);
  const [territories, setTerritories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  const { region, country, area, territory, product, target } = formData;

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

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const submitForm = async e => {
    e.preventDefault();
    setIsLoading(true);
    if (target === "") {
      setAlert("Target is required", "red-400");
      setIsLoading(false);
      return;
    } else if (region === "") {
      setAlert("Region is required", "red-400");
      setIsLoading(false);
      return;
    } else if (country === "") {
      setAlert("Country is required", "red-400");
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
    } else if (product === "") {
      setAlert("Product is required", "red-400");
      setIsLoading(false);
      return;
    } else if (target > 100) {
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
      const res = await axios.post(
        "http://localhost:5000/admin/sos-target",
        body,
        config
      );
      // console.log(res);
      updateTargets(res.data.sosTarget);
      setAlert("SOS Target Added", "green-400");
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
    <div className="modal-backdrop transparent fixed top-0 left-0 button-0 h-screen w-full z-50">
      <div className="modal center-pos w-full lg:w-1/2 h-auto rounded shadow bg-white">
        <div className="header w-full flex items-center rounded justify-between p-5 text-gray-700 text-base font-bold">
          <div>Add SOS Target</div>
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
        <div className="body w-full h-4/5 px-5 flex flex-col pt-6">
          <div className="flex flex-col lg:flex-row px-6 mb-2">
            <div className="w-full pr-0 lg:pr-1 mb-4">
              <label
                className="block text-gray-700 text-sm font-bold  mb-2"
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
            <div className="w-full lg:pl-0 pl-1 mb-4">
              <label
                className="block text-gray-700 text-sm font-bold  mb-2"
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
          <div className="flex flex-col lg:flex-row px-6">
            <div className="w-full pr-0 lg:pr-1 mb-4">
              <label
                className="block text-gray-700 text-sm font-bold  mb-2"
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
            <div className="w-full lg:pl-0 pl-1 mb-4">
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
                  onChange={e => onChange(e)}
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
          <div className="flex flex-col lg:flex-row px-6">
            <div className="w-full pr-0 lg:pr-1 mb-4">
              <label
                className="block text-gray-700 text-sm font-bold  mb-2"
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
            <div className="w-full lg:pl-0 pl-1 mb-4">
              <label
                className="block text-gray-700 text-sm font-bold  mb-2"
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
                  name="target"
                  value={target}
                  onChange={e => onChange(e)}
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div className="footer w-full bg-blue-050 -mb-2 px-5 py-3 text-gray-700 rounded">
          {isLoading ? (
            <button className="bg-transparent shadow px-8 py-1 rounded text-white">
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
                Add Target
              </button>
            </div>
          )}
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
