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

document.querySelector('.paypal').style.display = 'none';
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
