import React, { useContext } from "react";
import styles from "./index.module.css";
import PropTypes from "prop-types";
import Toggle from "react-toggle";
import "./toggle.css";
import { MyContext } from "../../context";

const ToggleTheme = ({ setDarkTheme }) => {
  const darkTheme = useContext(MyContext);
  return (
    <label className={styles.toggleTheme}>
      <Toggle
        defaultChecked={false}
        icons={false}
        onChange={() => {
          setDarkTheme(!darkTheme);
        }}
      />
    </label>
  );
};

ToggleTheme.propTypes = {
  setDarkTheme: PropTypes.func.isRequired
};

export default ToggleTheme;
