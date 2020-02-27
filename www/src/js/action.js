'use strict';

window.addEventListener('load', function(event) {
  let checkbox = document.querySelector('input[type="checkbox"]'),
      label    = document.querySelector('label');

  label.addEventListener('click', function(event) {
    if(checkbox.checked) {
      label.classList.add('label--checked');
    } else {
      label.classList.remove('label--checked')
    }
    console.log(checkbox.checked)
  }) 
})