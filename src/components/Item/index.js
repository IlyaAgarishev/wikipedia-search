import React from 'react';
import styles from './index.module.css';
import PropTypes from 'prop-types';

const Item = props => (
  <li className={styles.item}>
    <a href={props.link} className={styles.title} target="_blank" rel="noopener noreferrer">
      {props.title}
    </a>
    <div className={styles.snippet}>{props.snippet}</div>
  </li>
);

Item.propTypes = {
  title: PropTypes.string.isRequired,
  snippet: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
};

export default Item;