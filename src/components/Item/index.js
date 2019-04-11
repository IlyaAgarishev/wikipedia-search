import React, { useContext } from "react";
import styles from "./index.module.css";
import PropTypes from "prop-types";
import { MyContext } from "../../context";

const Item = props => {
  const { title, snippet, link } = { ...props };
  const darkTheme = useContext(MyContext);
  return (
    <li className={styles.item}>
      <a
        href={link}
        className={styles.title}
        target="_blank"
        rel="noopener noreferrer"
      >
        {title}
      </a>
      <div
        className={
          darkTheme
            ? [styles.snippet, styles.snippetDark].join(" ")
            : styles.snippet
        }
      >
        {snippet}
      </div>
    </li>
  );
};

Item.propTypes = {
  title: PropTypes.string.isRequired,
  snippet: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
};

export default Item;
