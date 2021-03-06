import React, { useRef, useEffect, useContext, useState } from "react";
import styles from "./index.module.css";
import search from "../../img/search.svg";
import PropTypes from "prop-types";
import { ajaxGetRequest, addRequest } from "../../utils";
import { MyContext } from "../../context";

const Form = props => {
  const {
    setData,
    value,
    setValue,
    requests,
    setAjaxError,
    setRequests,
    setAjaxTime,
    setShowFilteredData,
    setDataNotFound,
    setOpenStuff,
    limit
  } = {
    ...props
  };
  const darkTheme = useContext(MyContext);
  const textInput = useRef(null);
  const [openSideBarOnce, setOpenSideBarOnce] = useState(true);

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
        let timeBeforeAjax = window.performance.now();
        ajaxGetRequest(textInput.current.value, limit)
          .then(data => {
            if (data.length > 0) {
              setData(data);
              setDataNotFound(false);
            } else {
              setData(data);
              setDataNotFound(true);
            }
            addRequest(textInput.current.value.trim(), requests, setRequests);
            setAjaxError({ error: "No error", status: false });
            let timeAfterAjax = window.performance.now();
            setAjaxTime(timeAfterAjax - timeBeforeAjax);
          })
          .catch(error => {
            setAjaxError({ error: error, status: true });
          });
        setValue(textInput.current.value);
        setShowFilteredData(false);
        if (openSideBarOnce && window.innerWidth > 1330) {
          setOpenStuff("open");
          setOpenSideBarOnce(false);
        }
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
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  requests: PropTypes.array.isRequired,
  setAjaxError: PropTypes.func.isRequired,
  setAjaxTime: PropTypes.func.isRequired,
  setShowFilteredData: PropTypes.func.isRequired,
  setDataNotFound: PropTypes.func.isRequired,
  limit: PropTypes.number.isRequired
};

export default Form;
