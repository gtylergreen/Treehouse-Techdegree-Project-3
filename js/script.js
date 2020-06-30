//Hid the other selection box that was created in the html.
const otherTextField = document.getElementById('other-title');
otherTextField.style.display = 'none';
//Set the focus on the name element on page load.
document.getElementById('name').focus();
const title = document.getElementById('title');

//Event listener on change for the job title drop down. If other is selected, shows the other text box.
title.addEventListener('change', (e) => {
  const selection = title.value;
  if (selection === 'other') {
    otherTextField.style.display = 'block';
  }
  if (selection !== 'other') {
    otherTextField.style.display = 'none';
  }
});

const shirtColor = document.getElementById('color');
const placeholder = document.createElement('option');
//Set the placeholder for the tshirt design field.
placeholder.setAttribute('value', 'placeholder');
placeholder.textContent = 'Please select a T-shirt theme.';
shirtColor.prepend(placeholder);
shirtColor.selectedIndex = 0;
//Hid the shirt color box and label.
shirtColor.style.display = 'none';
document.getElementById('colors-js-puns').firstElementChild.style.display =
  'none';

const designBox = document.getElementById('design');
designBox.firstElementChild.disabled = 'true';
//Added an event listener to the design drop down on any change.
designBox.addEventListener('change', (e) => {
  //If users clicks on the 'select theme dropdown and selects either of the designs, the label and
  //drop down show for the colors associated to that design. Display properties are set to show or
  //hide options based on the selection made.
  if (e.target.value !== 'Select Theme') {
    document.getElementById('colors-js-puns').firstElementChild.style.display =
      'block';
    shirtColor.style.display = 'block';
    shirtColor.removeAttribute('disabled');
    shirtColor.children[0].disabled = 'true';
    if (e.target.value === 'js puns') {
      shirtColor.children[0].selected = true;
      shirtColor.children[4].style.display = 'none';
      shirtColor.children[5].style.display = 'none';
      shirtColor.children[6].style.display = 'none';
      shirtColor.children[1].style.display = 'block';
      shirtColor.children[2].style.display = 'block';
      shirtColor.children[3].style.display = 'block';
    }
    if (e.target.value === 'heart js') {
      shirtColor.children[0].selected = true;
      shirtColor.children[0].style.display = 'block';
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

//Created an array to better work with activities. Looped through the number of checboxes an grabbed
//the input of each to store in the array.
let activityArray = [];
for (let i = 0; i < checkboxes.length; i++) {
  let activityData = checkboxes[i].childNodes[1];
  console.log(activityData);
  activityArray.push(activityData);
}
//Removed the legend from the array.
activityArray.shift();

//Created a function to determine the cost based on a number passed to it and display it beneath the activities.
let total = document.createElement('h2');
let totalCostText = (number) => {
  total.textContent = `Cost: $${number}`;
  activities.appendChild(total);
};

//Added an event listener onto the activities fieldset and looped through the activities array.
//If the checkbox was checked, it looks for an other events at the same day and time and
//disables them from selection.
activities.addEventListener('change', (e) => {
  console.log(e.target);
  let cost = 0;
  if (e.target.checked) {
    for (let i = 0; i < activityArray.length; i++) {
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
  //Removes disabled attribute from conflicting activities if the first one is unchecked.
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
  //Loops through the array to check which boxes are checked and then grabs the cost data associated.
  for (let i = 0; i < activityArray.length; i++) {
    if (activityArray[i].checked) {
      cost += parseInt(activityArray[i].getAttribute('data-cost'));
    }
  }
  //If a price is already being displayed, this removes it so the correct one can be added.
  if (activities.contains(total)) {
    activities.removeChild(total);
  }
  //Calls the total cost function to display the updated cost.
  totalCostText(cost);
});

document.querySelector('.paypal').firstElementChild.classList.add('paypal2');
document.querySelector('.bitcoin').firstElementChild.classList.add('bitcoin2');
//Sets credit card to the default payment option and hides paypal and bitcoin option. Also
document.querySelector('#credit-card').style.display === 'block';
document.querySelector('.paypal').style.display = 'none';
document.querySelector('.bitcoin').style.display = 'none';
//Hides the payment option so that credit card is displayed by default.
const paymentOptions = document.querySelector('#payment');
paymentOptions.firstElementChild.style.display = 'none';
paymentOptions.removeChild(paymentOptions.firstElementChild);

//Added and event listener to the payment options drowpdown. If paypal or bitcoin are selected, it will
//hide the credit card options and display only the option chosen.
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

//Creates a custom error message for the name input field.
let nameFieldset = document.querySelector('header').nextElementSibling
  .firstElementChild;
let nameErrorMessage = document.createElement('div');
nameErrorMessage.classList.add('namePopup');
let nameErrorMessageText = document.createElement('span');
nameErrorMessageText.textContent = 'Name field cannot be blank.';
nameErrorMessage.appendChild(nameErrorMessageText);
nameFieldset.insertBefore(nameErrorMessage, nameFieldset.children[2]);
let nameRegex = /^[a-zA-Z\s*]+$/;
let nameValue = document.getElementById('name');

//Added an event listener for when the user is about to leave the name field. I went back and forth on
//what type of event listener to use. I decided that I'd rather not show the error until the user was
//done entering text, so went with focus out rather than key down. Displays custom error if regex isn't
//met.
nameValue.addEventListener('focusout', (e) => {
  let input = e.target.value;

  if (!nameRegex.test(input)) {
    nameErrorMessage.style.display = 'inline-block';
  }
  if (nameRegex.test(input)) {
    nameErrorMessage.style.display = 'none';
    nameValue.classList.remove('redBorder');
  }
});

//Created two error messages here for the exceeds requirement.
let emailErrorMessage = document.createElement('div');
emailErrorMessage.classList.add('emailPopup');
let emailErrorMessageText = document.createElement('span');
emailErrorMessageText.textContent = 'Must be a valid email address.';
emailErrorMessage.appendChild(emailErrorMessageText);
nameFieldset.insertBefore(emailErrorMessage, nameFieldset.children[6]);

let emailErrorMessage2 = document.createElement('div');
emailErrorMessage2.classList.add('emailPopup');
let emailErrorMessageText2 = document.createElement('span');
emailErrorMessageText2.textContent =
  'Email address must be formatted like dave@treehouse.com.';
emailErrorMessage2.appendChild(emailErrorMessageText2);
nameFieldset.insertBefore(emailErrorMessage2, nameFieldset.children[6]);

//If the user leaves the field completely without a valid email, they will be shown the second error
//displaying the proper format for an email address.

let emailRegex = /^[\d\w*\.]+[@][a-zA-Z0-9]+\.[a-z]{3}$/;
let emailAddress = document.getElementById('mail');
emailAddress.addEventListener('focusout', (e) => {
  let input = e.target.value;

  if (!emailRegex.test(input)) {
    emailErrorMessage.style.display = 'inline-block';
  }
  if (emailRegex.test(input)) {
    emailErrorMessage.style.display = 'none';
    emailAddress.classList.remove('redBorder');
  }
  if ((emailErrorMessage.style.display = 'inline-block')) {
    emailErrorMessage.style.display = 'none';
    emailErrorMessage2.style.display = 'inline-block';
  }
  if (emailRegex.test(input)) {
    emailErrorMessage2.style.display = 'none';
    emailAddress.classList.remove('redBorder');
  }
});
//If the user types more than 2 characters, they will be shown the first error message telling them to
//enter a valid email address.
emailAddress.addEventListener('keyup', (e) => {
  let input = e.target.value;
  if (input.length > 2) {
    let emailRegex = /^[a-zA-Z0-9]+[@][a-zA-Z0-9]+\.[a-z]{3}$/;
    if (!emailRegex.test(input)) {
      emailErrorMessage.style.display = 'inline-block';
    }
    if (emailRegex.test(input)) {
      emailErrorMessage.style.display = 'none';
      emailAddress.classList.remove('redBorder');
    }
    if (document.activeElement.id === 'mail') {
      emailErrorMessage2.style.display = 'none';
    }
  }
});

//Created a custom error message to display if no activity is selected.
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

//The event to use was a bit tricky here, so I went with mouseleave. If no boxes are checked and the
//mouse leaves the activity fieldset, the error will be displayed.
activitiesDiv.addEventListener('mouseleave', (e) => {
  for (let i = 0; i < activityArray.length; i++) {
    if (activityArray[i].checked) {
      activitiesErrorMessage.style.display = 'none';
      activitiesDiv.removeAttribute('style');
      break;
    } else {
      activitiesErrorMessage.style.display = 'inline-block';
    }
  }
});

//If a click takes place in the activities fieldset, this checks to see if one of the activity checkboxes
//was clicked. If it was, the error message will not be displayed.
activitiesDiv.addEventListener('click', (e) => {
  for (let i = 0; i < activityArray.length; i++) {
    if (activityArray[i].checked) {
      activitiesErrorMessage.style.display = 'none';
      activitiesDiv.classList.remove('redBorder');
      break;
    }
  }
});

//Wanted a function that could format credit card number with hyphens. I'm sure this isn't the most
//efficient way to do it and caused some downstream problems that I had to work through, since it
//changed the character input to no longer match the regex. Had to look this up.
//https://stackoverflow.com/questions/1772941/how-can-i-insert-a-character-after-every-n-characters-in-javascript
let formatCreditCard = (string, indexValue) => {
  let array = [];

  for (let i = 0; i < string.length; i += indexValue) {
    array.push(string.substr(i, indexValue));
  }
  console.log(array);
  return array;
};

//Created a custom error message for a credit card with guidance on the correct format to enter a card
//number.
let creditCardInput = document.querySelector('#cc-num');
let creditCardDiv = document.querySelector('#credit-card').firstElementChild;
let creditCardErrorMessage = document.createElement('div');
creditCardErrorMessage.classList.add('creditCardPopup');
let creditCardErrorMessageText = document.createElement('span');
creditCardErrorMessageText.textContent =
  'Please enter a valid credit card number with no spaces or dashes.';
creditCardErrorMessage.appendChild(creditCardErrorMessageText);
creditCardDiv.insertBefore(creditCardErrorMessage, creditCardDiv.children[0]);

//Since I used a function to add dashes into the credit card field for readability, I couldn't figure out
//a better way to let the user edit the appended string to meet the regex. I'm sure there's a more
//complex regex that I could use, but I couldn't figure one out. So I clear out the field completely if
//they click the edit button.
let editButton = document.createElement('button');
editButton.textContent = 'Edit';
editButton.classList.add('editButton');
editButton.style.display = 'none';
creditCardDiv.insertBefore(editButton, creditCardErrorMessage);

//Decided to use the blur event here because I wanted to make sure that the user was done typing before
//taking the input and formatting with hyphens. Checks the entry again the regex and displays custom
//error if it doesn't match.
creditCardInput.addEventListener('blur', (e) => {
  let input = e.target.value;
  let creditCardRegex = /^\d{13,16}\s*\b/;
  if (!creditCardRegex.test(input)) {
    creditCardErrorMessage.style.display = 'inline-block';
  }
  if (creditCardRegex.test(input)) {
    creditCardInput.classList.remove('redBorder');
    creditCardErrorMessage.style.display = 'none';
    let finalInput = creditCardInput.value;
    finalInput = formatCreditCard(finalInput, 4).join('-');
    creditCardInput.value = finalInput;
    creditCardInput.disabled = 'true';
    editButton.style.display = 'block';
  }
});

//If the user clicks the edit button, the credit card field is cleared completely and they can enter
//a new number. Again, I know this is not the most user-friendly solution, but I liked the hyphens!
editButton.addEventListener('click', (e) => {
  e.preventDefault();
  creditCardInput.removeAttribute('disabled');
  creditCardInput.value = '';
  editButton.style.display = 'none';
});

//Creates a custom error message for the zip code field.
let zipCodeDiv = document.querySelector('#credit-card').children[1];
console.log(zipCodeDiv);
let zipCodeInput = document.querySelector('#zip');
let zipCodeErrorMessage = document.createElement('div');
zipCodeErrorMessage.classList.add('zipCodePopup');
let zipCodeErrorMessageText = document.createElement('span');
zipCodeErrorMessageText.textContent = 'Please enter a valid Zip Code.';
zipCodeErrorMessage.appendChild(zipCodeErrorMessageText);
zipCodeDiv.insertBefore(zipCodeErrorMessage, zipCodeDiv.children[0]);

let zipCodeRegex = /^[0-9]{5}$/;
//Decided to use key up here as an event listener. If the user has typed more than three characters,
//they are show the message telling them to add a valid zip code.
zipCodeInput.addEventListener('keyup', (e) => {
  if (e.target.value.length > 3) {
    let input = e.target.value;

    if (!zipCodeRegex.test(input)) {
      zipCodeErrorMessage.style.display = 'inline-block';
    }
    if (zipCodeRegex.test(input)) {
      zipCodeErrorMessage.style.display = 'none';
      zipCodeInput.classList.remove('redBorder');
    }
  }
});

//Created a custom error message for the CVV field.
let cvvDiv = document.querySelector('#credit-card').children[2];
console.log(zipCodeDiv);
let cvvInput = document.querySelector('#cvv');
let cvvErrorMessage = document.createElement('div');
cvvErrorMessage.classList.add('cvvPopup');
let cvvErrorMessageText = document.createElement('span');
cvvErrorMessageText.textContent = 'Please enter your three digit CVV code.';
cvvErrorMessage.appendChild(cvvErrorMessageText);
cvvDiv.insertBefore(cvvErrorMessage, cvvDiv.children[0]);
let cvvRegex = /^[0-9]{3}$/;

//Used keyup event listener so the error message is displayed immediately upon typing.
cvvInput.addEventListener('keyup', (e) => {
  let input = e.target.value;

  let cvvRegex = /^[0-9]{3}$/;
  if (!cvvRegex.test(input)) {
    cvvErrorMessage.style.display = 'inline-block';
  }
  if (cvvRegex.test(input)) {
    cvvInput.classList.remove('redBorder');
    cvvErrorMessage.style.display = 'none';
  }
});

//Also applied the focusout event listener in case the user tabbed through the field without entering
//anything to display the error.
cvvInput.addEventListener('focusout', (e) => {
  let input = e.target.value;

  if (!cvvRegex.test(input)) {
    cvvErrorMessage.style.display = 'inline-block';
  }
  if (cvvRegex.test(input)) {
    cvvErrorMessage.style.display = 'none';
  }
});

//This was a bit of a nightmare, since all error messages had to be show at once. Initially, I was using
//progressive if statements and the focus feature to highlight the errors one at a time and take the user
//directly there. But since all error messages needed to be shown at once, I refactored this, so the focus
//doesn't always work in the most beneficial way to the user. I kept them in there, because, depending on
//where the error is, it could be a nice feature.
let submitFormButton = document.querySelectorAll('button')[1];
let form = document.querySelector('form');
submitFormButton.addEventListener('click', (e) => {
  e.preventDefault();
  //Checks to see if the name is valid. If not, highlights the box in red, shows the custom error
  //message and bring the focus to the box.
  if (!nameRegex.test(nameValue.value)) {
    nameValue.classList.add('redBorder');
    nameErrorMessage.style.display = 'inline-block';
    document.getElementById('name').focus();
  }

  //Checks to see if the email is valid. If not, highlights the box in red, shows the custom error
  //message and bring the focus to the box.
  if (!emailRegex.test(emailAddress.value)) {
    emailErrorMessage.style.display = 'inline-block';
    emailAddress.classList.add('redBorder');
    emailAddress.focus();
  }

  //Checks to see if at least one activity is checked. If not, highlights the box in red, shows the
  //custom error message and bring the focus to the box.
  if (
    !activityArray[0].checked &&
    !activityArray[1].checked &&
    !activityArray[2].checked &&
    !activityArray[3].checked &&
    !activityArray[4].checked &&
    !activityArray[5].checked &&
    !activityArray[6].checked
  ) {
    activitiesErrorMessage.style.display = 'inline-block';
    activities.style.outline = 'medium solid red';
    console.log(
      activities.firstElementChild.nextElementSibling.nextElementSibling
        .firstElementChild
    );
    activities.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.focus();
  }

  //Checks to see if the payment option is a credit card. If so, validates credit card information.
  if (paymentOptions.value === 'credit card') {
    //Checks to see if the credit card is valid. If not, highlights the box in red, shows the custom error
    //message and bring the focus to the box.
    if (!creditCardInput.disabled) {
      creditCardInput.classList.add('redBorder');
      creditCardErrorMessage.style.display = 'inline-block';
      creditCardInput.focus();
    }
    //Checks to see if the zip code is valid. If not, highlights the box in red, shows the custom error
    //message and bring the focus to the box.
    if (!zipCodeRegex.test(zipCodeInput.value)) {
      zipCodeErrorMessage.style.display = 'inline-block';
      zipCodeInput.classList.add('redBorder');
      zipCodeInput.focus();
    }
    //Checks to see if the cvv is valid. If not, highlights the box in red, shows the custom error
    //message and bring the focus to the box.
    if (!cvvRegex.test(cvvInput.value)) {
      cvvErrorMessage.style.display = 'inline-block';
      cvvInput.classList.add('redBorder');
      cvvInput.focus();
    }
  }
  //Final check before submitting the form. It is the reverse of each condition outlined above as final
  //validation that all required parameters are met.
  if (nameRegex.test(nameValue.value) && emailRegex.test(emailAddress.value)) {
    if (
      activityArray[0].checked ||
      activityArray[1].checked ||
      activityArray[2].checked ||
      activityArray[3].checked ||
      activityArray[4].checked ||
      activityArray[5].checked ||
      activityArray[6].checked
    ) {
      if (paymentOptions.value === 'credit card') {
        if (creditCardInput.disabled) {
          if (zipCodeRegex.test(zipCodeInput.value)) {
            if (cvvRegex.test(cvvInput.value)) {
              form.submit();
            }
          }
        }
      } else if (
        paymentOptions.value === 'paypal' ||
        paymentOptions.value === 'bitcoin'
      ) {
        form.submit();
      }
    }
  }
});
