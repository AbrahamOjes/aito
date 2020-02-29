import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="feta-home flex justify-center mt-32">
      <Link
        to=""
        className="px-8 py-2 border border-gray-600 rounded mr-1 text-gray-800"
      >
        Agents
      </Link>
      <Link
        to="/admin"
        className="px-8 py-2 border border-gray-600 rounded text-gray-800"
      >
        Admin
      </Link>
    </div>
  );
};

export default Home;
