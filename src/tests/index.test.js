import React from "react";
import { mount, render, shallow } from "enzyme";
import App from "../components/App";
import Item from "../components/Item";
import Toggle from "../components/Toggle";
import Form from "../components/Form";
import Requests from "../components/Requests";
import randomWords from "random-words";
import {
  beautifyResponseText,
  ajaxGetRequest,
  getRequestsStringPreview,
  removeRepeatingRequest,
  addRequest
} from "../requestFunctions.js";

// Functions testing

test("beautifyResponseText returns an array and 1st element length of this array equals 3", () => {
  const data = ["Test_0", ["Test_1"], ["Test_2"], ["www.test.com"]];
  expect(Array.isArray(beautifyResponseText(data))).toBe(true);
  expect(Object.keys(beautifyResponseText(data)[0]).length).toBe(3);
});

test("Ajax get request returns 10 length array", () => {
  return ajaxGetRequest(randomWords()).then(data => {
    expect(data.length).toBe(10);
    expect(Array.isArray(data)).toBe(true);
  });
});

test("Length of objects of ajax returned array equals 3 and items in every object are strings", () => {
  return ajaxGetRequest(randomWords()).then(data => {
    for (let i = 0; i < data.length; i++) {
      expect(Object.keys(data[i]).length).toBe(3);
      Object.keys(data[i]).forEach(item => {
        expect(typeof item).toBe("string");
      });
    }
  });
});

test("getRequestsStringPreview is a string and has correct length", () => {
  const request = "request";
  const requests = ["one", "two", "three"];
  const compressedString = request + requests.join("");
  expect(typeof getRequestsStringPreview(request, requests)).toBe("string");
  expect(getRequestsStringPreview(request, requests).length).toBe(
    compressedString.length
  );
});

test("removeRepeatingRequest returns right array", () => {
  let request = "one";
  let requests = ["one", "two", "one"];
  expect(Array.isArray(removeRepeatingRequest(request, requests))).toBe(true);
  expect(removeRepeatingRequest(request, requests)).toEqual(["one", "two"]);
});

test("addRequest returns array and sum of lengths array elements <= 60 ", () => {
  const request = "request";
  const requests = [
    "oneoneoneoneoneoneoneoneoneoneoneoneoneone",
    "twotwotwotwotwotwotwotwotwotwotwotwotwotwotwo",
    "threethreethreethreethreethreiethreethree"
  ];
  addRequest(request, requests, data => {
    expect(Array.isArray(data)).toBe(true);
    expect(data.join("").length < 60).toBe(true);
  });
});

// Components testing

test("Item renders props correctly", () => {
  const props = {
    title: "title",
    snippet: "snippet",
    link: "link"
  };
  const component = mount(
    <Item title={props.title} snippet={props.snippet} link={props.link} />
  );
  expect(component.find(".title").text()).toBe(props.title);
  expect(component.find(".snippet").text()).toBe(props.snippet);
  expect(component.find(".title").props()).toHaveProperty("href", props.link);
});

test("Toggle renders props correctly", () => {
  const func = jest.fn();
  const component = mount(<Toggle setDarkTheme={func} />);
  expect(component.props()).toHaveProperty("setDarkTheme", func);
});

test("Form renders props correctly", () => {
  const func = jest.fn();
  const props = {
    setData: func,
    value: "value",
    setValue: func,
    requests: ["wow", "how"],
    setAjaxError: func,
    setRequests: func
  };
  const component = mount(<Form {...props} />);
  expect(component.props()).toEqual(props);
});

test("Requests renders props correctly", () => {
  const func = jest.fn();
  const props = {
    requests: ["wow", "how"],
    setValue: func
  };
  const component = mount(
    <Requests requests={props.requests} setValue={props.setValue} />
  );
  expect(component.props()).toHaveProperty("requests", props.requests);
  expect(component.props()).toHaveProperty("setValue", props.setValue);
});

// test("shallow App snapshot", () => {
//   const component = shallow(<App />);
//   expect(component).toMatchSnapshot();
// });
