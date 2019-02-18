import React, { Component } from 'react';
import styles from './index.module.css';
import Form from '../Form';
import Item from '../Item';
import Toggle from '../Toggle';
import Requests from '../Requests';

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

    this.state = { data: [], requests: [], darkTheme: false };
  }

  setDataState = data => {
    this.setState({ data: data });
  };

  switchTheme = () => {
    this.setState({ darkTheme: !this.state.darkTheme });
  };

  changeBodyBackground = () => {
    this.state.darkTheme
      ? (document.body.style.background = '#05263f')
      : (document.body.style.background = 'white');
  };

  getRequestsStringPreview = request => {
    let requests = this.state.requests;
    let requestsString = '';
    requests.map(element => {
      requestsString += element;
    });
    let requestsStringPreview = requestsString + request;
    return requestsStringPreview;
  };

  addRequest = request => {
    if (request.length > 30) {
      request = request.slice(0, 30);
    }

    let requests = this.state.requests;
    let requestsStringPreview = this.getRequestsStringPreview(request);
    if (requestsStringPreview.length > 60) {
      while (requestsStringPreview.length > 60) {
        requests.pop();
        requestsStringPreview = this.getRequestsStringPreview(request);
      }
      requests.unshift(request);
    } else {
      requests.unshift(request);
    }
    this.setState({ requests: requests });
  };

  render() {
    this.changeBodyBackground();
    return (
      <div className={styles.app}>
        <Toggle switchTheme={this.switchTheme} />
        <div className={styles.logo}>wiki search</div>
        <Form
          setDataState={this.setDataState}
          darkTheme={this.state.darkTheme}
          addRequest={this.addRequest}
        />
        <Requests requests={this.state.requests} />
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
