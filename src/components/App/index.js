import React, { Component } from 'react';
import styles from './index.module.css';
import Form from '../Form';
import Item from '../Item';
import Toggle from '../Toggle';

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

    this.state = { data: [], value: '', darkTheme: false };
  }

  setDataState = data => {
    this.setState({ data: data });
  };

  setValueState = value => {
    this.setState({ value: value });
  };

  switchTheme = () => {
    this.setState({ darkTheme: !this.state.darkTheme });
  };

  changeBodyBackground = () => {
    this.state.darkTheme
      ? (document.body.style.background = '#05263f')
      : (document.body.style.background = 'white');
  };

  render() {
    this.changeBodyBackground();
    return (
      <div className={styles.app}>
        <Toggle switchTheme={this.switchTheme} />
        <div className={styles.logo}>wiki search</div>
        <Form
          setDataState={this.setDataState}
          setValueState={this.setValueState}
          value={this.state.value}
          darkTheme={this.state.darkTheme}
        />
        <ul className={styles.items}>
          {this.state.data.map((element, index) => {
            return (
              <Item
                title={element.title}
                snippet={element.snippet}
                link={element.link}
                key={index}
                darkTheme={this.state.darkTheme}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default App;
