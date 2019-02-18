import React from 'react';
import styles from './index.module.css';
import search from '../../img/search.svg';
import PropTypes from 'prop-types';

const Requests = props => (
  <div className={styles.requests}>
    {props.requests.map((element, index) => {
      return (
        <div className={styles.request} key={index}>
          {element}
        </div>
      );
    })}
  </div>
);

Requests.propTypes = {
  requests: PropTypes.array.isRequired
};

export default Requests;
