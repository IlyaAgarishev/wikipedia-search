import React from "react";

// Ajax get request function
export const ajaxGetRequest = title => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();

    xhr.open(
      "GET",
      `https://en.wikipedia.org/w/api.php?action=opensearch&search=${title}&origin=*&format=json`,
      true
    );

    xhr.onload = function() {
      if (this.status === 200) {
        resolve(JSON.parse(this.responseText));
      } else {
        let error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
    };

    xhr.onerror = function() {
      reject(new Error("Network error"));
    };

    xhr.send();
  });
};

const getRequestsStringPreview = (request, requests) => {
  let requestsString = "";
  requests.map(element => (requestsString += element));
  let requestsStringPreview = requestsString + request;
  return requestsStringPreview;
};

export const addRequest = (request, requests, callback) => {
  if (request.length > 30) {
    request = request.slice(0, 30);
  }

  let requestsStringPreview = getRequestsStringPreview(request, requests);
  if (requestsStringPreview.length > 60) {
    while (requestsStringPreview.length > 60) {
      requests.pop();
      requestsStringPreview = getRequestsStringPreview(request, requests);
    }
    requests.unshift(request);
  } else {
    requests.unshift(request);
  }
  callback(requests);
};
