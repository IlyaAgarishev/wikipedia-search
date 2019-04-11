import React, { useRef, useEffect, useContext } from "react";
import styles from "./index.module.css";
import search from "../../img/search.svg";
import PropTypes from "prop-types";
import { ajaxGetRequest, addRequest } from "../../requestFunctions";
import { MyContext } from "../../context";

const Form = props => {
  const { setData, value, setValue, requests, setAjaxError, setRequests } = {
    ...props
  };
  const darkTheme = useContext(MyContext);
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
        e.preventDefault();
        if (textInput.current.value === requests[0]) {
          e.preventDefault();
          return;
        }
        ajaxGetRequest(textInput.current.value)
          .then(data => {
            setData(data);
            addRequest(textInput.current.value, requests, setRequests);
            setAjaxError(false);
          })
          .catch(() => {
            setAjaxError(true);
          });
        setValue(textInput.current.value);
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
  setData: PropTypes.func.isRequired,
  darkTheme: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  requests: PropTypes.array.isRequired,
  setAjaxError: PropTypes.func.isRequired
};

export default Form;
