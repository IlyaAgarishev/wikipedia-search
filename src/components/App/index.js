import React, { useState } from "react";
import styles from "./index.module.css";
import Form from "../Form";
import Item from "../Item";
import Toggle from "../Toggle";
import Requests from "../Requests";
import AjaxError from "../AjaxError";
import NoDataFound from "../NoDataFound";

const App = () => {
  const [requests, setRequests] = useState([]);
  const [darkTheme, setDarkTheme] = useState(false);
  const [value, setValue] = useState("");
  const [ajaxError, setAjaxError] = useState(false);
  const [data, setData] = useState();

  const wikiResults = () => {
    if (data && data.length === 0) {
      return <NoDataFound />;
    } else if (data && data.length !== 0) {
      return (
        <ul className={styles.items}>
          {data.map((element, index) => {
            return (
              <Item
                title={element.title}
                snippet={element.snippet}
                link={element.link}
                key={index}
                darkTheme={darkTheme}
              />
            );
          })}
        </ul>
      );
    }
  };

  darkTheme
    ? (document.body.style.background = "#05263f")
    : (document.body.style.background = "white");

  return (
    <div className={styles.app}>
      <Toggle switchTheme={setDarkTheme} darkTheme={darkTheme} />
      <div className={styles.logo}>wiki search</div>
      <Form
        setDataState={setData}
        darkTheme={darkTheme}
        value={value}
        setValueState={setValue}
        requests={requests}
        ajaxErrorState={setAjaxError}
        setRequests={setRequests}
      />
      <Requests requests={requests} setValueState={setValue} />
      {ajaxError ? <AjaxError /> : wikiResults()}
    </div>
  );
};

export default App;
