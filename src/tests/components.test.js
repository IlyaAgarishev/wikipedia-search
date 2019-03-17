import React from "react";
import { mount, render, shallow } from "enzyme";
import App from "../components/App";
import Item from "../components/Item";
import Toggle from "../components/Toggle";
import Form from "../components/Form";

test("shallow App snapshot", () => {
  const component = shallow(<App />);
  expect(component).toMatchSnapshot();
});

test("Item snapshot darkFalse", () => {
  const component = shallow(
    <Item title="title" snippet="snippet" link="link" darkTheme={false} />
  );
  expect(component).toMatchSnapshot();
});

test("Item snapshot darkTrue", () => {
  const component = shallow(
    <Item title="title" snippet="snippet" link="link" darkTheme={true} />
  );
  expect(component).toMatchSnapshot();
});

test("Toggle snapshot", () => {
  const component = mount(<Toggle switchTheme={jest.fn()} />);
  expect(component).toMatchSnapshot();
  component.unmount();
});

test("Form snapshot darkFalse", () => {
  const component = shallow(
    <Form
      setDataState={jest.fn()}
      darkTheme={false}
      value="value"
      setValueState={jest.fn()}
      requests={["one", "two"]}
      ajaxErrorState={jest.fn()}
    />
  );
  expect(component).toMatchSnapshot();
});

test("Form snapshot darkTrue", () => {
  const component = shallow(
    <Form
      setDataState={jest.fn()}
      darkTheme={true}
      value="value"
      setValueState={jest.fn()}
      requests={["one", "two"]}
      ajaxErrorState={jest.fn()}
    />
  );
  expect(component).toMatchSnapshot();
});
