import React, { useState } from "react";
import burger from "../../img/burger.svg";
import styles from "./index.module.css";
import Form from "../Form";
import Item from "../Item";
import Toggle from "../Toggle";
import Requests from "../Requests";
import AjaxError from "../AjaxError";
import NoDataFound from "../NoDataFound";
import { MyContext } from "../../context";
import AjaxTime from "../AjaxTime";
import Filter from "../Filter";
import Limit from "../Limit";
import { sideBarStyle } from "../../utils";

const App = () => {
  const [requests, setRequests] = useState([]);
  const [darkTheme, setDarkTheme] = useState(false);
  const [value, setValue] = useState("");
  const [ajaxError, setAjaxError] = useState({
    error: "No error",
    status: false
  });
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showFilteredData, setShowFilteredData] = useState(false);
  const [ajaxTime, setAjaxTime] = useState(0);
  const [dataNotFound, setDataNotFound] = useState();
  const [openStuff, setOpenStuff] = useState("start");
  const [limit, setLimit] = useState(10);

  const wikiResults = () => {
    if (dataNotFound) {
      return <NoDataFound />;
    } else {
      return (
        <ul className={styles.items}>
          {showFilteredData
            ? filteredData.map((element, index) => {
                return (
                  <Item
                    title={element.title}
                    snippet={element.snippet}
                    link={element.link}
                    key={index}
                  />
                );
              })
            : data.map((element, index) => {
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
      );
    }
  };

  darkTheme
    ? (document.body.style.background = "#05263f")
    : (document.body.style.background = "white");

  return (
    <MyContext.Provider value={darkTheme}>
      <div className={styles.app}>
        <img
          src={burger}
          alt="burger"
          className={styles.burger}
          onClick={() => {
            setOpenStuff("open");
          }}
        />
        <div className={sideBarStyle(openStuff, styles, darkTheme)}>
          <div
            className={styles.closeBtn}
            onClick={() => setOpenStuff("close")}
          >
            X
          </div>
          <AjaxTime ajaxTime={ajaxTime} />
          <Limit limit={limit} setLimit={setLimit} />
          <Filter
            data={data}
            setFilteredData={setFilteredData}
            setShowFilteredData={setShowFilteredData}
          />
        </div>
        <Toggle setDarkTheme={setDarkTheme} />

        <div className={styles.logo}>wiki search</div>
        <Form
          setData={setData}
          value={value}
          setValue={setValue}
          requests={requests}
          setAjaxError={setAjaxError}
          setRequests={setRequests}
          setAjaxTime={setAjaxTime}
          setShowFilteredData={setShowFilteredData}
          setDataNotFound={setDataNotFound}
          setOpenStuff={setOpenStuff}
          limit={limit}
        />
        <Requests requests={requests} setValue={setValue} />
        {data.length ? (
          <div className={styles.resultsLength}>{data.length} results</div>
        ) : null}
        {ajaxError.status ? <AjaxError ajaxError={ajaxError} /> : wikiResults()}
      </div>
    </MyContext.Provider>
  );
};

export default App;
