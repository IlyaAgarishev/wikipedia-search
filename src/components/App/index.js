import React, { Component } from 'react';
import styles from './index.module.css';
import Form from '../Form';
import Item from '../Item';

// xhr.open(
//   'GET',
//   'https://en.wikipedia.org/w/api.php?action=parse&page=Putin&origin=*&format=json&prop=wikitext',
//   true
// );

// xhr.open(
//   'GET',
//   'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&titles=Putin&origin=*&format=json',
//   true
// );

// xhr.open(
//   'GET',
//   'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&titles=Rainbow&origin=*&format=json',
//   true
// );

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { data: [], value: '' };
  }

  setDataState = data => {
    this.setState({ data: data });
  };

  setValueState = value => {
    this.setState({ value: value });
  };

  render() {
    return (
      <div className={styles.app}>
        <Form
          setDataState={this.setDataState}
          setValueState={this.setValueState}
          value={this.state.value}
        />
        <ul className={styles.items}>
          {this.state.data.map((element, index) => {
            return (
              <Item
                title={element.title}
                snippet={element.snippet}
                link={element.link}
                key={index}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default App;
