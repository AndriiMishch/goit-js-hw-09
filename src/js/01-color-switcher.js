//variablles
const startBTN = document.querySelector('[data-start]');
const stopBTN = document.querySelector('[data-stop]');
const body = document.querySelector('body')
let intervalId;

//listeming to event
startBTN.addEventListener('click', startInterval);
stopBTN.addEventListener('click', stopInterval)

//FUNCTIONS
function startInterval() {
  intervalId = setInterval(() => {
    setColor()
  }, 1000);
  console.log('interval setted');
  startBTN.toggleAttribute('disabled')
  stopBTN.toggleAttribute('disabled')
}

function stopInterval() {
    clearTimeout(intervalId);
    console.log('interval cleared');
    stopBTN.toggleAttribute('disabled')
    startBTN.toggleAttribute('disabled')
  }

function setColor() {
    body.style.backgroundColor = getRandomHexColor()
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}