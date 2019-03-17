import React from "react";
import styles from "./index.module.css";
import PropTypes from "prop-types";

const Item = props => {
  const { title, snippet, link, darkTheme } = { ...props };
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
  link: PropTypes.string.isRequired,
  darkTheme: PropTypes.bool.isRequired
};

export default Item;
