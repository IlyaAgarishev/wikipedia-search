import React from 'react';
import styles from './index.module.css';
import search from '../../img/search.svg';
import PropTypes from 'prop-types';

// Ajax get request function
const ajaxGetRequest = (title, callback) => {
  let xhr = new XMLHttpRequest();

  xhr.open(
    'GET',
    `https://en.wikipedia.org/w/api.php?action=opensearch&search=${title}&origin=*&format=json`,
    true
  );

  xhr.send();

  xhr.onreadystatechange = function() {
    if (this.readyState !== 4) return;
    if (this.status !== 200) {
      console.log('Ошибка');
      return;
    }

    // Transformating wiki data into comfortable array
    const data = JSON.parse(this.responseText);
    const finalArray = [];
    for (let index = 0; index < data[1].length; index++) {
      const obj = {
        title: data[1][index],
        snippet: data[2][index],
        link: data[3][index]
      };
      finalArray.push(obj);
    }

    // And then setting state via callback
    callback(finalArray);
  };
};

const Form = props => {
  let textInput;
  return (
    <form
      className={styles.submitForm}
      onSubmit={e => {
        if (props.value === '') {
          e.preventDefault();
          return;
        }

        ajaxGetRequest(props.value, data => {
          props.setDataState(data);
        });

        e.preventDefault();
      }}
    >
      <input
        required
        type="text"
        ref={ref => {
          textInput = ref;
        }}
        onChange={() => {
          props.setValueState(textInput.value);
        }}
        className={styles.textInput}
      />
      <button className={styles.submitButton} type="submit">
        <img className={styles.searchIcon} src={search} alt="" />
      </button>
    </form>
  );
};

Form.propTypes = {
  value: PropTypes.string.isRequired,
  setDataState: PropTypes.func.isRequired,
  setValueState: PropTypes.func.isRequired
};

export default Form;