let devMode = false;

function consoleText(text, target) {
  const textArray = [];
  let timeout = 0;
  for (let i = 0; i < text.length; i++) {
    textArray.push(text.charAt(i));
  }
  textArray.forEach((character, i) => {
    timeout = timeout + 120;
    setTimeout(() => target.append(character), timeout);
  });
};

function removeElement(elementId) {
  var element = document.getElementById(elementId);
  element.parentNode.removeChild(element);
};

function toggleDevMode(button) {
  const consoleWrapper = document.getElementById('console-wrapper');
  const logo = document.getElementById('logo-img');
  devMode = !devMode;
  if (devMode) {
    const target = document.getElementById('console-text');
    document.querySelector('head').innerHTML += '<link rel="stylesheet" href="./css/dev-mode.css" id="dev-mode-css">';
    consoleWrapper.classList.add('d-flex');
    logo.src= './assets/smartpension-white.svg';
    target.innerHTML = '';
    button.innerText = 'Regular Mode';
    setTimeout(() => consoleText('Best of Luck!', target), 1000);
  } else {
    consoleWrapper.classList.remove('d-flex');
    logo.src= './assets/smartpension.svg';
    button.innerText = 'Dev Mode';
    removeElement('dev-mode-css');
  }
};
