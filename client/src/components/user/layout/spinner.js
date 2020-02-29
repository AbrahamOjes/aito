import React, { Fragment } from "react";
import Spinner from "../../../img/camera.svg";
import { Spin } from "antd";

export default () => (
  <Fragment>
    <div className="w-screen h-screen fixed transparent inset-0 z-50">
      {/* <img className="center-pos w-16 h-16" src={Spinner} alt="loading...." /> */}
      <Spin className="center-pos" size="large" />
    </div>
  </Fragment>
);
