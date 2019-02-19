import React from 'react';
import styles from './index.module.css';

const AjaxError = () => (
  <div className={styles.ajaxError}>
    <span style={{ color: 'red' }}>Error occurred.</span> Try to reload the page or check the
    internet connection :(
  </div>
);

export default AjaxError;
