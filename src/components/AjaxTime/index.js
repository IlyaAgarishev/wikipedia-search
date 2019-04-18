import React from "react";
import styles from "./index.module.css";
import PropTypes from "prop-types";

const AjaxTime = ({ ajaxTime }) => {
  return (
    <div className={styles.ajaxTime}>
      <strong>Time of request:</strong>
      <div className={styles.ajaxTimeNumber}>{ajaxTime.toFixed(5)} ms</div>
    </div>
  );
};

AjaxTime.propTypes = {
  ajaxTime: PropTypes.number.isRequired
};

export default AjaxTime;
