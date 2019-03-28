// setup storageCache in order to have sync access to configuration
let storageCache = {};
let configKeys = ['performRedirect', 'targetVideoId', 'timeout'];

const buildStorageCache =
  (result, configKeys, initialStorageCache = {}) =>
    configKeys.reduce((acc, key) => {
      acc[key] = result[key];
      return acc;
    }, initialStorageCache);

chrome.storage.local.get(configKeys, result => {
  storageCache = buildStorageCache(result, configKeys);
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== 'local') {
    return;
  }

  for (key in changes) {
    storageCache[key] = changes[key].newValue;
  }
});


// handle configuration change
let shouldPerformRedirectOnNextRequest;

let getNextTimeout = () => storageCache.timeout || 5000;

function setFlagValue() {
  shouldPerformRedirectOnNextRequest = storageCache.performRedirect;

  setTimeout(setFlagValue, getNextTimeout());
}

setFlagValue();

// this is necessary in order to immediately disable redirects
// when the setting is changed, instead of waiting for the next call of setFlagValue
chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== 'local') {
    return;
  }

  if (typeof changes.performRedirect !== 'undefined') {
    shouldPerformRedirectOnNextRequest = changes.performRedirect.newValue;
  }

});


// attach onBeforeRequest listener
const triggerUrl = '*://github.com/*';

chrome.webRequest.onBeforeRequest.addListener(
  () => {
    if (shouldPerformRedirectOnNextRequest) {
      shouldPerformRedirectOnNextRequest = false;
      return {
        redirectUrl: `https://www.youtube.com/embed/${storageCache.targetVideoId}`
      };
    }
  },
  {
    urls: [triggerUrl],
    types: ['main_frame']
  },
  ['blocking']
);

