document.addEventListener('DOMContentLoaded', () => {
  const checkbox = document.getElementById('optionCheckbox');


  checkbox.addEventListener('click', (event) => {
    chrome.storage.local.set({performRedirect: event.target.checked});
  });

  chrome.storage.local.get(['performRedirect'], result => {
    checkbox.checked = !!result.performRedirect
  });
});


