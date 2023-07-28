
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';


const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');
const startBtn = document.querySelector('button[data-start]');


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    targetDate = selectedDates[0];
    if (targetDate.getTime() < options.defaultDate.getTime()) {
      Notiflix.Report.warning(
        "Incorrect date",
        'Please choose a date in the future',
        'Okay'
      );
      startBtn.toggleAttribute('disabled');
    } else {
        startBtn.removeAttribute('disabled');
    }
  },
};


flatpickr('input#datetime-picker', options);


let targetDate = null;
let timer = null;
const interval = 1000;


startBtn.addEventListener('click', () => {
  if (targetDate && !timer) { 
      timer = setInterval(() => {
          let currentDateInMs = new Date().getTime();
          let timeDiff = targetDate.getTime() - currentDateInMs;
          if (timeDiff <= 0) {
              clearInterval(timer);
              timer = null; 
          }

          let remainingTime = convertMs(timeDiff);
          const timeUnits = {
              days: daysSpan,
              hours: hoursSpan,
              minutes: minutesSpan,
              seconds: secondsSpan,
          };
          

          Object.keys(timeUnits).forEach((unit) => {
              timeUnits[unit].textContent = String(remainingTime[unit]).padStart(2, '0');
          });


      }, interval);
      startBtn.toggleAttribute('disabled');
  }
});


function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}