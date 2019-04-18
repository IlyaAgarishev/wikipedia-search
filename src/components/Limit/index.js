import React from "react";
import styles from "./index.module.css";
import PropTypes from "prop-types";

const Limit = props => {
  const { limit, setLimit } = { ...props };
  const limitsArray = [10, 50, 100];
  return (
    <div className={styles.limit}>
      <strong>Set limit of wiki results:</strong>
      <ul className={styles.limitButtons}>
        {limitsArray.map((number, index) => {
          return (
            <li
              className={
                limit === number
                  ? [styles.limitButton, styles.limitButtonChosen].join(" ")
                  : styles.limitButton
              }
              onClick={() => setLimit(number)}
              key={index}
            >
              {number}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

Limit.propTypes = {
  limit: PropTypes.number.isRequired,
  setLimit: PropTypes.func.isRequired
};

export default Limit;
