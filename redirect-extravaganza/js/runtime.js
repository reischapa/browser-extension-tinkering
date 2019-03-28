window.onload = () => {
  let matches = document.getElementsByClassName('ytp-large-play-button ytp-button');

  const playButton = matches && matches[0];

  if (playButton && typeof playButton.click === 'function') {
    playButton.click();
  }
};
