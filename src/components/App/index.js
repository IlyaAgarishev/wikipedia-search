import React, { Component } from "react";
import styles from "./index.module.css";
import Form from "../Form";
import Item from "../Item";
import Toggle from "../Toggle";
import Requests from "../Requests";
import AjaxError from "../AjaxError";
import NoDataFound from "../NoDataFound";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      requests: [],
      darkTheme: false,
      value: "",
      ajaxError: false
    };
  }

  setDataState = data => {
    this.setState({ data: data });
  };

  setValueState = value => {
    this.setState({ value: value });
  };

  setRequests = requests => {
    this.setState({ requests: requests });
  };

  switchTheme = () => {
    this.setState({ darkTheme: !this.state.darkTheme });
  };

  changeBodyBackground = () => {
    this.state.darkTheme
      ? (document.body.style.background = "#05263f")
      : (document.body.style.background = "white");
  };

  ajaxErrorState = bool => {
    this.setState({ ajaxError: bool });
  };

  wikiResults = () => {
    if (this.state.data && this.state.data.length === 0) {
      return <NoDataFound />;
    } else if (this.state.data && this.state.data.length !== 0) {
      return (
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
      );
    }
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
          value={this.state.value}
          setValueState={this.setValueState}
          requests={this.state.requests}
          ajaxErrorState={this.ajaxErrorState}
          setRequests={this.setRequests}
        />
        <Requests
          requests={this.state.requests}
          setValueState={this.setValueState}
        />
        {this.state.ajaxError ? <AjaxError /> : this.wikiResults()}
      </div>
    );
  }
}

export default App;
