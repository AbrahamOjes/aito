import React from "react";

const Modal = () => {
  return (
    <div className="modal-backdrop transparent absolute top-0 left-0 h-screen w-screen z-100">
      <div className="modal center-pos w-full lg:w-1/2 h-76 shadow bg-white">
        <div className="header w-full flex items-center bg-blue-050 justify-between p-5 text-gray-700 text-base font-bold">
          <div>Add Category</div>
          <div className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="w-8 fill-current"
            >
              <path d="M15.78 14.36a1 1 0 0 1-1.42 1.42l-2.82-2.83-2.83 2.83a1 1 0 1 1-1.42-1.42l2.83-2.82L7.3 8.7a1 1 0 0 1 1.42-1.42l2.83 2.83 2.82-2.83a1 1 0 0 1 1.42 1.42l-2.83 2.83 2.83 2.82z" />
            </svg>
          </div>
        </div>
        <div className="body w-full h-4/5 px-5 ">
          <div className=" w-full h-full flex flex-col">
            <div className="center-pos w-full px-6">
              <label
                className="block text-gray-700 text-sm font-bold  mb-2"
                htmlFor="name"
              >
                Category Name
              </label>
              <input
                className="shadow appearance-none border border-gray-600 w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                placeholder="Category Name"
                name="email"
                required
              />
            </div>
          </div>
        </div>
        <div className="footer w-full bg-blue-050 -mb-2 px-5 py-3 text-gray-700 rounded">
          <button className="bg-white border border-gray-500 px-5 py-2 rounded mr-1 focus:outline-none">
            Close
          </button>
          <button className="bg-blue-400 shadow px-3 py-2 rounded text-white">
            Add Category
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
