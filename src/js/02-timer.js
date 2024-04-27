//IMPORTS
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

// VARIABLES
const input = document.querySelector('input')
const startBTN = document.querySelector('[data-start]')
const stopBTN = document.querySelector('[data-stop]')
const daysValue = document.querySelector('[data-days]')
const hoursValue = document.querySelector('[data-hours]')
const minutesValue = document.querySelector('[data-minutes]')
const secondsValue = document.querySelector('[data-seconds]')
let date
let intervalId
let targetDate

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    currentDate()
    if(selectedDates[0].getTime() <= date.getTime()){
      Notiflix.Notify.failure('Please choose a date in the future');
      startBTN.setAttribute('disabled', true)
    } else {
      Notiflix.Notify.success('That is a good date');
      startBTN.removeAttribute('disabled')
    }
    targetDate = selectedDates[0].getTime()
  },
};

//EVENT LISTENERS 
startBTN.addEventListener('click', ()=>{
  intervalId = setInterval(()=>{
    currentDate()
    let timeLeft = convertMs(targetDate - date.getTime())
    daysValue.textContent = timeLeft.days
    hoursValue.textContent = timeLeft.hours
    minutesValue.textContent = timeLeft.minutes
    secondsValue.textContent = timeLeft.seconds
  },1000)
  input.setAttribute('disabled', true)
  startBTN.setAttribute('disabled', true)
  stopBTN.removeAttribute('disabled')
})

stopBTN.addEventListener('click', ()=>{
  clearInterval(intervalId)
  input.removeAttribute('disabled')
  startBTN.removeAttribute('disabled')
  stopBTN.setAttribute('disabled', true)
})

flatpickr(input, options)

//FUNCTIONS
function currentDate() {
  date = new Date
 }

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}