//IMPORTS
import Notiflix from 'notiflix';

//VARIABLES
const form = document.querySelector('form');
const delay = document.querySelector('input[name="delay"]');
const step = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');

form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  let delayNum = Number(delay.value);
  const stepNum = Number(step.value);
  const amountNum = Number(amount.value);
  if (delayNum < 0 || stepNum < 0 || amountNum < 0) {
    Notiflix.Notify.failure(`❌ All numbers should be higher then 0`);
    return;
  }
  let i = 1;
  const timeOutId = setTimeout(() => {
    const intervalId = setInterval(() => {
      if (i === amountNum) {
        clearInterval(intervalId);
      }
      createPromise(i, delayNum)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        });
      delayNum += stepNum;
      i += 1;
    }, stepNum);
  }, delayNum);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({ position, delay });
    }
    reject({ position, delay });
  });
}
