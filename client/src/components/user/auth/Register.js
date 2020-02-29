import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="user-login w-full max-w-sm center-pos mt-8 mb-2 px-4">
      <div className="logo flex justify-center">
        <img
          className="w-32 h-16"
          src={require("../../../img/logo1.png")}
          alt="logo"
        />
      </div>
      <form className="rounded px-8 pt-2 pb-8 mb-4 rounded-lg">
        <h1 className="font-bold text-center text-gray-700 text-lg mb-2">
          Create a new account
        </h1>
        <div className="mb-4">
          <input
            className="shadow appearance-none border border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            placeholder="Name"
            name="email"
            required
          />
        </div>
        <div className="mb-4">
          <input
            className="shadow appearance-none border border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            placeholder="Email"
            name="email"
            required
          />
        </div>
        <div className="mb-4">
          <input
            className="shadow appearance-none border border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            placeholder="Phone Number"
            name="email"
            required
          />
        </div>
        <div className="mb-2">
          <input
            className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="Password"
            name="password"
            required
          />
        </div>
        <div className="mb-2">
          <input
            className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="Confirm Password"
            name="password"
            required
          />
        </div>
        <div>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
        </div>
        <div className="text-center my-4">
          <Link
            className="inline-block align-baseline text-sm text-gray-500 hover:text-blue-800"
            to="/login"
          >
            Already have and account?{" "}
            <span className="font-semibold text-blue-500">Login here</span>
          </Link>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">
        &copy;2019 Field Execution Tracking Application. All rights reserved.
      </p>
    </div>
  );
};

export default Register;
