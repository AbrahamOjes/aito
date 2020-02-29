import React from "react";

const navbar = (props) => {
  return (
    <div className="header h-12 w-full bg-white fixed top-0 inset-x-0 z-40 shadow-md flex items-center justify-center" > <span className="text-lg text-gray-700 font-semibold">{props.title}</span> </div>
  );
};

export default navbar;
