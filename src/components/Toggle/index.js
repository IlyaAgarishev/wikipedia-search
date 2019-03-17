import React from "react";
import styles from "./index.module.css";
import PropTypes from "prop-types";
import Toggle from "react-toggle";
import "./toggle.css";

const ToggleTheme = ({ switchTheme }) => (
  <label className={styles.toggleTheme}>
    <Toggle defaultChecked={false} icons={false} onChange={switchTheme} />
  </label>
);

ToggleTheme.propTypes = {
  switchTheme: PropTypes.func.isRequired
};

export default ToggleTheme;
