let configKeys = ['performRedirect', 'targetVideoId', 'timeout'];


document.addEventListener('DOMContentLoaded', () => {
  const performRedirectCheckbox = document.getElementById('performRedirectCheckbox');
  const videoIdInput = document.getElementById('videoIdInput');
  const timeoutInput = document.getElementById('timeoutInput');
  const saveButton = document.getElementById('saveButton');

  const defaultVideoId = 'UxBl73QX000&t=26';

  const defaultSettings = {
    performRedirect: false,
    targetVideoId: defaultVideoId,
    timeout: undefined
  };

  chrome.storage.local.get(configKeys, result => {
    const settings = Object.assign(defaultSettings, result);

    performRedirectCheckbox.addEventListener('click', (event) => {
      settings.performRedirect = event.target.checked;
    });

    videoIdInput.addEventListener('change', (event) => {
      settings.targetVideoId = event.target.value;
    });

    timeoutInput.addEventListener('change', (event) => {
      settings.timeout = event.target.value;
    });

    saveButton.addEventListener('click', () => {
      chrome.storage.local.set(settings, () => {
        alert('Settings saved!')
        updateFields();
      });
    });

    function updateFields() {
      chrome.storage.local.get(configKeys, result => {
        performRedirectCheckbox.checked = !!result.performRedirect;
        videoIdInput.value = result.targetVideoId;
        timeoutInput.value =  result.timeout || '';
      });
    }

    updateFields();
  })
});


