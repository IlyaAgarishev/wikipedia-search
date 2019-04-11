import React, { useRef, useEffect } from "react";
import styles from "./index.module.css";
import search from "../../img/search.svg";
import PropTypes from "prop-types";
import { ajaxGetRequest, addRequest } from "../../requestFunctions";

const Form = props => {
  const {
    setDataState,
    darkTheme,
    value,
    setValueState,
    requests,
    ajaxErrorState,
    setRequests
  } = { ...props };
  const textInput = useRef(null);

  useEffect(() => {
    textInput.current.value = value;
    if (
      navigator.userAgent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i
      ) != null
    ) {
      return;
    }
    textInput.current.focus();
  }, [value]);

  return (
    <form
      className={styles.submitForm}
      onSubmit={e => {
        if (textInput.current.value === requests[0]) {
          e.preventDefault();
          return;
        }
        ajaxGetRequest(textInput.current.value)
          .then(data => {
            setDataState(data);
            addRequest(textInput.current.value, requests, setRequests);
            ajaxErrorState(false);
          })
          .catch(() => {
            ajaxErrorState(true);
          });
        setValueState(textInput.current.value);
        e.preventDefault();
      }}
    >
      <input
        required
        type="text"
        ref={textInput}
        className={
          darkTheme
            ? [styles.textInput, styles.textInputDark].join(" ")
            : styles.textInput
        }
      />
      <button className={styles.submitButton} type="submit">
        <img className={styles.searchIcon} src={search} alt="" />
      </button>
    </form>
  );
};

Form.propTypes = {
  setDataState: PropTypes.func.isRequired,
  darkTheme: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  setValueState: PropTypes.func.isRequired,
  requests: PropTypes.array.isRequired,
  ajaxErrorState: PropTypes.func.isRequired
};

export default Form;
