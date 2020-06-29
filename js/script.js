const otherTextField = document.getElementById('other-title');
otherTextField.style.display = 'none';
document.getElementById('name').focus();

const title = document.getElementById('title');

title.addEventListener('change', (e) => {
  let selection = title.value;
  if (selection === 'other') {
    console.log(selection);
    otherTextField.style.display = 'block';
  }
  if (selection !== 'other') {
    otherTextField.style.display = 'none';
  }
});
//debugger
let shirtColor = document.getElementById('color');
let placeholder = document.createElement('option');
placeholder.setAttribute('value', 'placeholder');
placeholder.textContent = 'Please select a T-shirt theme.';
shirtColor.prepend(placeholder);
shirtColor.selectedIndex = 0;
shirtColor.setAttribute('disabled', 'true');

const designBox = document.getElementById('design');
designBox.addEventListener('change', (e) => {
  shirtColor.value = shirtColor.children[0].value;

  for (let i = 0; i < shirtColor.childElementCount; i++) {
    shirtColor.children[i].setAttribute('display', 'block');
  }

  if (e.target.value !== 'Select Theme') {
    console.log(e.target.value);
    shirtColor.removeAttribute('disabled');
    shirtColor.children[0].disabled = 'true';
    if (e.target.value === 'js puns') {
      console.log(shirtColor[4]);
      shirtColor.children[4].style.display = 'none';
      shirtColor.children[5].style.display = 'none';
      shirtColor.children[6].style.display = 'none';
      shirtColor.children[1].style.display = 'block';
      shirtColor.children[2].style.display = 'block';
      shirtColor.children[3].style.display = 'block';
    }
    if (e.target.value === 'heart js') {
      shirtColor.children[1].style.display = 'none';
      shirtColor.children[2].style.display = 'none';
      shirtColor.children[3].style.display = 'none';
      shirtColor.children[4].style.display = 'block';
      shirtColor.children[5].style.display = 'block';
      shirtColor.children[6].style.display = 'block';
    }
  } else {
    shirtColor.disabled = 'true';
  }
});

const activities = document.querySelector('.activities');
const checkboxes = activities.children;

console.log(checkboxes);
let activityArray = [];
for (let i = 0; i < checkboxes.length; i++) {
  let dataCost = checkboxes[i].childNodes[1];
  console.log(dataCost);
  activityArray.push(dataCost);
}
activityArray.shift();

let total = document.createElement('h2');
let totalCostText = (number) => {
  total.textContent = `Cost: $${number}`;
  activities.appendChild(total);
};

activities.addEventListener('change', (e) => {
  console.log(e.target);
  let cost = 0;
  if (e.target.checked) {
    for (let i = 0; i < activityArray.length; i++) {
      //debugger;
      if (
        e.target.getAttribute('data-day-and-time') ===
        activityArray[i].getAttribute('data-day-and-time')
      ) {
        if (
          e.target.getAttribute('name') !==
          activityArray[i].getAttribute('name')
        ) {
          activityArray[i].disabled = true;
          //activityArray[i].removeAttribute('disabled');
        }
      }
    }
  }
  if (!e.target.checked) {
    for (let i = 0; i < activityArray.length; i++) {
      if (
        e.target.getAttribute('data-day-and-time') ===
        activityArray[i].getAttribute('data-day-and-time')
      ) {
        if (
          e.target.getAttribute('name') !==
          activityArray[i].getAttribute('name')
        ) {
          activityArray[i].removeAttribute('disabled');
        }
      }
    }
  }
  for (let i = 0; i < activityArray.length; i++) {
    if (activityArray[i].checked) {
      cost += parseInt(activityArray[i].getAttribute('data-cost'));
    }
  }
  if (activities.contains(total)) {
    activities.removeChild(total);
  }

  totalCostText(cost);
});

document.querySelector('.paypal').firstElementChild.classList.add('paypal2');
document.querySelector('.bitcoin').firstElementChild.classList.add('bitcoin2');
// document.querySelector('.paypal').style.display = 'block';
document.querySelector('.bitcoin').style.display = 'none';
document.getElementById('payment').children[0].disabled = 'true';

