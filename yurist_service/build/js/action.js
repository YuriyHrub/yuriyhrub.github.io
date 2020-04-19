'use strict'; // forEach polifil

if ('NodeList' in window && !NodeList.prototype.forEach) {
  console.info('polyfill for IE11');

  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;

    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
} // IE polifil --- .closest()


if (!Element.prototype.closest) {
  Element.prototype.closest = function (css) {
    var node = this;

    while (node) {
      if (node.matches(css)) return node;else node = node.parentElement;
    }

    return null;
  };
} // IE polifil --- .matches()
// проверяем поддержку


if (!Element.prototype.matches) {
  // определяем свойство
  Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector;
}

window.addEventListener('load', function (e) {
  // Burger menu
  var burger = document.querySelector('.burger-menu');
  var menu = document.querySelector('.header__menu .menu__list');
  burger.addEventListener('click', function (e) {
    this.classList.toggle('js-active');
    menu.classList.toggle('header__menu-hidden');
  }); // Popup

  var form = document.forms.feedback;

  if (form) {
    var feedbackBtn = document.querySelectorAll('.feedback__btn'),
        overlay = document.querySelector('.overlay'),
        mainModal = document.querySelector('.main__popup'),
        confirmModal = document.querySelector('.confirm__popup'),
        succesModal = document.querySelector('.success__popup');
    feedbackBtn.forEach(function (btn) {
      btn.onclick = function (e) {
        overlay.hidden = false;
      };
    });
    var closeBtn = document.querySelectorAll('.close__btn');
    closeBtn.forEach(function (btn) {
      btn.onclick = function (e) {
        if (document.querySelector('.overlay')) {
          overlay.hidden = true;
          mainModal.hidden = false;
          confirmModal.hidden = true;
          succesModal.hidden = true;
        }
      };
    });

    form.onsubmit = function (e) {
      e.preventDefault();
      mainModal.hidden = true;
      confirmModal.hidden = false;
    };

    confirmModal.querySelectorAll('.confirm__btn').forEach(function (btn) {
      btn.onclick = function (e) {
        confirmModal.hidden = true;
        succesModal.hidden = false;
      };
    });

    succesModal.querySelector('.success__btn').onclick = function (e) {
      form.submit();
      succesModal.hidden = true;
    };
  } // Acordeon


  var acordeonToggles = document.querySelectorAll('.acordeon__toggle'),
      acordeonContent;
  acordeonToggles.forEach(function (toggle) {
    toggle.addEventListener('click', function (e) {
      this.classList.toggle('acordeon__toggle-active');

      if (this.closest('.acordeon__item')) {
        this.closest('.acordeon__item').classList.toggle('acordeon__item-active');
      }
    });
  });
});