function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const startBtn = document.querySelector("[data-start]");
const stopBtn = document.querySelector("[data-stop]");
const body = document.querySelector('body')
let timerId = null;


startBtn.addEventListener("click", () => {
  timerId = setInterval(getBgColor , 1000);

  startBtn.toggleAttribute('disabled');
  stopBtn.removeAttribute('disabled');
});


function getBgColor() {
  const color = getRandomHexColor();
  body.style.background = color;
};


stopBtn.addEventListener("click", () => {
  clearInterval(timerId);
  
  stopBtn.toggleAttribute('disabled');
  startBtn.removeAttribute('disabled');
});