const paymentOptions = document.querySelector('#payment');
paymentOptions.addEventListener('change', (e) => {
  console.log(e.target.value);
  if (e.target.value === 'paypal') {
    document.querySelector('.paypal').style.display = 'block';
    document.querySelector('.bitcoin').style.display = 'none';
    document.querySelector('#credit-card').style.display = 'none';
  } else if (e.target.value === 'bitcoin') {
    document.querySelector('.bitcoin').style.display = 'block';
    document.querySelector('.paypal').style.display = 'none';
    document.querySelector('#credit-card').style.display = 'none';
  } else if (e.target.value === 'credit card') {
    document.querySelector('#credit-card').style.display = 'block';
    document.querySelector('.bitcoin').style.display = 'none';
    document.querySelector('.paypal').style.display = 'none';
  }
});
let nameFieldset = document.querySelector('header').nextElementSibling
  .firstElementChild;
let nameErrorMessage = document.createElement('div');
nameErrorMessage.classList.add('namePopup');
let nameErrorMessageText = document.createElement('span');
nameErrorMessageText.textContent = 'Name field cannot be blank.';
nameErrorMessage.appendChild(nameErrorMessageText);
nameFieldset.insertBefore(nameErrorMessage, nameFieldset.children[2]);

let nameValue = document.getElementById('name');
nameValue.addEventListener('focusout', (e) => {
  let input = e.target.value;
  let nameRegex = /^[a-z]+$/;
  if (!nameRegex.test(input)) {
    nameErrorMessage.style.display = 'inline-block';
  }
  if (nameRegex.test(input)) {
    nameErrorMessage.style.display = 'none';
  }
});

nameValue.addEventListener('keyup', (e) => {
  let input = e.target.value;
  let nameRegex = /^[a-zA-Z]+$/;
  if (!nameRegex.test(input)) {
    nameErrorMessage.style.display = 'inline-block';
  }
  if (nameRegex.test(input)) {
    nameErrorMessage.style.display = 'none';
  }
});

let emailErrorMessage = document.createElement('div');
emailErrorMessage.classList.add('emailPopup');
let emailErrorMessageText = document.createElement('span');
emailErrorMessageText.textContent = 'Must be a valid email address.';
emailErrorMessage.appendChild(emailErrorMessageText);
nameFieldset.insertBefore(emailErrorMessage, nameFieldset.children[6]);

let emailAddress = document.getElementById('mail');
emailAddress.addEventListener('focusout', (e) => {
  let input = e.target.value;
  let emailRegex = /^[\d\w*\.]+[@][a-zA-Z0-9]+\.[a-z]{3}$/;

  if (!emailRegex.test(input)) {
    emailErrorMessage.style.display = 'inline-block';
  }
  if (emailRegex.test(input)) {
    emailErrorMessage.style.display = 'none';
  }
});

emailAddress.addEventListener('keyup', (e) => {
  let input = e.target.value;
  if (input.length > 2) {
    let emailRegex = /^[a-zA-Z0-9]+[@][a-zA-Z0-9]+\.[a-z]{3}$/;
    if (!emailRegex.test(input)) {
      emailErrorMessage.style.display = 'inline-block';
    }
    if (emailRegex.test(input)) {
      emailErrorMessage.style.display = 'none';
    }
  }
});

let activitiesDiv = document.querySelector('.activities');
let activitiesParameter = document.createElement('p');
activitiesParameter.innerHTML = `(Please select at least one activity.)`;
activitiesDiv.insertBefore(activitiesParameter, activitiesDiv.children[1]);
let activitiesErrorMessage = document.createElement('div');
activitiesErrorMessage.classList.add('activitiesPopup');
let activitiesErrorMessageText = document.createElement('span');
activitiesErrorMessageText.textContent = 'Please select at least one activity.';
activitiesErrorMessage.appendChild(activitiesErrorMessageText);
activitiesDiv.insertBefore(activitiesErrorMessage, activitiesDiv.children[2]);

