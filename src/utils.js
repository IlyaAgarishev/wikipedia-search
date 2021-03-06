export const beautifyFrequentWords = data => {
  if (data) {
    let mostFrequentWords = data.map(element => {
      return element.mostFrequentWord;
    });
    return [...new Set(mostFrequentWords)];
  }
};

export const findMostFrequentWord = string => {
  let array = string.toLowerCase().split(" ");
  let counts = {};
  let compare = 0;
  let mostFrequent;
  for (let i = 0; i < array.length; i++) {
    let word = array[i];

    if (counts[word] === undefined) {
      counts[word] = 1;
    } else {
      counts[word] = counts[word] + 1;
    }
    if (counts[word] > compare) {
      compare = counts[word];
      mostFrequent = array[i].replace(/\W/g, "");
    }
  }
  return mostFrequent;
};

// Transformating wiki data into comfortable array
export const beautifyResponseText = data => {
  const finalArray = [];
  for (let index = 0; index < data[1].length; index++) {
    const title = data[1][index];
    const snippet = data[2][index];
    const link = data[3][index];
    const mostFrequentWord = findMostFrequentWord(snippet);
    const obj = {
      title: title,
      snippet: snippet,
      link: link,
      mostFrequentWord: mostFrequentWord
    };
    finalArray.push(obj);
  }
  return finalArray;
};

export const ajaxGetRequest = (title, limit) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();

    xhr.open(
      "GET",
      `https://en.wikipedia.org/w/api.php?action=opensearch&search=${title}&origin=*&format=json&limit=${limit}`,
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
  callback([...new Set(requests)]);
};

export const sideBarStyle = (openStuff, styles, darkTheme) => {
  if (darkTheme === false) {
    switch (openStuff) {
      case "open":
        return [styles.sideBar, styles.sideBarOpen].join(" ");
      case "close":
        return [styles.sideBar, styles.sideBarClose].join(" ");
      case "start":
        return [styles.sideBar].join(" ");
      default:
        break;
    }
  } else {
    switch (openStuff) {
      case "open":
        return [
          styles.sideBar,
          styles.sideBarOpen,
          styles.sideBarDarkTheme
        ].join(" ");
      case "close":
        return [
          styles.sideBar,
          styles.sideBarClose,
          styles.sideBarDarkTheme
        ].join(" ");
      case "start":
        return [styles.sideBar, styles.sideBarDarkTheme].join(" ");
      default:
        break;
    }
  }
};
