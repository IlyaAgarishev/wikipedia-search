import React from "react";
import { mount, render, shallow } from "enzyme";
import App from "../components/App";
import Item from "../components/Item";
import Toggle from "../components/Toggle";
import Form from "../components/Form";
import Requests from "../components/Requests";
import AjaxTime from "../components/AjaxTime";
import randomWords from "random-words";
import {
  beautifyResponseText,
  ajaxGetRequest,
  getRequestsStringPreview,
  addRequest,
  findMostFrequentWord,
  beautifyFrequentWords
} from "../utils";
import AjaxError from "../components/AjaxError";
import Filter from "../components/Filter";
import Limit from "../components/Limit";

// Functions testing

test("beautifyFrequentWords", () => {
  const data = [
    {
      title: "title",
      snippet: "snippet",
      mostFrequentWord: "word_1",
      link: "www.test.com"
    },
    {
      title: "title",
      snippet: "snippet",
      mostFrequentWord: "word_2",
      link: "www.test.com"
    },
    {
      title: "title",
      snippet: "snippet",
      mostFrequentWord: "word_3",
      link: "www.test.com"
    },
    {
      title: "title",
      snippet: "snippet",
      mostFrequentWord: "word_3",
      link: "www.test.com"
    }
  ];
  expect(Array.isArray(beautifyFrequentWords(data))).toBe(true);
  expect(beautifyFrequentWords(data)).toEqual([
    data[0].mostFrequentWord,
    data[1].mostFrequentWord,
    data[2].mostFrequentWord
  ]);
});

test("findMostFrequentWord", () => {
  const data = "Wow Wow How How how";
  expect(typeof findMostFrequentWord(data)).toBe("string");
  expect(findMostFrequentWord(data)).toBe("how");
});

test("beautifyResponseText returns right array", () => {
  const data = [
    "Test_0",
    ["Test_1"],
    ["Wow Wow How How how Go bow bow now"],
    ["www.test.com"]
  ];
  expect(Array.isArray(beautifyResponseText(data))).toBe(true);
  expect(Object.keys(beautifyResponseText(data)[0]).length).toBe(4);
  expect(beautifyResponseText(data)).toEqual([
    {
      title: data[1][0],
      snippet: data[2][0],
      link: data[3][0],
      mostFrequentWord: findMostFrequentWord(data[2][0])
    }
  ]);
});

test("ajaxGetRequest returns right array", () => {
  const limit = [10, 50, 100];
  const randomLimit = limit[Math.floor(Math.random() * limit.length)];
  return ajaxGetRequest(randomWords()).then(data => {
    expect(data.length).toBeLessThanOrEqual(randomLimit);
    expect(Array.isArray(data)).toBe(true);
  });
});

test("ajaxGetRequest - length of objects of ajax returned array equals 4 and items in every object are strings", () => {
  return ajaxGetRequest(randomWords()).then(data => {
    for (let i = 0; i < data.length; i++) {
      expect(Object.keys(data[i]).length).toBe(4);
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

test("Requests renders props correctly", () => {
  const func = jest.fn();
  const props = {
    requests: ["wow", "how"],
    setValue: func
  };
  const component = mount(
    <Requests requests={props.requests} setValue={props.setValue} />
  );
  for (let index = 0; index < props.requests.length; index++) {
    expect(
      component
        .find(".request")
        .at(index)
        .text()
    ).toBe(props.requests[index]);
  }
});

test("AjaxTime renders props correctly", () => {
  const time = 10;
  const component = mount(<AjaxTime ajaxTime={time} />);
  expect(component.find(".ajaxTimeNumber").text()).toBe(
    `${time.toFixed(5)} ms`
  );
});

test("Filter renders props correctly", () => {
  const data = [
    {
      title: "title",
      snippet: "snippet",
      mostFrequentWord: "word_1",
      link: "www.test.com"
    },
    {
      title: "title",
      snippet: "snippet",
      mostFrequentWord: "word_2",
      link: "www.test.com"
    },
    {
      title: "title",
      snippet: "snippet",
      mostFrequentWord: "word_3",
      link: "www.test.com"
    },
    {
      title: "title",
      snippet: "snippet",
      mostFrequentWord: "word_3",
      link: "www.test.com"
    }
  ];
  const component = mount(
    <Filter
      data={data}
      setFilteredData={jest.fn()}
      setShowFilteredData={jest.fn()}
    />
  );
  let mostFrequentWords = beautifyFrequentWords(data);

  for (let index = 0; index < mostFrequentWords.length; index++) {
    expect(
      component
        .find(".word")
        .at(index)
        .text()
    ).toBe(mostFrequentWords[index]);
  }
});

test("Limit renders props correctly", () => {
  const component = mount(<Limit limit={10} setLimit={jest.fn()} />);
  const limitsArray = ["10", "50", "100"];
  for (let index = 0; index < limitsArray.length; index++) {
    expect(
      component
        .find(".limitButton")
        .at(index)
        .text()
    ).toBe(limitsArray[index]);
  }
});

// Snapshots

test("snapshots", () => {
  const data = [
    {
      title: "title",
      snippet: "snippet",
      mostFrequentWord: "word_1",
      link: "www.test.com"
    },
    {
      title: "title",
      snippet: "snippet",
      mostFrequentWord: "word_2",
      link: "www.test.com"
    }
  ];
  expect(shallow(<App />)).toMatchSnapshot();
  expect(
    shallow(<Item title={"title"} snippet={"snippet"} link={"link"} />)
  ).toMatchSnapshot();
  expect(shallow(<Toggle setDarkTheme={jest.fn()} />)).toMatchSnapshot();
  expect(
    shallow(
      <Form
        setData={jest.fn()}
        value={"Title"}
        setValue={jest.fn()}
        requests={["wow", "how"]}
        setAjaxError={jest.fn()}
        setRequests={jest.fn()}
        setAjaxTime={jest.fn()}
        setShowFilteredData={jest.fn()}
        setDataNotFound={jest.fn()}
        setOpenStuff={jest.fn()}
        limit={10}
      />
    )
  ).toMatchSnapshot();
  expect(
    shallow(<Requests requests={["wow", "how"]} setValue={jest.fn()} />)
  ).toMatchSnapshot();
  expect(shallow(<AjaxTime ajaxTime={10} />)).toMatchSnapshot();
  expect(
    shallow(
      <AjaxError
        ajaxError={{
          error: "No error",
          status: false
        }}
      />
    )
  ).toMatchSnapshot();
  expect(
    shallow(
      <Filter
        data={data}
        setFilteredData={jest.fn()}
        setShowFilteredData={jest.fn()}
      />
    )
  ).toMatchSnapshot();
  expect(shallow(<Limit limit={10} setLimit={jest.fn()} />)).toMatchSnapshot();
});
