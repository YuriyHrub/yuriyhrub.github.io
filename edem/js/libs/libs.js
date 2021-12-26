import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

/* ===========================
  #SMOTH SCROLL
============================= */

// import SmoothScroll from '../../../node_modules/smoothscroll-for-websites/SmoothScroll.js';

// SmoothScroll({
  // stepSize: 50
// })

/* ===========================
  #MASK FOR INPUT
============================= */


import IMask from 'imask';

let inputTelElements = document.querySelectorAll('#js-tel-mask');
let maskOptions = {
  mask: '+{38}(000)000-00-00'
};

inputTelElements.forEach(inputElement => {
  IMask(inputElement, maskOptions);
});