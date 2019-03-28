chrome.webRequest.onCompleted.addListener(
  () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      if (tabs.length === 0) {
        return;
      }
      setTimeout(() => {
        chrome.tabs.sendMessage(tabs[0].id, {payload: 'GO'}, (response) => {
          console.log(response)
        })
      }, 1000);
    });
  },
  {
    urls: ["*://example.com/*"],
    types: ["main_frame"]
  }
);

/*
const sourceUrls = ["*://github.com/*"];

chrome.webRequest.onBeforeRequest.addListener(
  () => {
    return {redirectUrl: "http://localhost:8080"};
  },
  {
    urls: sourceUrls,
    types: ["main_frame"]
  },
  ["blocking"]
);



// details is not used in this case
// fields available depend on what event
// the callback is registered on
function cancelRequest(details) {
  return {cancel: true};
}

// add the listener,
// passing the filter argument in the second argument,
// and "blocking" in the third argument
browser.webRequest.onBeforeRequest.addListener(
  cancelRequest,
  {urls: ["*://example.com/*"], types: ["main_frame"]},
  ["blocking"]
);


// Add the new header to the original array,
// and return it.
function setCookie(details) {
  const setMyCookie = {
    name: "Set-Cookie",
    value: "my-cookie1=my-cookie-value1"
  };
  details.responseHeaders.push(setMyCookie);
  return {responseHeaders: details.responseHeaders};
}

// Listen for onHeaderReceived for the target page.
// Set "blocking" and "responseHeaders", in order to
// be able to access response headers AND apply changes.
browser.webRequest.onHeadersReceived.addListener(
  setCookie,
  {urls: ["*://example.com/*"]},
  ["blocking", "responseHeaders"]
);

// examples taken from MDN

const target = "*://example.com/*";

function logResponse(details) {
  console.log(details.url);
  console.log(details.statusCode);
}

// e.g., with no network:
// "https://developer.mozilla.org/en-US/"
// NS_ERROR_NET_ON_RESOLVED in Firefox
// net::ERR_INTERNET_DISCONNECTED in Chrome

function logError(responseDetails) {
  console.log(responseDetails.url);
  console.log(responseDetails.error);
}

browser.webRequest.onCompleted.addListener(
  logResponse,
  {urls: [target]}
);

browser.webRequest.onErrorOccurred.addListener(
  logError,
  {urls: [target]}
);

*/