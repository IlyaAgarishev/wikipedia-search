import randomWords from "random-words";
import {
  beautifyResponseText,
  ajaxGetRequest,
  getRequestsStringPreview,
  addRequest
} from "../requestFunctions.js";

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

test("getRequestsStringPreview", () => {
  const request = "request";
  const requests = ["one", "two", "three"];
  expect(typeof getRequestsStringPreview(request, requests)).toBe("string");
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
