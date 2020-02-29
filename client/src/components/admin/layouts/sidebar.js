import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

const Sidebar = ({ auth: { admin } }) => {
  let sectionToShow;

  if (admin.role_power > 0) {
    sectionToShow = (
      <div>
        <h3 className="px-4 py-1 text-sm mt-4 font-semibold text-blue-900 uppercase">
          {admin.company_name} Admin
        </h3>
        <div className="border-b border-grey-600 ">
          <Link
            to="/admin"
            className="sidebar-list-item flex items-center mb-1 hover:bg-blue-050 block px-4 py-1"
            style={{ display: "flex", alignItems: "center" }}
          >
            <span className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 mr-4 icon-dashboard"
              >
                <path
                  className="secondary"
                  d="M3 11h2a1 1 0 0 1 0 2H3v-2zm3.34-6.07l1.42 1.41a1 1 0 0 1-1.42 1.42L4.93 6.34l1.41-1.41zM13 3v2a1 1 0 0 1-2 0V3h2zm6.07 3.34l-1.41 1.42a1 1 0 1 1-1.42-1.42l1.42-1.41 1.41 1.41zM21 13h-2a1 1 0 0 1 0-2h2v2z"
                />
                <path
                  className="primary"
                  d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm-6.93-6h13.86a8 8 0 1 0-13.86 0z"
                />
                <path
                  className="secondary"
                  d="M11 14.27V9a1 1 0 0 1 2 0v5.27a2 2 0 1 1-2 0z"
                />
              </svg>
            </span>
            <p className="text-blue-900 text-xs">Dashboard</p>
          </Link>
          <Link
            to="/admin/admins"
            className="sidebar-list-item flex items-center mb-1 hover:bg-blue-050 block px-4 py-1"
          >
            <span className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 mr-4 icon-user-circle"
              >
                <circle cx="12" cy="12" r="10" className="primary" />
                <path
                  className="secondary"
                  d="M3.66 17.52A5 5 0 0 1 8 15h8a5 5 0 0 1 4.34 2.52 10 10 0 0 1-16.68 0zM12 13a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"
                />
              </svg>
            </span>
            <p className="text-blue-900 self-auto text-xs">Admins</p>
          </Link>
          <Link
            to="/admin/users"
            className="sidebar-list-item flex items-center mb-1 hover:bg-blue-050 block px-4 py-1"
          >
            <span className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 mr-4 icon-user"
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
            <p className="text-blue-900 self-auto text-xs">Users</p>
          </Link>
        </div>
        <h3 className="px-4 py-1 text-xs font-semibold text-blue-900 uppercase">
          REPORTS AND ANALYSIS
        </h3>
        <div className="border-b border-grey-600 ">
          <Link
            to="/admin/dashbaord"
            className="sidebar-list-item flex items-center mb-1 hover:bg-blue-050 block pl-4 pr-2 py-1"
          >
            <span className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 mr-4 icon-layers"
              >
                <path
                  className="primary"
                  d="M2.6 6.09l9-4a1 1 0 0 1 .8 0l9 4a1 1 0 0 1 0 1.82l-9 4a1 1 0 0 1-.8 0l-9-4a1 1 0 0 1 0-1.82z"
                />
                <path
                  className="secondary"
                  d="M3.91 10.5l7.68 3.41a1 1 0 0 0 .82 0l7.68-3.41 1.32.59a1 1 0 0 1 0 1.82l-9 4a1 1 0 0 1-.82 0l-9-4a1 1 0 0 1 0-1.82l1.32-.59zm0 5l7.68 3.41a1 1 0 0 0 .82 0l7.68-3.41 1.32.59a1 1 0 0 1 0 1.82l-9 4a1 1 0 0 1-.82 0l-9-4a1 1 0 0 1 0-1.82l1.32-.59z"
                />
              </svg>
            </span>
            <p className="text-blue-900 text-xs">Browse Shelf Execution</p>
          </Link>
          <Link
            to="/admin/dashbaord"
            className="sidebar-list-item flex items-center mb-1 hover:bg-blue-050 block px-4 py-1"
          >
            <span className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 mr-4 icon-collection"
              >
                <rect
                  width="20"
                  height="12"
                  x="2"
                  y="10"
                  className="primary"
                  rx="2"
                />
                <path
                  className="secondary"
                  d="M20 8H4c0-1.1.9-2 2-2h12a2 2 0 0 1 2 2zm-2-4H6c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2z"
                />
              </svg>
            </span>
            <p className="text-blue-900 text-xs">Shelf Execution Summary</p>
          </Link>
          <Link
            to=""
            className="sidebar-list-item flex items-center mb-1 hover:bg-blue-050 block px-4 py-1"
          >
            <span className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 mr-4 icon-document-notes"
              >
                <path
                  className="primary"
                  d="M6 2h6v6c0 1.1.9 2 2 2h6v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2zm2 11a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2H8zm0 4a1 1 0 0 0 0 2h4a1 1 0 0 0 0-2H8z"
                />
                <polygon className="secondary" points="14 2 20 8 14 8" />
              </svg>
            </span>
            <p className="text-blue-900 self-auto text-xs">
              SOS Compliance Reports
            </p>
          </Link>
          <Link
            to=""
            className="sidebar-list-item flex items-center mb-1 hover:bg-blue-050 block px-4 py-1"
          >
            <span className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 mr-4 icon-pie-chart"
              >
                <path
                  className="primary"
                  d="M14 13h6.78a1 1 0 0 1 .97 1.22A10 10 0 1 1 9.78 2.25a1 1 0 0 1 1.22.97V10a3 3 0 0 0 3 3z"
                />
                <path
                  className="secondary"
                  d="M20.78 11H14a1 1 0 0 1-1-1V3.22a1 1 0 0 1 1.22-.97c3.74.85 6.68 3.79 7.53 7.53a1 1 0 0 1-.97 1.22z"
                />
              </svg>
            </span>
            <p className="text-blue-900 self-auto text-xs">
              Visited Outlet Reports
            </p>
          </Link>
        </div>
        <h3 className="px-4 py-1 text-xs font-semibold text-blue-900 uppercase">
          TARGET SETTINGS
        </h3>
        <div className="">
          <Link
            to="/admin/sos-target"
            className="sidebar-list-item flex items-center mb-1 hover:bg-blue-050 block pl-4 pr-2 py-1"
          >
            <span className="text-xl">
              <i className="fas fa-dot-circle  text-blue-300 ml-1 mr-4" />
            </span>
            <p className="text-blue-900 text-xs">SOS Target</p>
          </Link>
          <Link
            to="/admin/msl-target"
            className="sidebar-list-item flex items-center mb-1 hover:bg-blue-050 block px-4 py-1"
          >
            <span className="text-xl">
              <i className="far fa-dot-circle text-blue-300 ml-1 mr-4" />
            </span>
            <p className="text-blue-900 text-xs">MSL Target</p>
          </Link>
          <Link
            to="/admin/visit-target"
            className="sidebar-list-item flex items-center mb-1 hover:bg-blue-050 block px-4 py-1"
          >
            <span className="text-xl">
              <i className="fas fa-bullseye  text-blue-300 ml-1 mr-4" />
            </span>
            <p className="text-blue-900 self-auto text-xs">Visit Target</p>
          </Link>
          <Link
            to="/admin/submission-target"
            className="sidebar-list-item flex items-center mb-1 hover:bg-blue-050 block px-4 py-1"
          >
            <span className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 mr-4 icon-target"
              >
                <path
                  className="primary"
                  d="M15.23 2.53l-.35.35a3 3 0 0 0-.8 1.4 8.01 8.01 0 1 0 5.64 5.63 3 3 0 0 0 1.4-.79l.35-.35A9.99 9.99 0 0 1 12 22a10 10 0 1 1 3.23-19.47zM13.55 6.2L11.75 8a4 4 0 1 0 4.24 4.25l1.8-1.8a6 6 0 1 1-4.24-4.25z"
                />
                <path
                  className="secondary"
                  d="M16 6.59V5a1 1 0 0 1 .3-.7l2-2A1 1 0 0 1 20 3v1h1a1 1 0 0 1 .7 1.7l-2 2a1 1 0 0 1-.7.3h-1.59l-4.7 4.7a1 1 0 0 1-1.42-1.4L16 6.58z"
                />
              </svg>
            </span>
            <p className="text-blue-900 self-auto text-xs">Submission Target</p>
          </Link>
        </div>
        <h3 className="px-4 py-1 mt-4 text-xs font-semibold text-blue-900 uppercase">
          Feedbacks
        </h3>
        <div className="border-b border-grey-600 ">
          <Link
            to="/admin/feedbacks"
            className="sidebar-list-item flex items-center mb-8 hover:bg-blue-050 block px-4 py-1"
          >
            <span className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 mr-4 icon-receipt"
              >
                <path
                  className="primary"
                  d="M9 18.41l-2.3 2.3a1 1 0 0 1-1.4 0l-2-2A1 1 0 0 1 3 18V5c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v13a1 1 0 0 1-.3.7l-2 2a1 1 0 0 1-1.4 0L15 18.42l-2.3 2.3a1 1 0 0 1-1.4 0L9 18.4z"
                />
                <path
                  className="secondary"
                  d="M7 7h10a1 1 0 0 1 0 2H7a1 1 0 1 1 0-2zm0 4h10a1 1 0 0 1 0 2H7a1 1 0 0 1 0-2z"
                />
              </svg>
            </span>
            <p className="text-blue-900 self-auto text-xs">Feedback</p>
          </Link>
        </div>
      </div>
    );
  }

  if (admin.role_power === 0) {
    sectionToShow = (
      <div>
        <h3 className="px-4 py-1 mt-4 text-sm font-semibold text-blue-900 uppercase">
          Feta Admin
        </h3>
        <div className="border-b border-grey-600 ">
          <Link
            to="/admins"
            className="sidebar-list-item flex items-center mb-1 hover:bg-blue-050 block px-4 py-1"
          >
            <span className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 mr-4 icon-user-circle"
              >
                <circle cx="12" cy="12" r="10" className="primary" />
                <path
                  className="secondary"
                  d="M3.66 17.52A5 5 0 0 1 8 15h8a5 5 0 0 1 4.34 2.52 10 10 0 0 1-16.68 0zM12 13a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"
                />
              </svg>
            </span>
            <p className="text-blue-900 self-auto text-xs">Admins</p>
          </Link>
          <Link
            to="/admin/roles"
            className="sidebar-list-item flex items-center mb-1 hover:bg-blue-050 block px-4 py-1"
          >
            <span className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 mr-4 icon-bolt"
              >
                <circle cx="12" cy="12" r="10" className="primary" />
                <path
                  className="secondary"
                  d="M14 10h2a1 1 0 0 1 .81 1.58l-5 7A1 1 0 0 1 10 18v-4H8a1 1 0 0 1-.81-1.58l5-7A1 1 0 0 1 14 6v4z"
                />
              </svg>
            </span>
            <p className="text-blue-900 self-auto text-xs">Admin Roles</p>
          </Link>
          <Link
            to="/admin/designations"
            className="sidebar-list-item flex items-center mb-1 hover:bg-blue-050 block px-4 py-1"
          >
            <span className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 mr-4 icon-star"
              >
                <circle cx="12" cy="12" r="10" className="primary" />
                <path
                  className="secondary"
                  d="M9.53 16.93a1 1 0 0 1-1.45-1.05l.47-2.76-2-1.95a1 1 0 0 1 .55-1.7l2.77-.4 1.23-2.51a1 1 0 0 1 1.8 0l1.23 2.5 2.77.4a1 1 0 0 1 .55 1.71l-2 1.95.47 2.76a1 1 0 0 1-1.45 1.05L12 15.63l-2.47 1.3z"
                />
              </svg>
            </span>
            <p className="text-blue-900 self-auto text-xs">User Designation</p>
          </Link>
        </div>
        <h3 className="px-4 py-1 text-xs font-semibold text-blue-900 uppercase">
          MANAGE PRODUCTS
        </h3>
        <div className="border-b border-gray-300">
          <Link
            to="/admin/product/categories"
            className="sidebar-list-item flex items-center mb-1 hover:bg-blue-050 block pl-4 pr-2 py-1"
          >
            <span className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 mr-4 icon-folder"
              >
                <path
                  className="secondary"
                  d="M4 4h7l2 2h7a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2z"
                />
                <rect
                  width="20"
                  height="12"
                  x="2"
                  y="8"
                  className="primary"
                  rx="2"
                />
              </svg>
            </span>
            <p className="text-blue-900 text-xs">Categories</p>
          </Link>
          <Link
            to="/admin/product/sub-categories"
            className="sidebar-list-item flex items-center mb-1 hover:bg-blue-050 block px-4 py-1"
          >
            <span className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 mr-4 icon-swatch"
              >
                <path
                  className="primary"
                  d="M9 22c.19-.14.37-.3.54-.46L17.07 14H20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H9zM4 2h4a2 2 0 0 1 2 2v14a4 4 0 1 1-8 0V4c0-1.1.9-2 2-2zm2 17.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
                />
                <path
                  className="secondary"
                  d="M11 18.66V7.34l2.07-2.07a2 2 0 0 1 2.83 0l2.83 2.83a2 2 0 0 1 0 2.83L11 18.66z"
                />
              </svg>
            </span>
            <p className="text-blue-900 text-xs">Sub Categories</p>
          </Link>
          <Link
            to="/admin/product/company"
            className="sidebar-list-item flex items-center mb-1 hover:bg-blue-050 block px-4 py-1"
          >
            <span className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 mr-4 icon-factory"
              >
                <path
                  className="primary"
                  d="M21 21H3a1 1 0 0 1-1-1.06l1-16A1 1 0 0 1 4 3h2a1 1 0 0 1 1 .94l.39 6.26 2.9-2.9A1 1 0 0 1 12 8v2.59l3.3-3.3A1 1 0 0 1 17 8v2.59l3.3-3.3A1 1 0 0 1 22 8v12a1 1 0 0 1-1 1z"
                />
                <path
                  className="secondary"
                  d="M7 13h3v2H7v-2zm5 0h3v2h-3v-2zm5 0h3v2h-3v-2zM7 17h3v2H7v-2zm5 0h3v2h-3v-2zm5 0h3v2h-3v-2z"
                />
              </svg>
            </span>
            <p className="text-blue-900 self-auto text-xs">Company</p>
          </Link>
          <Link
            to="/admin/product/brands"
            className="sidebar-list-item flex items-center mb-1 hover:bg-blue-050 block px-4 py-1"
          >
            <span className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 mr-4 icon-tag"
              >
                <path
                  className="primary"
                  d="M2.59 13.41A1.98 1.98 0 0 1 2 12V7a5 5 0 0 1 5-5h4.99c.53 0 1.04.2 1.42.59l8 8a2 2 0 0 1 0 2.82l-8 8a2 2 0 0 1-2.82 0l-8-8zM7 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                />
                <path className="secondary" d="M12 18l6-6-4-4-6 6.01L12 18z" />
              </svg>
            </span>
            <p className="text-blue-900 self-auto text-xs">Brands</p>
          </Link>
          <Link
            to="/admin/products"
            className="sidebar-list-item flex items-center mb-1 hover:bg-blue-050 block px-4 py-1"
          >
            <span className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 mr-4 icon-shopping-cart"
              >
                <path
                  className="primary"
                  d="M7 4h14a1 1 0 0 1 .9 1.45l-4 8a1 1 0 0 1-.9.55H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"
                />
                <path
                  className="secondary"
                  d="M17.73 19a2 2 0 1 1-3.46 0H8.73a2 2 0 1 1-3.42-.08A3 3 0 0 1 5 13.17V4H3a1 1 0 1 1 0-2h3a1 1 0 0 1 1 1v10h11a1 1 0 0 1 0 2H6a1 1 0 0 0 0 2h12a1 1 0 0 1 0 2h-.27z"
                />
              </svg>
            </span>
            <p className="text-blue-900 self-auto text-xs">Products</p>
          </Link>
        </div>
        <h3 className="px-4 py-1 text-xs font-semibold text-blue-900 uppercase">
          MANAGE LOCATIONS
        </h3>
        <div className="border-b border-gray-300">
          <Link
            to="/admin/outlets"
            className="sidebar-list-item flex items-center mb-1 hover:bg-blue-050 block pl-4 pr-2 py-1"
          >
            <span className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 mr-4 icon-store"
              >
                <path
                  className="primary"
                  d="M5 8h14a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1zm1 2v7h12v-7H6z"
                />
                <path
                  className="secondary"
                  d="M6 12a4 4 0 0 1-4-4 1 1 0 0 1 .1-.45l2-4A1 1 0 0 1 5 3h14a1 1 0 0 1 .9.55l2 4c.06.14.1.3.1.45a4 4 0 0 1-7 2.65 3.99 3.99 0 0 1-6 0A3.99 3.99 0 0 1 6 12z"
                />
              </svg>
            </span>
            <p className="text-blue-900 text-xs">Outlet</p>
          </Link>
          <Link
            to="/admin/routes"
            className="sidebar-list-item flex items-center mb-1 hover:bg-blue-050 block px-4 py-1"
          >
            <span className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 mr-4 icon-sign"
              >
                <path
                  className="primary"
                  d="M14 12h5l3 3-3 3h-5v4h-4v-4H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h6v-1h4v1z"
                />
                <path
                  className="secondary"
                  d="M10 4a2 2 0 1 1 4 0h6a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5L2 7l3-3h5z"
                />
              </svg>
            </span>
            <p className="text-blue-900 text-xs">Route</p>
          </Link>
          <Link
            to="/admin/territories"
            className="sidebar-list-item flex items-center mb-1 hover:bg-blue-050 block px-4 py-1"
          >
            <span className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 mr-4 icon-location-pin"
              >
                <path
                  className="primary"
                  d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                />
                <path
                  className="secondary"
                  d="M12 1a9 9 0 0 1 6.36 15.36l-5.65 5.66a1 1 0 0 1-.71.3V13a3 3 0 0 0 0-6V1z"
                />
              </svg>
            </span>
            <p className="text-blue-900 text-xs">Territories</p>
          </Link>
          <Link
            to="/admin/areas"
            className="sidebar-list-item flex items-center mb-1 hover:bg-blue-050 block px-4 py-1"
          >
            <span className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 mr-4 icon-map"
              >
                <path
                  className="primary"
                  d="M15 18.12L9.45 20.9a1 1 0 0 1-.9 0l-6-3A1 1 0 0 1 2 17V4a1 1 0 0 1 1.45-.9L9 5.89l5.55-2.77a1 1 0 0 1 .9 0l6 3A1 1 0 0 1 22 7v13a1 1 0 0 1-1.45.89L15 18.12z"
                />
                <path
                  className="secondary"
                  d="M9 21V5.88l5.55-2.77A1 1 0 0 1 15 3v15.1L9.45 20.9A1 1 0 0 1 9 21z"
                />
              </svg>
            </span>
            <p className="text-blue-900 self-auto text-xs">Area</p>
          </Link>
          <Link
            to="/admin/regions"
            className="sidebar-list-item flex items-center mb-1 hover:bg-blue-050 block px-4 py-1"
          >
            <span className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 mr-4 icon-pin"
              >
                <path
                  className="secondary"
                  d="M2.24 20.35l6.5-7.5a1 1 0 0 1 1.47-.06l1 1a1 1 0 0 1-.06 1.47l-7.5 6.5c-.93.8-2.22-.48-1.4-1.41z"
                />
                <path
                  className="primary"
                  d="M15 15.41V18a1 1 0 0 1-.3.7l-1 1a1 1 0 0 1-1.4 0l-8-8a1 1 0 0 1 0-1.4l1-1A1 1 0 0 1 6 9h2.59L13 4.59V3a1 1 0 0 1 1.7-.7l7 7A1 1 0 0 1 21 11h-1.59L15 15.41z"
                />
              </svg>
            </span>
            <p className="text-blue-900 self-auto text-xs">Region</p>
          </Link>
          <Link
            to="/admin/countries"
            className="sidebar-list-item flex items-center mb-1 hover:bg-blue-050 block px-4 py-1"
          >
            <span className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 mr-4 icon-flag"
              >
                <path
                  className="primary"
                  d="M3 15a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h8a1 1 0 0 1 .7.3L13.42 5H21a1 1 0 0 1 .9 1.45L19.61 11l2.27 4.55A1 1 0 0 1 21 17h-8a1 1 0 0 1-.7-.3L10.58 15H3z"
                />
                <rect
                  width="2"
                  height="20"
                  x="2"
                  y="2"
                  className="secondary"
                  rx="1"
                />
              </svg>
            </span>
            <p className="text-blue-900 self-auto text-xs">Country</p>
          </Link>
        </div>
        <h3 className="px-4 py-1 mt-4 text-xs font-semibold text-blue-900 uppercase">
          Feedbacks
        </h3>
        <div className="border-b border-grey-600 ">
          <Link
            to="/admin/feedback-subject"
            className="sidebar-list-item flex items-center mb-8 hover:bg-blue-050 block px-4 py-1"
          >
            <span className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 mr-4 icon-receipt"
              >
                <path
                  className="primary"
                  d="M9 18.41l-2.3 2.3a1 1 0 0 1-1.4 0l-2-2A1 1 0 0 1 3 18V5c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v13a1 1 0 0 1-.3.7l-2 2a1 1 0 0 1-1.4 0L15 18.42l-2.3 2.3a1 1 0 0 1-1.4 0L9 18.4z"
                />
                <path
                  className="secondary"
                  d="M7 7h10a1 1 0 0 1 0 2H7a1 1 0 1 1 0-2zm0 4h10a1 1 0 0 1 0 2H7a1 1 0 0 1 0-2z"
                />
              </svg>
            </span>
            <p className="text-blue-900 self-auto text-xs">Feedback Subejcts</p>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="sidebar w-2/3 sm:w-2/3 fixed lg:static shadow overflow-y-auto lg:w-76 h-auto  bg-white mt-12 py-1 z-50">
      {sectionToShow}
    </div>
  );
};

Sidebar.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.adminAuth
});
export default connect(mapStateToProps)(Sidebar);
