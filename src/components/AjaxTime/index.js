import React, { useContext } from "react";
import styles from "./index.module.css";
import PropTypes from "prop-types";

const AjaxTime = ({ ajaxTime }) => {
  return (
    <div className={styles.ajaxTime}>
      <div className={styles.ajaxTimeText}>Time of request:</div>
      <div className={styles.ajaxTimeNumber}>{ajaxTime} ms</div>
    </div>
  );
};

AjaxTime.propTypes = {
  ajaxTime: PropTypes.number.isRequired
};

export default AjaxTime;
