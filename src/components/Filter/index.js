import React from "react";
import styles from "./index.module.css";
import PropTypes from "prop-types";
import { beautifyFrequentWords } from "../../requestFunctions";

const Filter = props => {
  const { data, setFilteredData, setShowFilteredData } = { ...props };
  let mostFrequentWords = beautifyFrequentWords(data);
  return (
    <div className={styles.filter}>
      <div className={styles.filterTitle}>Filter by most frequent words:</div>
      <ul className={styles.list}>
        {mostFrequentWords.map((element, index) => {
          if (element)
            return (
              <li
                key={index}
                className={styles.word}
                onClick={() => {
                  let filteredData = data.filter(
                    el => el.mostFrequentWord === element
                  );
                  setFilteredData(filteredData);
                  setShowFilteredData(true);
                }}
              >
                {element}
              </li>
            );
        })}
      </ul>
    </div>
  );
};

Filter.propTypes = {
  data: PropTypes.array.isRequired,
  setFilteredData: PropTypes.func.isRequired,
  setShowFilteredData: PropTypes.func.isRequired
};

export default Filter;
