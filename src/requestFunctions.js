// Transformating wiki data into comfortable array
export const beautifyResponseText = data => {
  const finalArray = [];
  for (let index = 0; index < data[1].length; index++) {
    const obj = {
      title: data[1][index],
      snippet: data[2][index],
      link: data[3][index]
    };
    finalArray.push(obj);
  }
  return finalArray;
};

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
        resolve(beautifyResponseText(JSON.parse(this.responseText)));
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

export const getRequestsStringPreview = (request, requests) => {
  return requests.join("") + request;
};

export const removeRepeatingRequest = (request, requests) => {
  let conunter = 0;
  requests.map((element, index) => {
    if (element === request) {
      conunter++;
      if (conunter > 1) {
        requests.splice(index, 1);
      }
    }
  });
};

export const addRequest = (request, requests, callback) => {
  if (request.length > 27) {
    request = request.slice(0, 27) + "...";
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
  removeRepeatingRequest(request, requests);
  callback([...requests]);
};
