import React from "react";
import styles from "./index.module.css";
import PropTypes from "prop-types";

const Requests = props => {
  const { requests, setValueState } = { ...props };
  return (
    <div className={styles.requests}>
      {requests.map((element, index) => {
        return (
          <div
            className={styles.request}
            key={index}
            onClick={() => {
              setValueState(element);
            }}
          >
            {element}
          </div>
        );
      })}
    </div>
  );
};

Requests.propTypes = {
  requests: PropTypes.array.isRequired,
  setValueState: PropTypes.func.isRequired
};

export default Requests;
