import React from "react";
import { Link } from "react-router-dom";

const footer_nav = () => {
  return (
    <div className="footer-nav px-4  bg-white w-full h-12 border-t border-blue-100 x-100 shadow-lg flex justify-between items-center fixed bottom-0 inset-x-0 text-xs text-gray-700">
      <Link
        to="/dashboard"
        className="flex flex-col items-center justify-center"
      >
        <span className="text-lg text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="fill-current h-6 w-6"
          >
            <path
              className="primary"
              d="M9 22H5a1 1 0 0 1-1-1V11l8-8 8 8v10a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v4a1 1 0 0 1-1 1zm3-9a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
            />
            <path
              className="seconday"
              d="M12.01 4.42l-8.3 8.3a1 1 0 1 1-1.42-1.41l9.02-9.02a1 1 0 0 1 1.41 0l8.99 9.02a1 1 0 0 1-1.42 1.41l-8.28-8.3z"
            />
          </svg>
        </span>
        <span>Home</span>
      </Link>
      <Link
        to="/user/outlets"
        className="flex flex-col items-center justify-center"
      >
        <span className="text-lg text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="fill-current h-6 w-6"
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
        <span>Outlets</span>
      </Link>
      <Link
        to="/user/submissions"
        className="flex flex-col items-center justify-center"
      >
        <span className="text-lg text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-6 icon-layers"
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
        <span>Submissions</span>
      </Link>
      <Link
        to="/user/feedbacks"
        className="flex flex-col items-center justify-center"
      >
        <span className="text-lg text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-6 icon-chat"
          >
            <path
              className="primary"
              d="M2 15V5c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v15a1 1 0 0 1-1.7.7L16.58 17H4a2 2 0 0 1-2-2z"
            />
            <path
              className="secondary"
              d="M6 7h12a1 1 0 0 1 0 2H6a1 1 0 1 1 0-2zm0 4h8a1 1 0 0 1 0 2H6a1 1 0 0 1 0-2z"
            />
          </svg>
        </span>
        <span>Feedbacks</span>
      </Link>
      <Link
        to="/user/account"
        className="flex flex-col items-center justify-center"
      >
        <span className="text-lg text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-6 icon-user"
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
        <span>Account</span>
      </Link>
    </div>
  );
};

export default footer_nav;