activitiesDiv.addEventListener('mouseleave', (e) => {
  //debugger;
  for (let i = 0; i < activityArray.length; i++) {
    if (activityArray[i].checked) {
      activitiesErrorMessage.style.display = 'none';
      break;
    } else {
      activitiesErrorMessage.style.display = 'inline-block';
    }
  }
});

activitiesDiv.addEventListener('click', (e) => {
  debugger;
  for (let i = 0; i < activityArray.length; i++) {
    if (activityArray[i].checked) {
      activitiesErrorMessage.style.display = 'none';
      break;
    }
  }
});

let creditCardInput = document.querySelector('#cc-num');
let creditCardDiv = document.querySelector('#credit-card').firstElementChild;
creditCardDiv.classList.add('paymentFieldSet');
console.log(creditCardDiv);
let creditCardErrorMessage = document.createElement('div');
creditCardErrorMessage.classList.add('creditCardPopup');
let creditCardErrorMessageText = document.createElement('span');
creditCardErrorMessageText.textContent =
  'Please enter a valid credit card number with no spaces or dashes.';
creditCardErrorMessage.appendChild(creditCardErrorMessageText);
creditCardDiv.insertBefore(creditCardErrorMessage, creditCardDiv.children[1]);

creditCardInput.addEventListener('keyup', (e) => {
  let input = e.target.value;

  //parseInt(newInputNoSpace);
  let creditCardRegex = /^\d{13,16}\s*\b/;
  if (!creditCardRegex.test(input)) {
    creditCardErrorMessage.style.display = 'inline-block';
  }
  if (creditCardRegex.test(input)) {
    creditCardErrorMessage.style.display = 'none';
  }
});
let zipCodeDiv = document.querySelector('#credit-card').children[1];
console.log(zipCodeDiv);
let zipCodeInput = document.querySelector('#zip');
let zipCodeErrorMessage = document.createElement('div');
zipCodeErrorMessage.classList.add('zipCodePopup');
let zipCodeErrorMessageText = document.createElement('span');
zipCodeErrorMessageText.textContent = 'Please enter a valid Zip Code.';
zipCodeErrorMessage.appendChild(zipCodeErrorMessageText);
zipCodeDiv.insertBefore(zipCodeErrorMessage, zipCodeDiv.children[0]);

zipCodeInput.addEventListener('keyup', (e) => {
  let input = e.target.value;

  let zipCodeRegex = /^[0-9]{5}$/;
  if (!zipCodeRegex.test(input)) {
    zipCodeErrorMessage.style.display = 'inline-block';
  }
  if (zipCodeRegex.test(input)) {
    zipCodeErrorMessage.style.display = 'none';
  }
});

let cvvDiv = document.querySelector('#credit-card').children[2];
console.log(zipCodeDiv);
let cvvInput = document.querySelector('#cvv');
let cvvErrorMessage = document.createElement('div');
cvvErrorMessage.classList.add('cvvPopup');
let cvvErrorMessageText = document.createElement('span');
cvvErrorMessageText.textContent = 'Please enter your three digit CVV code.';
cvvErrorMessage.appendChild(cvvErrorMessageText);
cvvDiv.insertBefore(cvvErrorMessage, cvvDiv.children[0]);

cvvInput.addEventListener('keyup', (e) => {
  let input = e.target.value;

  let cvvRegex = /^[0-9]{3}$/;
  if (!cvvRegex.test(input)) {
    cvvErrorMessage.style.display = 'inline-block';
  }
  if (cvvRegex.test(input)) {
    cvvErrorMessage.style.display = 'none';
  }
});

cvvInput.addEventListener('focusout', (e) => {
  let input = e.target.value;

  let cvvRegex = /^[0-9]{3}$/;
  if (!cvvRegex.test(input)) {
    cvvErrorMessage.style.display = 'inline-block';
  }
  if (cvvRegex.test(input)) {
    cvvErrorMessage.style.display = 'none';
  }
});
