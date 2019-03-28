chrome.runtime.onMessage.addListener((message, messageSender, sendResponse) => {
  switch (message.payload) {
    default:
      chrome.storage.local.get(['performRedirect'], result => {
        let payload = result.performRedirect ? 'GONE' : 'NOT_GONE';

        if (result.performRedirect) {
          console.log(payload);
        }

        sendResponse({payload});
      });
      return true;
  }
});


