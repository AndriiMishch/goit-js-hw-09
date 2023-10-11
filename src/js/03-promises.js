import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Notiflix from 'notiflix';

const form = document.querySelector('form');
const delayInp = document.querySelector('input[name="delay"]');
const stepInp = document.querySelector('input[name="step"]');
const amountInp = document.querySelector('input[name="amount"]');

form.addEventListener('submit', onSubmit);


const createPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  }, delay);
});


function onSubmit(event) {
  event.preventDefault();

  let delayValue = Number(delayInp.value);
  const stepValue = Number(stepInp.value);
  const amountValue = Number(amountInp.value);
  if (delayValue <0 || stepValue < 0 || amountValue <= 0) {
    Notiflix.Report.warning(
      "Incorrect numbers",
      'Please choose a correct numbers',
      'Okay'
    );
  }  else {
    for (let i = 1; i <= amountValue; i += 1) {
      createPromise
        .then(() => {
          Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(() => {
          Notify.failure(`Rejected promise ${position} in ${delay}ms`);
        });

      delayValue += stepValue;
    }
  }
}
