import React from "react";
import react, { useState } from "react";
import styles from "./index.module.css";

const AjaxError = ({ ajaxError }) => {
  const [click, setClick] = useState(false);
  return (
    <div className={styles.ajaxError}>
      <div className={styles.basicDescription}>
        <span style={{ color: "red" }}>Error occurred.</span> Try to reload the
        page or check the internet connection :(
      </div>
      <div>
        <div className={styles.moreInfo} onClick={() => setClick(!click)}>
          More Info
        </div>
        {click ? <div className={styles.error}>{ajaxError.error}</div> : null}
      </div>
    </div>
  );
};

export default AjaxError;
