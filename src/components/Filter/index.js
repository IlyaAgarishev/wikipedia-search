import React from "react";
import styles from "./index.module.css";
import PropTypes from "prop-types";

const Filter = props => {
  const { data, setFilteredData, setShowFilteredData } = { ...props };
  let mostFrequentWords = ["..."];
  if (data) {
    mostFrequentWords = data.map(element => {
      return element.mostFrequentWord;
    });
    mostFrequentWords = [...new Set(mostFrequentWords)];
  }
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
                  let filteredData = data.filter(el => {
                    return el.mostFrequentWord === element;
                  });
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

// Filter.propTypes = {
//   ajaxTime: PropTypes.number.isRequired
// };

export default Filter;
