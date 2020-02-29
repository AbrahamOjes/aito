import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <div
      className={`bg-${
        alert.alertType
      } px-4 py-3 rounded text-white font-bold fixed alert-position mb-1 z-50`}
      role="alert"
      key={alert.id}
    >
      <span className="block sm:inline">{alert.msg}</span>
    </div>
  ));

alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
