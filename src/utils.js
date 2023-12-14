export function setCurrentBirdInURL(bird) {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('currentBird', bird);
    const newURL = `${window.location.pathname}?${urlParams.toString()}`;
    window.history.replaceState({ path: newURL }, '', newURL);
  }