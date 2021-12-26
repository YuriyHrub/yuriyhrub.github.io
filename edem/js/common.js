(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var html = document.documentElement;
window.addEventListener("load", function () {
  document.body.classList.add('page-load');
  var screenW = html.clientWidth,
      pageHeader = document.querySelector('.header'),
      dropMenu = document.querySelector('.drop-content'),
      topOffset = 0,
      pageOverlay = initOverlay();
  /* ===========================
    #CLOSE PRESENT
  ============================= */

  var present = document.querySelector('.present');

  if (present) {
    present.onclick = function (e) {
      if (e.target.closest('.present__close-btn')) {
        this.classList.remove('is-visible');
        document.querySelector('.header__bottom-row').classList.add('hide-garantee');
        topOffset -= present.offsetHeight;
        pageHeader.style.transform = "translateY(-".concat(present.offsetHeight, "px)");
        document.body.style.paddingTop = "".concat(topOffset, "px");

        if (innerWidth < 1100) {
          dropMenu.style.paddingTop = "".concat(topOffset, "px");
        }

        setTimeout(function () {
          present.remove();
          pageHeader.style.transitionDuration = '0s';
          pageHeader.style.transform = '';
        }, 1000);
      }

      ;
    };
  }

  ;
  /* ===========================
    #ADD TOP OFFSET
  ============================= */

  if (present) {
    present.classList.add('is-visible');
  }

  ;
  topOffset += pageHeader.offsetHeight;
  document.body.style.paddingTop = "".concat(topOffset, "px");

  if (window.innerWidth < 1100) {
    dropMenu.style.paddingTop = "".concat(topOffset, "px");
  }

  ;
  window.addEventListener('resize', function (e) {
    if (innerWidth >= 1100) dropMenu.style.paddingTop = '';
    var currentOffset = pageHeader.offsetHeight;
    if (topOffset === currentOffset) return;
    topOffset = currentOffset;
    document.body.style.paddingTop = "".concat(topOffset, "px");

    if (innerWidth < 1100) {
      dropMenu.style.paddingTop = "".concat(topOffset, "px");
    }

    ;
  });
  /* ===========================
    #FIXED SIDEBAR
  ============================= */

  var bar = document.querySelector('.js-sidebar');
  var parentCoords, topBound, botBound;
  sidebar();
  window.addEventListener('resize', function (e) {
    sidebar();
  });

  function sidebar() {
    if (bar && html.clientWidth >= 900) {
      var fix = function fix(elem) {
        elem.classList.add('is-fixed');
        elem.style.width = "".concat(elem.offsetWidth, "px");
        elem.style.position = 'fixed';
        elem.style.left = "".concat(parentCoords.right - elem.offsetWidth, "px");
        elem.style.top = "".concat(topBound, "px");
      };

      var unfix = function unfix(elem, coords) {
        elem.classList.remove('is-fixed');
        elem.style.width = '';
        elem.style.position = 'relative';
        elem.style.left = '';
        elem.style.top = "".concat(bar.parentNode.offsetHeight - bar.offsetHeight, "px");
      };

      parentCoords = getCoords(bar.parentNode), topBound = Math.abs(parentCoords.top), botBound = Math.abs(parentCoords.bottom);
      if (window.pageYOffset > 0) fix(bar);
      window.addEventListener('scroll', function (e) {
        var barCoords = bar.getBoundingClientRect();

        if (window.pageYOffset >= 0 && window.pageYOffset + html.clientHeight <= botBound && !bar.classList.contains('is-fixed')) {
          fix(bar);
        } else if (window.pageYOffset + html.clientHeight >= botBound) {
          unfix(bar, barCoords);
        }
      });
    }
  }
  /* ===========================
    #SWIPER
  ============================= */


  if (document.querySelector('.swiper-container')) {
    var gallerySlider = new Swiper('.gallery-slider .swiper-container', {
      // Optional parameters
      loop: true,
      // Navigation arrows
      navigation: {
        nextEl: '.gallery-slider .swiper-button-next',
        prevEl: '.gallery-slider .swiper-button-prev'
      }
    });
    var teamSlider = new Swiper('.our-team-slider .swiper-container', {
      slidesPerView: 1,
      loop: true,
      breakpoints: {
        // when window width is >= 900px
        475: {
          slidesPerView: 2
        },
        600: {
          slidesPerView: 3
        },
        900: {
          slidesPerView: 5,
          spaceBetween: 45
        }
      },
      pagination: {
        el: '.our-team-slider .swiper-pagination',
        type: 'custom',
        renderCustom: function renderCustom(swiper, current, total) {
          if (current < 10) {
            current = "0".concat(current);
          }

          if (total < 10) {
            total = "0".concat(total);
          }

          return "<span class=\"swiper-pagination-current\">".concat(current, "</span> &mdash; <span class=\"swiper-pagination-total\">").concat(total, "</span>");
        }
      },
      navigation: {
        nextEl: '.our-team-slider .swiper-button-next',
        prevEl: '.our-team-slider .swiper-button-prev'
      }
    });
    var team = document.querySelector('.our-team'),
        projectManager = document.querySelector('.project-manager');

    if (team || projectManager) {
      document.body.addEventListener('click', function (e) {
        if (e.target.closest('.manager')) {
          var loadStories = function loadStories(id) {
            var storiesData = {
              1: ['project7_img_1220.jpg', 'project1_img_1220.jpg', 'project3_img_1220.jpg'],
              2: ['poster.jpg', 'project10_img_1220.jpg'],
              3: ['project10_img_1220.jpg', 'project13_img_1220.jpg', 'project1_img_1220.jpg', 'project8_img_1220.jpg', 'poster.jpg', 'blog-preview1.jpg'],
              4: ['poster.jpg', 'work-proces_1220.jpg', 'blog-preview1.jpg'],
              5: ['company-life_920.jpg', 'com_920.jpg', 'work-proces_1220.jpg']
            };
            var storiesSliderWrapper = document.querySelector('.stories-slider .swiper-wrapper');
            storiesData[id].forEach(function (fileName) {
              storiesSliderWrapper.insertAdjacentHTML('beforeEnd', "<div class=\"swiper-slide\">\n                <div class=\"stories-slider__img\">\n                  <img src=\"img/content/".concat(fileName, "\" alt=\"\">\n                </div>\n\n                </div>"));
            });
          };

          e.preventDefault(); //Відміняе перехід по ссилці 

          var manager = e.target.closest('.manager'),
              managerId = manager.dataset.managerId;
          pageOverlay.add(document.body);
          pageOverlay.elemNode.style.zIndex = 100;
          var sliderHTML = "\n          <div class=\"stories\">\n            <div class=\"stories__inner\">\n            <button class=\"close-btn close-btn--white stories__close-btn\"></button>\n            <div class=\"stories__author\">\n              <div class=\"stories__author-img\">\n                <img src=\"".concat(manager.querySelector('.manager__pic img').getAttribute('src'), "\" alt=\"\">\n                </div>\n              <p class=\"stories__author-name\">").concat(manager.querySelector('.manager__name').textContent, "</p>\n            </div>\n            <div class=\"stories__slider stories-slider slider\">\n              \n\n              <div class=\"swiper-container\">\n                <div class=\"swiper-wrapper\">\n                </div>\n                \n              </div>\n              <div class=\"swiper-pagination slider__pagination\"></div>\n\n              <button class=\"swiper-button-prev slider__btn slider__btn--prev\"><svg class=\"icon stories-icon stories-icon--left\"><use xlink:href=\"img/design/symbol_sprite.svg#_stories-arrow-left\"/></svg></button>\n              <button class=\"swiper-button-next slider__btn slider__btn--next\"><svg class=\"icon stories-icon stories-icon--right\"><use xlink:href=\"img/design/symbol_sprite.svg#_stories-arrow\"/></svg></button>\n            </div>\n            </div>\n          </div>");
          document.body.insertAdjacentHTML('beforeEnd', sliderHTML);
          var stories = document.querySelector('.stories'),
              storiesClose = document.querySelector('.stories__close-btn');

          storiesClose.onclick = function () {
            pageOverlay.remove();
            pageOverlay.elemNode.style.zIndex = '';
            stories.remove();
            stories = null;
          };

          loadStories(managerId);
          var storiesSlider = new Swiper('.stories-slider .swiper-container', {
            spaceBetween: 30,
            navigation: {
              prevEl: '.stories-slider .swiper-button-prev',
              nextEl: '.stories-slider .swiper-button-next'
            },
            pagination: {
              el: '.stories-slider .swiper-pagination',
              type: 'bullets',
              clickable: true
            }
          });
        }

        ;
      });
    }

    var blogPreviewsSlider = new Swiper('.main-page__blog .swiper-container', {
      slidesPerView: 'auto',
      freeMode: true
    });
    var cardSlider = new Swiper('.card-slider .swiper-container', {
      loop: true,
      pagination: {
        el: '.card-slider .swiper-pagination',
        type: 'custom',
        renderCustom: function renderCustom(swiper, current, total) {
          if (current < 10) {
            current = "0".concat(current);
          }

          console.log(swiper);

          if (total < 10) {
            total = "0".concat(total);
          }

          console.log(current);
          return "<span class=\"swiper-pagination-current\">".concat(current, "</span> &mdash; <span class=\"swiper-pagination-total\">").concat(total, "</span>");
        }
      },
      navigation: {
        nextEl: '.card-slider .swiper-button-next',
        prevEl: '.card-slider .swiper-button-prev'
      }
    });
    var filterSlider = new Swiper('.filter__slider .swiper-container', {
      slidesPerView: 'auto',
      spaceBetween: 20
    });
    var reportSlider = new Swiper('.report-slider .swiper-container', {
      slidesPerView: 'auto',
      spaceBetween: 20,
      breakpoints: {
        900: {
          spaceBetween: 30
        }
      }
    });
    var workTimeSlider = new Swiper('.work-time__slider .swiper-container', {
      slidesPerView: 1,
      navigation: {
        nextEl: '.work-time__slider .swiper-button-next',
        prevEl: '.work-time__slider .swiper-button-prev'
      },
      pagination: {
        el: '.work-time__slider .swiper-pagination',
        type: 'custom',
        renderCustom: function renderCustom(swiper, current, total) {
          if (current < 10) {
            current = "0".concat(current);
          }

          if (total < 10) {
            total = "0".concat(total);
          }

          return "<span class=\"swiper-pagination-current\">".concat(current, "</span> &mdash; <span class=\"swiper-pagination-total\">").concat(total, "</span>");
        }
      },
      breakpoints: {
        600: {
          slidesPerView: 3,
          spaceBetween: 30,
          navigation: false,
          pagination: false
        }
      }
    });
    var companyLifeSlider = new Swiper('.company-life__slider .swiper-container', {
      slidesPerView: 1,
      spaceBetween: 20,
      slidesPerColumn: 0,
      breakpoints: {
        600: {
          slidesPerView: 2,
          slidesPerColumn: 2
        },
        900: {
          slidesPerView: 3,
          slidesPerColumn: 2,
          spaceBetween: 30
        },
        1200: {
          slidesPerView: 4,
          slidesPerColumn: 2,
          spaceBetween: 30
        }
      }
    });
  }
  /* ===========================
  #SERVICE FUNCTION
  ============================= */


  function ifVisible(pos) {
    var bottomLine = html.clientHeight + html.scrollTop;

    if (pos < bottomLine) {
      return true;
    }
  }

  function getCoords(elem) {
    var c = elem.getBoundingClientRect();
    return {
      top: c.top + html.scrollTop,
      left: c.left,
      right: c.right,
      bottom: c.bottom + html.scrollTop
    };
  }

  function initOverlay() {
    var overlay = document.createElement('div');
    return {
      elemNode: overlay,
      add: function add(parent) {
        // Додаю overlay
        parent.after(overlay);
        overlay.classList.add('overlay');
        overlay.classList.add('is-visible'); // Виключаю скролл

        scrollOff();
      },
      remove: function remove() {
        //Удаляю overlay
        overlay.classList.remove('is-visible'); // Включаю скролл

        scrollOn();
        setTimeout(function () {
          // e.preventDefault();
          overlay.remove();
        }, 500);
      }
    };
  }

  ;
  /* ===========================
    #ANIMATE PROGRESS
  ============================= */

  var progressArr = Array.from(document.querySelectorAll('.progress')).map(function (item) {
    return {
      elem: item,
      pos: getCoords(item),
      meter: item.querySelector('.progress__meter'),
      out: item.querySelector('.progress__out'),
      percent: +item.dataset.doneBy
    };
  });

  var animateProgress = function animateProgress(progress) {
    if (progress.elem.classList.contains('is-visible')) return;
    var count = 0;
    progress.elem.classList.add('is-visible');
    var timerId = setTimeout(function counter() {
      count++;
      progress.meter.style.width = "".concat(count, "%");
      progress.out.innerText = count;

      if (count >= progress.percent) {
        clearTimeout(timerId);
        return;
      }

      setTimeout(counter, 10);
    }, 10);
  };

  progressArr.forEach(function (item) {
    if (ifVisible(item.pos.top)) {
      animateProgress(item);
    }
  });
  window.addEventListener('scroll', function (e) {
    progressArr.forEach(function (item) {
      if (ifVisible(item.pos.top)) {
        animateProgress(item);
      }
    });
  });
  /* ===========================
    #STAGE ANIMATION
  ============================= */

  {
    var scheduleItems = Array.from(document.querySelectorAll('.stage')),
        svg = document.querySelector('.schedule__svg'),
        xmlns = 'http://www.w3.org/2000/svg';

    if (html.clientWidth >= 1260) {
      var createAnimate = function createAnimate(attr, values, dur, begin) {
        var animate = document.createElementNS(xmlns, 'animate');
        animate.setAttribute('attributeName', attr);
        animate.setAttribute('values', values);
        animate.setAttribute('dur', dur);
        animate.setAttribute('begin', begin);
        animate.setAttribute('fill', 'freeze');
        return animate;
      };

      var createPoint = function createPoint(yPos, fill) {
        var point = document.createElementNS(xmlns, 'circle'),
            animate = createAnimate('r', '0;20;10', '.5s', 'indefinite');
        point.setAttributeNS(null, 'cx', '30px');
        point.setAttributeNS(null, 'cy', "".concat(yPos, "px"));
        point.setAttributeNS(null, 'r', 4);
        point.setAttributeNS(null, 'fill', fill);
        point.setAttribute('id', 'circle');
        point.append(animate);
        return {
          c: point,
          a: animate
        };
      };

      var createPath = function createPath(yPos, lineLength) {
        var path = document.createElementNS(xmlns, 'path'),
            animate = createAnimate('d', "M 30 ".concat(yPos, ", v 0; M30 ").concat(yPos, ", v").concat(lineLength), '.5s', 'indefinite');
        path.setAttributeNS(null, 'd', "M 30 ".concat(yPos, ", v0"));
        path.setAttributeNS(null, 'stroke', 'grey');
        path.setAttributeNS(null, 'stroke-width', '.2px');
        path.append(animate);
        return {
          p: path,
          a: animate
        };
      };

      var animateSvg = function animateSvg(elems) {
        elems.forEach(function (item, index, itemsArr) {
          if (item.classList.contains('is-visible')) return;

          if (ifVisible(getCoords(item).top + html.clientHeight / 4)) {
            var m = parseInt(getComputedStyle(item.parentElement).marginBottom),
                pos = getCoords(item).top - getCoords(svg).top + item.offsetHeight / 2,
                point,
                path,
                pathLength;

            if (index === 0) {
              pathLength = getCoords(itemsArr[index + 1]).top + itemsArr[index + 1].offsetHeight / 2 - getCoords(svg).top - item.offsetHeight / 2;
            } else if (index !== itemsArr.length - 1) {
              pathLength = getCoords(itemsArr[index + 1]).top + itemsArr[index + 1].offsetHeight / 2 - getCoords(item).top - item.offsetHeight / 2;
            }

            var getBg = function getBg(item) {
              if (item.classList.contains('stage--complate')) {
                return '#39BFC5';
              } else if (item.classList.contains('stage--process')) {
                return '#FF5722';
              } else {
                return '#FFD0C1';
              }
            };

            point = createPoint(pos, getBg(item));
            path = createPath(pos, pathLength);
            item.classList.add('is-visible');

            if (index === itemsArr.length - 1) {
              svg.append(point.c);
              point.a.beginElement();
            } else {
              svg.append(point.c);
              point.a.beginElement();
              svg.prepend(path.p);
              path.a.beginElement();
            }
          }
        });
      };

      animateSvg(scheduleItems);
      window.addEventListener('scroll', function (e) {
        animateSvg(scheduleItems);
      });
    } else {
      var addVisible = function addVisible(elems) {
        elems.forEach(function (item) {
          if (item.classList.contains('is-visible')) return;

          if (ifVisible(getCoords(item).top + html.clientHeight / 4)) {
            item.classList.add('is-visible');
          }
        });
      };

      addVisible(scheduleItems);
      window.addEventListener('scroll', function (e) {
        addVisible(scheduleItems);
      });
    }
  }
  /* ===========================
    #FILTER
  ============================= */

  if (document.querySelector('#filter')) {
    var showFilterResult = function showFilterResult(cat) {
      previews = [];

      if (cat === 'all') {
        fltElems.forEach(function (elem) {
          elem.classList.add('is-visible');
        });
        previews = fltElems;
        previews[0].classList.add('is-active');
        return;
      }

      fltElems.forEach(function (elem) {
        if (elem.dataset.category === cat) {
          elem.classList.add('is-visible');
          previews.push(elem);
        } else {
          elem.classList.remove('is-visible');
        }
      });
      previews[0].classList.add('is-active');
    };

    var getArticle = function getArticle(cat) {
      var arr = [],
          articleList = Array.from(document.querySelectorAll('.article__content'));
      articleList.forEach(function (article) {
        if (article.classList.contains('is-visible')) {
          article.classList.remove('is-visible');
        }
      });

      if (cat === 'all') {
        arr = articleList;
      } else {
        articleList.forEach(function (article, index) {
          if (article.dataset.category === cat) {
            arr.push(article);
          }
        });
      }

      arr[0].classList.add('is-visible');
      return arr;
    };

    var toggleArticle = function toggleArticle(articles) {};

    var flt = document.querySelector('#filter'),
        fltElems = Array.from(document.querySelectorAll('.js-filtered-elem'));
    var cat = 'all',
        previews = [],
        articles;
    showFilterResult(cat);
    articles = getArticle(cat);
    flt.addEventListener('click', function (e) {
      if (e.target.tagName === 'BUTTON') {
        if (e.target.classList.contains('is-active')) {
          return;
        } else {
          var currentBtn = flt.querySelector('.filter__btn.is-active') || flt.querySelector('.projects-filter__btn.is-active');
          currentBtn.classList.toggle('is-active');
          e.target.classList.toggle('is-active');
        }

        fltElems.forEach(function (item) {
          item.classList.remove('is-active');
        });
        cat = e.target.dataset.category;
        showFilterResult(cat);
        articles = getArticle(cat);
      }
    });
    document.querySelector('.blog__preview').addEventListener('click', function (e) {
      var articlePreview = e.target.closest('.blog__preview-item');

      if (articlePreview.classList.contains('is-active')) {
        return;
      } else {
        previews.forEach(function (preview) {
          if (preview.classList.contains('is-active')) {
            preview.classList.remove('is-active');
            articles.forEach(function (article) {
              if (preview.dataset.id === article.dataset.id) {
                article.classList.remove('is-visible');
              }

              if (articlePreview.dataset.id === article.dataset.id) {
                article.classList.add('is-visible');
              }
            });
          }
        });
        articlePreview.classList.add('is-active');
      }
    });
  }
  /* ===========================
    #SCROLL  ON/OFF
  ============================= */


  var getFixed = function getFixed() {
    var all = document.body.querySelectorAll('*');
    return Array.from(all).filter(function (elem) {
      var bool = getComputedStyle(elem).position === 'fixed';
      return bool;
    });
  };

  var fixedElements = getFixed();

  var scrollOn = function scrollOn() {
    setTimeout(function () {
      document.body.classList.remove('scroll-off');
      document.body.style.paddingRight = '';
      fixedElements.forEach(function (elem) {
        elem.style.paddingRight = "";
      });
    }, 300);
  };

  var scrollOff = function scrollOff() {
    document.body.classList.add('scroll-off');
    document.body.style.paddingRight = "".concat(scrollW, "px");
    fixedElements.forEach(function (elem) {
      elem.style.paddingRight = "".concat(scrollW, "px");
    });
  };
  /* ===========================
    #ACCORDION
  ============================= */


  var accordionsContainer = document.querySelector('.accordions'),
      accordionsArr = document.querySelectorAll('.accordion');
  var currentItem = document.querySelector('.accordion.is-open');

  if (currentItem) {
    currentItem.querySelector('.accordion__drop').style.height = "".concat(parseInt(getComputedStyle(currentItem.querySelector('.accordion__txt')).height) + parseInt(getComputedStyle(currentItem.querySelector('.accordion__txt')).marginBottom), "px");
  }

  var accordionClose = function accordionClose(item) {
    item.classList.remove('is-open');
    item.querySelector('.accordion__drop').style.height = 0; //this code work for #FIXED SIDEBAR

    setTimeout(function () {
      parentCoords = getCoords(bar.parentNode), topBound = Math.abs(parentCoords.top), botBound = Math.abs(parentCoords.bottom);
    }, 500);
  };

  var accordionOpen = function accordionOpen(item) {
    var s = getComputedStyle(item.querySelector('.accordion__txt')),
        h = parseInt(s.height),
        mb = parseInt(s.marginBottom),
        itemDrop = item.querySelector('.accordion__drop');
    item.classList.add('is-open');
    itemDrop.style.height = "".concat(h + mb, "px"); //this code work for #FIXED SIDEBAR

    setTimeout(function () {
      parentCoords = getCoords(bar.parentNode), topBound = Math.abs(parentCoords.top), botBound = Math.abs(parentCoords.bottom);
    }, 500);
  };

  if (accordionsContainer) {
    accordionsContainer.addEventListener('click', function (e) {
      if (e.target.closest('.accordion__panel')) {
        var accordion = e.target.parentElement;

        if (accordion.classList.contains('accordion')) {
          if (accordion === currentItem) {
            accordionClose(accordion);
            currentItem = null;
            return;
          }

          if (accordion !== currentItem && currentItem !== null) {
            accordionsArr.forEach(function (item) {
              if (item.classList.contains('is-open')) {
                accordionClose(item);
              }
            });
          }

          accordionOpen(accordion);
          currentItem = accordion;
        }
      }
    });
  }
  /* ===========================
    #BURGER / DROP MENU
  ============================= */


  var burger = document.querySelector('.burger'),
      scrollW = window.innerWidth - html.clientWidth; //Обробляе навігацію через клавішу ТАВ

  document.addEventListener('keyup', function (e) {
    if (!document.activeElement.closest('.drop-content')) {
      // Фокус покинув останній елемент і преходить знов на burger
      if (e.code === 'Tab' && dropMenu.classList.contains('is-visible')) {
        burger.focus();
      }
    }
  });
  window.addEventListener('resize', function (e) {
    if (innerWidth >= 1100 && burger.classList.contains('is-active')) {
      burger.classList.toggle('is-active');
      dropMenu.classList.toggle('is-visible');
      pageOverlay.remove();
    }
  });
  burger.addEventListener('click', function (e) {
    scrollW = window.innerWidth - html.clientWidth;
    burger.classList.toggle('is-active');
    dropMenu.classList.toggle('is-visible');

    if (dropMenu.classList.contains('is-visible')) {
      pageOverlay.add(dropMenu);
    } else {
      pageOverlay.remove();
    }
  });
  /* ===========================
    #MODAL
  ============================= */

  function modalInit(elem) {
    if (!elem) return;
    var m = elem,
        mBody = m.querySelector('.modal__body');
    var btnOpen = document.getElementById('modal-open');

    function open() {
      m.classList.add('is-open');
    }

    function close() {
      m.classList.remove('is-open');
    }

    return {
      open: open,
      close: close
    };
  }

  var modal = modalInit(document.getElementById('modal'));
  document.body.addEventListener('click', function (e) {
    if (e.target.closest('#modal-open')) {
      e.preventDefault();
      modal.open();
      scrollOff();
      return;
    }

    if (e.target.closest('#modal-close')) {
      modal.close();
      scrollOn();
      return;
    }
  });
  /* ===========================
    #MEDIA JUMPERS
  ============================= */
  // ***
  //* Пригаючому елементу присвоїти атрибут data-jump та data-jump-to
  //* В data-jump-to записати строку: 
  //* "newParentElementSelector.js-jump afterELementPosition mediaScreenWidth"
  //* newParentElementSelector.js-jump  - батьківський селектор + .js-jump
  //* afterELementPosition - після якого елемента вставляти 
  //* mediaScreenWidth - при якому розширенні переставляти
  //* 
  // ***

  var arr = document.querySelectorAll('[data-jump]');
  var jumpers = Array.from(arr).map(function (elem) {
    var param = elem.dataset.jumpTo.split(' '); // If in data-jump-to element position <= 0 showed alert(); 

    if (+param[1] < 0 || param[1] === '') {
      alert("Error: bad value in data-jump-to: \"... ".concat(+param[1], " ...\""));
      return;
    }

    return {
      el: elem,
      realParent: elem.parentElement,
      realPrevElem: elem.previousElementSibling,
      newParent: document.querySelector(param[0]),
      newPos: +param[1],
      screen: +param[2]
    };
  });

  function jump() {
    screenW = window.innerWidth;
    jumpers.forEach(function (jumper) {
      if (screenW >= jumper.screen && jumper.el.dataset.jump) {
        // Обробляє прижок в початковий елемент 
        if (!jumper.realPrevElem) {
          jumper.realParent.prepend(jumper.el);
        } else {
          jumper.realPrevElem.after(jumper.el);
        }

        jumper.el.dataset.jump = '';
      }

      if (screenW < jumper.screen && !jumper.el.dataset.jump) {
        // Обробляє прижок в новий елемент
        if (!jumper.newParent.childElementCount) {
          jumper.newParent.append(jumper.el);
        } else if (jumper.newParent.childElementCount < jumper.newPos) {
          jumper.newParent.append(jumper.el);
        } else {
          if (jumper.newPos === 0) {
            jumper.newParent.prepend(jumper.el);
          } else {
            // [jumper.newPos -1] зміщую на одиницю. JS рахує починаючи з 0.
            jumper.newParent.children[jumper.newPos - 1].after(jumper.el);
          }
        }

        jumper.el.dataset.jump = 'moved';
      }
    });
  }

  jump();
  window.addEventListener('resize', function (e) {
    // Якщо змінюється висота екрана тоді перериваєм виконання функції
    if (window.innerWidth === screenW) return;
    jump();
  });
  /* ===========================
    #SVG DRAWIND LINE
  ============================= */

  {
    var lineInit = function lineInit(elem) {
      if (!elem) {
        // alert('Sory Mickle, from svg drawing line');
        return;
      }

      var list = document.querySelector('.steps__list'),
          itemsArr = document.querySelectorAll('.steps__item'),
          drawArea = document.querySelector('.steps__svg-wrap'),
          pathElem = document.querySelector('.svg__line'),
          circleElem = document.querySelector('.svg__circle'),
          itemsInRow,
          vIndent,
          hIndent = 10,
          lineStartPos = "M 5 0";

      function draw() {
        elem.setAttribute('viewBox', "0 0 ".concat(elem.parentNode.offsetWidth, " ").concat(elem.parentNode.offsetHeight));
        pathElem.removeAttribute('stroke-dasharray');
        pathElem.removeAttribute('stroke-dashoffset');
        itemsInRow = Math.round(list.offsetWidth / itemsArr[0].offsetWidth), vIndent = parseInt(getComputedStyle(itemsArr[0]).marginBottom);
        circleElem.setAttribute('cx', '5');
        circleElem.setAttribute('cy', '3');
        var str = '';
        str += "".concat(lineStartPos, " v").concat(itemsArr[0].offsetHeight - vIndent / 2);
        var tmpCount = itemsInRow;
        var rowLength = 0;
        itemsArr.forEach(function (item, i, arr) {
          if (i < arr.length - 1) {
            if (i + 1 === tmpCount) {
              // обробляє останній елемент ряду
              rowLength += item.offsetWidth - hIndent;
              str += " h".concat(rowLength, " v ").concat(vIndent);
              str += " h".concat(-rowLength, " v").concat(arr[i + 1].offsetHeight);
              rowLength = 0;
              tmpCount += itemsInRow;
            } else {
              // оброб. елемент
              rowLength += item.offsetWidth;
            }
          } else {
            // одробляе останній елемент в списку
            rowLength += item.offsetWidth - hIndent * 2;
            str += " h".concat(rowLength);
          }
        });
        pathElem.setAttribute('d', str);
      }

      ;

      var animate = function animate() {
        if (list.classList.contains('is-visible')) return;
        var pos = elem.getBoundingClientRect().top;
        pathElem.setAttribute('stroke-dasharray', pathElem.getTotalLength());
        pathElem.setAttribute('stroke-dashoffset', pathElem.getTotalLength());

        if (pos < html.clientHeight / 2) {
          var lineAnimate = document.getElementById('line-animate'),
              circleAnimate = document.getElementById('circle-animate');
          circleAnimate.beginElement();
          list.classList.add('is-visible');
        }

        var timeInterval = parseInt(document.getElementById('line-animate').getAttribute('dur')) / itemsArr.length;
        document.querySelectorAll('.steps__item').forEach(function (item, index) {
          var delay = index * timeInterval;
          item.style.transitionDelay = "".concat(delay + .5, "s");
        });
      };

      draw();
      animate();
      window.addEventListener('resize', function (e) {
        draw();
      });
      window.addEventListener('scroll', function (e) {
        animate();
      });
    };

    lineInit(document.querySelector('.svg'));
  }
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvc2NyaXB0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FBQ0EsSUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGVBQXRCO0FBRUEsTUFBTSxDQUFDLGdCQUFQLENBQXdCLE1BQXhCLEVBQWdDLFlBQU07QUFDcEMsRUFBQSxRQUFRLENBQUMsSUFBVCxDQUFjLFNBQWQsQ0FBd0IsR0FBeEIsQ0FBNEIsV0FBNUI7QUFFQSxNQUFJLE9BQU8sR0FBUyxJQUFJLENBQUMsV0FBekI7QUFBQSxNQUNJLFVBQVUsR0FBTSxRQUFRLENBQUMsYUFBVCxDQUF1QixTQUF2QixDQURwQjtBQUFBLE1BRUksUUFBUSxHQUFRLFFBQVEsQ0FBQyxhQUFULENBQXVCLGVBQXZCLENBRnBCO0FBQUEsTUFHSSxTQUFTLEdBQU8sQ0FIcEI7QUFBQSxNQUlJLFdBQVcsR0FBSyxXQUFXLEVBSi9CO0FBTUE7QUFDRjtBQUNBOztBQUNFLE1BQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLFVBQXZCLENBQWQ7O0FBRUEsTUFBRyxPQUFILEVBQVk7QUFDVixJQUFBLE9BQU8sQ0FBQyxPQUFSLEdBQWtCLFVBQVMsQ0FBVCxFQUFZO0FBQzVCLFVBQUcsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxPQUFULENBQWlCLHFCQUFqQixDQUFILEVBQTRDO0FBQzFDLGFBQUssU0FBTCxDQUFlLE1BQWYsQ0FBc0IsWUFBdEI7QUFDQSxRQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLHFCQUF2QixFQUE4QyxTQUE5QyxDQUF3RCxHQUF4RCxDQUE0RCxlQUE1RDtBQUVBLFFBQUEsU0FBUyxJQUFJLE9BQU8sQ0FBQyxZQUFyQjtBQUVBLFFBQUEsVUFBVSxDQUFDLEtBQVgsQ0FBaUIsU0FBakIseUJBQTRDLE9BQU8sQ0FBQyxZQUFwRDtBQUVBLFFBQUEsUUFBUSxDQUFDLElBQVQsQ0FBYyxLQUFkLENBQW9C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YUFBYSxHQUFHLFFBQVEsQ0FBQyxjQUFULENBQXdCLGdCQUF4QixDQURsQjtBQUVBLFVBQUEsYUFBYSxDQUFDLFlBQWQ7QUFDQSxVQUFBLElBQUksQ0FBQyxTQUFMLENBQWUsR0FBZixDQUFtQixZQUFuQjtBQUNEOztBQUVELFlBQUksWUFBWSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsY0FBVCxDQUF3QixjQUF4QixFQUF3QyxZQUF4QyxDQUFxRCxLQUFyRCxDQUFELENBQVIsR0FBd0UsUUFBUSxDQUFDLE1BQXBHO0FBQ0EsUUFBQSxRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsY0FBMUIsRUFBMEMsT0FBMUMsQ0FBa0QsVUFBUyxJQUFULEVBQWUsS0FBZixFQUFzQjtBQUN0RSxjQUFJLEtBQUssR0FBRyxLQUFLLEdBQUcsWUFBcEI7QUFDQSxVQUFBLElBQUksQ0FBQyxLQUFMLENBQVcsZUFBWCxHQUE2QixHQUFHLE1BQUgsQ0FBVSxLQUFLLEdBQUcsRUFBbEIsRUFBc0IsR0FBdEIsQ0FBN0I7QUFDRCxTQUhEO0FBSUQsT0FwQkQ7O0FBdUJBLE1BQUEsSUFBSTtBQUNKLE1BQUEsT0FBTztBQUVQLE1BQUEsTUFBTSxDQUFDLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDLFVBQVMsQ0FBVCxFQUFZO0FBQzVDLFFBQUEsSUFBSTtBQUNMLE9BRkQ7QUFJQSxNQUFBLE1BQU0sQ0FBQyxnQkFBUCxDQUF3QixRQUF4QixFQUFrQyxVQUFTLENBQVQsRUFBWTtBQUM1QyxRQUFBLE9BQU87QUFDUixPQUZEO0FBR0QsS0FuR0Q7O0FBcUdBLElBQUEsUUFBUSxDQUFDLFFBQVEsQ0FBQyxhQUFULENBQXVCLE1BQXZCLENBQUQsQ0FBUjtBQUNEO0FBRUYsQ0FybENEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiJ3VzZSBzdHJpY3QnO1xyXG5jb25zdCBodG1sID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcclxuICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3BhZ2UtbG9hZCcpO1xyXG5cclxuICBsZXQgc2NyZWVuVyAgICAgICA9IGh0bWwuY2xpZW50V2lkdGgsXHJcbiAgICAgIHBhZ2VIZWFkZXIgICAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyJyksXHJcbiAgICAgIGRyb3BNZW51ICAgICAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHJvcC1jb250ZW50JyksXHJcbiAgICAgIHRvcE9mZnNldCAgICAgPSAwLFxyXG4gICAgICBwYWdlT3ZlcmxheSAgID0gaW5pdE92ZXJsYXkoKTtcclxuXHJcbiAgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAjQ0xPU0UgUFJFU0VOVFxyXG4gID09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcbiAgbGV0IHByZXNlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlc2VudCcpO1xyXG5cclxuICBpZihwcmVzZW50KSB7XHJcbiAgICBwcmVzZW50Lm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XHJcbiAgICAgIGlmKGUudGFyZ2V0LmNsb3Nlc3QoJy5wcmVzZW50X19jbG9zZS1idG4nKSkge1xyXG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX2JvdHRvbS1yb3cnKS5jbGFzc0xpc3QuYWRkKCdoaWRlLWdhcmFudGVlJyk7XHJcblxyXG4gICAgICAgIHRvcE9mZnNldCAtPSBwcmVzZW50Lm9mZnNldEhlaWdodDtcclxuXHJcbiAgICAgICAgcGFnZUhlYWRlci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWSgtJHtwcmVzZW50Lm9mZnNldEhlaWdodH1weClgO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLnBhZGRpbmdUb3AgPSBgJHt0b3BPZmZzZXR9cHhgO1xyXG5cclxuICAgICAgICBpZihpbm5lcldpZHRoIDwgMTEwMCkge1xyXG4gICAgICAgICAgZHJvcE1lbnUuc3R5bGUucGFkZGluZ1RvcCA9IGAke3RvcE9mZnNldH1weGA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpPT4ge1xyXG4gICAgICAgICAgcHJlc2VudC5yZW1vdmUoKTtcclxuICAgICAgICAgIHBhZ2VIZWFkZXIuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gJzBzJztcclxuICAgICAgICAgIHBhZ2VIZWFkZXIuc3R5bGUudHJhbnNmb3JtID0gJyc7XHJcbiAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgIH07XHJcbiAgICB9O1xyXG4gIH07XHJcblxyXG5cclxuICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgICNBREQgVE9QIE9GRlNFVFxyXG4gID09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG4gICAgICBpZihwcmVzZW50KSB7XHJcbiAgICAgICAgcHJlc2VudC5jbGFzc0xpc3QuYWRkKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICB0b3BPZmZzZXQgKz0gcGFnZUhlYWRlci5vZmZzZXRIZWlnaHQ7XHJcblxyXG4gICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLnBhZGRpbmdUb3AgPSBgJHt0b3BPZmZzZXR9cHhgO1xyXG5cclxuICAgICAgaWYod2luZG93LmlubmVyV2lkdGggPCAxMTAwKSB7XHJcbiAgICAgICAgZHJvcE1lbnUuc3R5bGUucGFkZGluZ1RvcCA9IGAke3RvcE9mZnNldH1weGA7XHJcbiAgICAgIH07XHJcblxyXG5cclxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICBpZihpbm5lcldpZHRoID49IDExMDApIGRyb3BNZW51LnN0eWxlLnBhZGRpbmdUb3AgPSAnJztcclxuXHJcbiAgICAgICAgICBsZXQgY3VycmVudE9mZnNldCA9IHBhZ2VIZWFkZXIub2Zmc2V0SGVpZ2h0O1xyXG5cclxuICAgICAgICAgIGlmKHRvcE9mZnNldCA9PT0gY3VycmVudE9mZnNldCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgIHRvcE9mZnNldCA9IGN1cnJlbnRPZmZzZXQ7XHJcblxyXG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5wYWRkaW5nVG9wID0gYCR7dG9wT2Zmc2V0fXB4YDtcclxuXHJcbiAgICAgICAgICBpZihpbm5lcldpZHRoIDwgMTEwMCkge1xyXG4gICAgICAgICAgICBkcm9wTWVudS5zdHlsZS5wYWRkaW5nVG9wID0gYCR7dG9wT2Zmc2V0fXB4YDtcclxuICAgICAgICAgIH07XHJcbiAgICAgIH0pO1xyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgI0ZJWEVEIFNJREVCQVJcclxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcbmNvbnN0IGJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1zaWRlYmFyJyk7XHJcbmxldCBwYXJlbnRDb29yZHMsIHRvcEJvdW5kLCBib3RCb3VuZDtcclxuc2lkZWJhcigpO1xyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uKGUpIHtcclxuICBzaWRlYmFyKCk7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gc2lkZWJhcigpIHtcclxuXHJcbiAgaWYoYmFyICYmIGh0bWwuY2xpZW50V2lkdGggPj0gOTAwKSB7XHJcbiAgICBwYXJlbnRDb29yZHMgPSBnZXRDb29yZHMoYmFyLnBhcmVudE5vZGUpLFxyXG4gICAgdG9wQm91bmQgICAgID0gTWF0aC5hYnMocGFyZW50Q29vcmRzLnRvcCksXHJcbiAgICBib3RCb3VuZCAgICAgPSBNYXRoLmFicyhwYXJlbnRDb29yZHMuYm90dG9tKTtcclxuXHJcbiAgICBpZih3aW5kb3cucGFnZVlPZmZzZXQgPiAwKSBmaXgoYmFyKTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZnVuY3Rpb24oZSkge1xyXG4gICAgXHJcbiAgICAgIGxldCBiYXJDb29yZHMgPSBiYXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgIGlmKHdpbmRvdy5wYWdlWU9mZnNldCA+PSAwICYmIHdpbmRvdy5wYWdlWU9mZnNldCtodG1sLmNsaWVudEhlaWdodCA8PSBib3RCb3VuZCAmJiAhYmFyLmNsYXNzTGlzdC5jb250YWlucygnaXMtZml4ZWQnKSkge1xyXG4gICAgICAgIGZpeChiYXIpO1xyXG5cclxuICAgICAgfSBlbHNlIGlmKHdpbmRvdy5wYWdlWU9mZnNldCArIGh0bWwuY2xpZW50SGVpZ2h0ID49IGJvdEJvdW5kKSB7XHJcbiAgICAgICAgdW5maXgoYmFyLCBiYXJDb29yZHMpO1xyXG4gICAgICB9IFxyXG5cclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBmaXgoZWxlbSkge1xyXG4gICAgICBlbGVtLmNsYXNzTGlzdC5hZGQoJ2lzLWZpeGVkJyk7XHJcbiAgICAgIGVsZW0uc3R5bGUud2lkdGggICAgPSBgJHtlbGVtLm9mZnNldFdpZHRofXB4YDtcclxuICAgICAgZWxlbS5zdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCc7XHJcbiAgICAgIGVsZW0uc3R5bGUubGVmdCAgICAgPSBgJHtwYXJlbnRDb29yZHMucmlnaHQgLSBlbGVtLm9mZnNldFdpZHRofXB4YDtcclxuICAgICAgZWxlbS5zdHlsZS50b3AgICAgICA9IGAke3RvcEJvdW5kfXB4YDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB1bmZpeChlbGVtLCBjb29yZHMpIHtcclxuICAgICAgZWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1maXhlZCcpO1xyXG4gICAgICBlbGVtLnN0eWxlLndpZHRoICAgID0gJyc7XHJcbiAgICAgIGVsZW0uc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xyXG4gICAgICBlbGVtLnN0eWxlLmxlZnQgICAgID0gJyc7XHJcbiAgICAgIGVsZW0uc3R5bGUudG9wICAgICAgPSBgJHtiYXIucGFyZW50Tm9kZS5vZmZzZXRIZWlnaHQgLSBiYXIub2Zmc2V0SGVpZ2h0fXB4YDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbiAgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAjU1dJUEVSXHJcbiAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN3aXBlci1jb250YWluZXInKSkge1xyXG5cclxuICAgIGNvbnN0IGdhbGxlcnlTbGlkZXIgPSBuZXcgU3dpcGVyKCcuZ2FsbGVyeS1zbGlkZXIgLnN3aXBlci1jb250YWluZXInLCB7XHJcbiAgICAgIC8vIE9wdGlvbmFsIHBhcmFtZXRlcnNcclxuICAgICAgbG9vcDogdHJ1ZSxcclxuXHJcbiAgICAgIC8vIE5hdmlnYXRpb24gYXJyb3dzXHJcbiAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICBuZXh0RWw6ICcuZ2FsbGVyeS1zbGlkZXIgLnN3aXBlci1idXR0b24tbmV4dCcsXHJcbiAgICAgICAgcHJldkVsOiAnLmdhbGxlcnktc2xpZGVyIC5zd2lwZXItYnV0dG9uLXByZXYnLFxyXG4gICAgICB9LFxyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHRlYW1TbGlkZXIgPSBuZXcgU3dpcGVyKCcub3VyLXRlYW0tc2xpZGVyIC5zd2lwZXItY29udGFpbmVyJywge1xyXG4gICAgICBzbGlkZXNQZXJWaWV3OiAxLFxyXG4gICAgICBsb29wOiB0cnVlLFxyXG4gICAgICBicmVha3BvaW50czoge1xyXG4gICAgICAgIC8vIHdoZW4gd2luZG93IHdpZHRoIGlzID49IDkwMHB4XHJcblxyXG4gICAgICAgIDQ3NToge1xyXG4gICAgICAgICAgc2xpZGVzUGVyVmlldzogMixcclxuICAgICAgICB9LFxyXG4gICAgICAgIDYwMDoge1xyXG4gICAgICAgICAgc2xpZGVzUGVyVmlldzogMyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIDkwMDoge1xyXG4gICAgICAgICAgc2xpZGVzUGVyVmlldzogNSxcclxuICAgICAgICAgIHNwYWNlQmV0d2VlbjogNDVcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG5cclxuICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgIGVsOiAnLm91ci10ZWFtLXNsaWRlciAuc3dpcGVyLXBhZ2luYXRpb24nLFxyXG4gICAgICAgIHR5cGU6ICdjdXN0b20nLFxyXG4gICAgICAgIHJlbmRlckN1c3RvbTogZnVuY3Rpb24oc3dpcGVyLCBjdXJyZW50LCB0b3RhbCkge1xyXG4gICAgICAgICAgaWYgKGN1cnJlbnQgPCAxMCkge1xyXG4gICAgICAgICAgICBjdXJyZW50ID0gYDAke2N1cnJlbnR9YDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAodG90YWwgPCAxMCkge1xyXG4gICAgICAgICAgICB0b3RhbCA9IGAwJHt0b3RhbH1gO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHJldHVybiBgPHNwYW4gY2xhc3M9XCJzd2lwZXItcGFnaW5hdGlvbi1jdXJyZW50XCI+JHtjdXJyZW50fTwvc3Bhbj4gJm1kYXNoOyA8c3BhbiBjbGFzcz1cInN3aXBlci1wYWdpbmF0aW9uLXRvdGFsXCI+JHt0b3RhbH08L3NwYW4+YFxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuXHJcbiAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICBuZXh0RWw6ICcub3VyLXRlYW0tc2xpZGVyIC5zd2lwZXItYnV0dG9uLW5leHQnLFxyXG4gICAgICAgIHByZXZFbDogJy5vdXItdGVhbS1zbGlkZXIgLnN3aXBlci1idXR0b24tcHJldicsXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHRlYW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3VyLXRlYW0nKSxcclxuICAgICAgICAgIHByb2plY3RNYW5hZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtbWFuYWdlcicpO1xyXG5cclxuICAgIGlmKHRlYW0gfHwgcHJvamVjdE1hbmFnZXIpIHtcclxuICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGU9PiB7XHJcbiAgICAgICAgaWYoZS50YXJnZXQuY2xvc2VzdCgnLm1hbmFnZXInKSkge1xyXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpOy8v0JLRltC00LzRltC90Y/QtSDQv9C10YDQtdGF0ZbQtCDQv9C+INGB0YHQuNC70YbRliBcclxuXHJcbiAgICAgICAgICBjb25zdCBtYW5hZ2VyICAgPSBlLnRhcmdldC5jbG9zZXN0KCcubWFuYWdlcicpLFxyXG4gICAgICAgICAgICAgICAgbWFuYWdlcklkID0gbWFuYWdlci5kYXRhc2V0Lm1hbmFnZXJJZDtcclxuXHJcbiAgICAgICAgICBwYWdlT3ZlcmxheS5hZGQoZG9jdW1lbnQuYm9keSk7XHJcbiAgICAgICAgICBwYWdlT3ZlcmxheS5lbGVtTm9kZS5zdHlsZS56SW5kZXggPSAxMDA7XHJcblxyXG4gICAgICAgICAgbGV0IHNsaWRlckhUTUwgPSBgXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic3Rvcmllc1wiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3Rvcmllc19faW5uZXJcIj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImNsb3NlLWJ0biBjbG9zZS1idG4tLXdoaXRlIHN0b3JpZXNfX2Nsb3NlLWJ0blwiPjwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3Rvcmllc19fYXV0aG9yXCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0b3JpZXNfX2F1dGhvci1pbWdcIj5cclxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiJHttYW5hZ2VyLnF1ZXJ5U2VsZWN0b3IoJy5tYW5hZ2VyX19waWMgaW1nJykuZ2V0QXR0cmlidXRlKCdzcmMnKX1cIiBhbHQ9XCJcIj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDxwIGNsYXNzPVwic3Rvcmllc19fYXV0aG9yLW5hbWVcIj4ke21hbmFnZXIucXVlcnlTZWxlY3RvcignLm1hbmFnZXJfX25hbWUnKS50ZXh0Q29udGVudH08L3A+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3Rvcmllc19fc2xpZGVyIHN0b3JpZXMtc2xpZGVyIHNsaWRlclwiPlxyXG4gICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3dpcGVyLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN3aXBlci13cmFwcGVyXCI+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzd2lwZXItcGFnaW5hdGlvbiBzbGlkZXJfX3BhZ2luYXRpb25cIj48L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInN3aXBlci1idXR0b24tcHJldiBzbGlkZXJfX2J0biBzbGlkZXJfX2J0bi0tcHJldlwiPjxzdmcgY2xhc3M9XCJpY29uIHN0b3JpZXMtaWNvbiBzdG9yaWVzLWljb24tLWxlZnRcIj48dXNlIHhsaW5rOmhyZWY9XCJpbWcvZGVzaWduL3N5bWJvbF9zcHJpdGUuc3ZnI19zdG9yaWVzLWFycm93LWxlZnRcIi8+PC9zdmc+PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInN3aXBlci1idXR0b24tbmV4dCBzbGlkZXJfX2J0biBzbGlkZXJfX2J0bi0tbmV4dFwiPjxzdmcgY2xhc3M9XCJpY29uIHN0b3JpZXMtaWNvbiBzdG9yaWVzLWljb24tLXJpZ2h0XCI+PHVzZSB4bGluazpocmVmPVwiaW1nL2Rlc2lnbi9zeW1ib2xfc3ByaXRlLnN2ZyNfc3Rvcmllcy1hcnJvd1wiLz48L3N2Zz48L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+YFxyXG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZUVuZCcsIHNsaWRlckhUTUwpO1xyXG5cclxuXHJcbiAgICAgICAgICBsZXQgc3RvcmllcyAgICAgID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0b3JpZXMnKSxcclxuICAgICAgICAgICAgICBzdG9yaWVzQ2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3Rvcmllc19fY2xvc2UtYnRuJyk7XHJcbiAgICAgICAgICBcclxuXHJcblxyXG4gICAgICAgICAgc3Rvcmllc0Nsb3NlLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHBhZ2VPdmVybGF5LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICBwYWdlT3ZlcmxheS5lbGVtTm9kZS5zdHlsZS56SW5kZXggPSAnJztcclxuXHJcbiAgICAgICAgICAgIHN0b3JpZXMucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIHN0b3JpZXMgPSBudWxsO1xyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIGxvYWRTdG9yaWVzKG1hbmFnZXJJZCk7XHJcblxyXG4gICAgICAgICAgY29uc3Qgc3Rvcmllc1NsaWRlciA9IG5ldyBTd2lwZXIoJy5zdG9yaWVzLXNsaWRlciAuc3dpcGVyLWNvbnRhaW5lcicsIHtcclxuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAzMCxcclxuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICAgICAgICAgIHByZXZFbDogJy5zdG9yaWVzLXNsaWRlciAuc3dpcGVyLWJ1dHRvbi1wcmV2JyxcclxuICAgICAgICAgICAgICBuZXh0RWw6ICcuc3Rvcmllcy1zbGlkZXIgLnN3aXBlci1idXR0b24tbmV4dCcsXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgICAgZWw6ICcuc3Rvcmllcy1zbGlkZXIgLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuICAgICAgICAgICAgICB0eXBlOiAnYnVsbGV0cycsXHJcbiAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIFxyXG5cclxuICAgICAgICAgIGZ1bmN0aW9uIGxvYWRTdG9yaWVzKGlkKSB7XHJcbiAgICAgICAgICAgIGxldCBzdG9yaWVzRGF0YSA9IHtcclxuICAgICAgICAgICAgICAxOiBbJ3Byb2plY3Q3X2ltZ18xMjIwLmpwZycsICdwcm9qZWN0MV9pbWdfMTIyMC5qcGcnLCAncHJvamVjdDNfaW1nXzEyMjAuanBnJ10sXHJcbiAgICAgICAgICAgICAgMjogWydwb3N0ZXIuanBnJywgJ3Byb2plY3QxMF9pbWdfMTIyMC5qcGcnXSxcclxuICAgICAgICAgICAgICAzOiBbJ3Byb2plY3QxMF9pbWdfMTIyMC5qcGcnLCAncHJvamVjdDEzX2ltZ18xMjIwLmpwZycsICdwcm9qZWN0MV9pbWdfMTIyMC5qcGcnLCAncHJvamVjdDhfaW1nXzEyMjAuanBnJywncG9zdGVyLmpwZycsICdibG9nLXByZXZpZXcxLmpwZyddLFxyXG4gICAgICAgICAgICAgIDQ6IFsncG9zdGVyLmpwZycsICd3b3JrLXByb2Nlc18xMjIwLmpwZycsICdibG9nLXByZXZpZXcxLmpwZyddLFxyXG4gICAgICAgICAgICAgIDU6IFsnY29tcGFueS1saWZlXzkyMC5qcGcnLCAnY29tXzkyMC5qcGcnLCAnd29yay1wcm9jZXNfMTIyMC5qcGcnXSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgbGV0IHN0b3JpZXNTbGlkZXJXcmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0b3JpZXMtc2xpZGVyIC5zd2lwZXItd3JhcHBlcicpO1xyXG5cclxuICAgICAgICAgICAgc3Rvcmllc0RhdGFbaWRdLmZvckVhY2goZmlsZU5hbWUgPT4ge1xyXG4gICAgICAgICAgICAgIHN0b3JpZXNTbGlkZXJXcmFwcGVyLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlRW5kJywgYDxkaXYgY2xhc3M9XCJzd2lwZXItc2xpZGVcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdG9yaWVzLXNsaWRlcl9faW1nXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiaW1nL2NvbnRlbnQvJHtmaWxlTmFtZX1cIiBhbHQ9XCJcIj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIDwvZGl2PmApO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYmxvZ1ByZXZpZXdzU2xpZGVyID0gbmV3IFN3aXBlcignLm1haW4tcGFnZV9fYmxvZyAuc3dpcGVyLWNvbnRhaW5lcicsIHtcclxuICAgICAgc2xpZGVzUGVyVmlldzogJ2F1dG8nLFxyXG4gICAgICBmcmVlTW9kZTogdHJ1ZSxcclxuICAgIH0pXHJcbiAgICBjb25zdCBjYXJkU2xpZGVyID0gbmV3IFN3aXBlcignLmNhcmQtc2xpZGVyIC5zd2lwZXItY29udGFpbmVyJywge1xyXG4gICAgICBsb29wOiB0cnVlLFxyXG5cclxuICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgIGVsOiAnLmNhcmQtc2xpZGVyIC5zd2lwZXItcGFnaW5hdGlvbicsXHJcbiAgICAgICAgdHlwZTogJ2N1c3RvbScsXHJcbiAgICAgICAgcmVuZGVyQ3VzdG9tOiBmdW5jdGlvbihzd2lwZXIsIGN1cnJlbnQsIHRvdGFsKSB7XHJcbiAgICAgICAgICBpZiAoY3VycmVudCA8IDEwKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnQgPSBgMCR7Y3VycmVudH1gO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY29uc29sZS5sb2coc3dpcGVyKVxyXG4gICAgICAgICAgaWYgKHRvdGFsIDwgMTApIHtcclxuICAgICAgICAgICAgdG90YWwgPSBgMCR7dG90YWx9YDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnQpXHJcbiAgICAgICAgICByZXR1cm4gYDxzcGFuIGNsYXNzPVwic3dpcGVyLXBhZ2luYXRpb24tY3VycmVudFwiPiR7Y3VycmVudH08L3NwYW4+ICZtZGFzaDsgPHNwYW4gY2xhc3M9XCJzd2lwZXItcGFnaW5hdGlvbi10b3RhbFwiPiR7dG90YWx9PC9zcGFuPmBcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcblxyXG4gICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgbmV4dEVsOiAnLmNhcmQtc2xpZGVyIC5zd2lwZXItYnV0dG9uLW5leHQnLFxyXG4gICAgICAgIHByZXZFbDogJy5jYXJkLXNsaWRlciAuc3dpcGVyLWJ1dHRvbi1wcmV2JyxcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgZmlsdGVyU2xpZGVyID0gbmV3IFN3aXBlcignLmZpbHRlcl9fc2xpZGVyIC5zd2lwZXItY29udGFpbmVyJywge1xyXG4gICAgICBzbGlkZXNQZXJWaWV3OiAnYXV0bycsXHJcbiAgICAgIHNwYWNlQmV0d2VlbjogMjAsXHJcblxyXG4gICAgfSlcclxuXHJcbiAgICBjb25zdCByZXBvcnRTbGlkZXIgPSBuZXcgU3dpcGVyKCcucmVwb3J0LXNsaWRlciAuc3dpcGVyLWNvbnRhaW5lcicsIHtcclxuICAgICAgc2xpZGVzUGVyVmlldzogJ2F1dG8nLFxyXG4gICAgICBzcGFjZUJldHdlZW46IDIwLFxyXG4gICAgICBcclxuICAgICAgYnJlYWtwb2ludHM6IHtcclxuICAgICAgICA5MDA6IHtcclxuICAgICAgICAgIHNwYWNlQmV0d2VlbjogMzAsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuXHJcbiAgICB9KVxyXG5cclxuICAgIGNvbnN0IHdvcmtUaW1lU2xpZGVyID0gbmV3IFN3aXBlcignLndvcmstdGltZV9fc2xpZGVyIC5zd2lwZXItY29udGFpbmVyJywge1xyXG4gICAgICBzbGlkZXNQZXJWaWV3OiAxLFxyXG5cclxuICAgICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICAgIG5leHRFbDogJy53b3JrLXRpbWVfX3NsaWRlciAuc3dpcGVyLWJ1dHRvbi1uZXh0JyxcclxuICAgICAgICBwcmV2RWw6ICcud29yay10aW1lX19zbGlkZXIgLnN3aXBlci1idXR0b24tcHJldicsXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgZWw6ICcud29yay10aW1lX19zbGlkZXIgLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuICAgICAgICB0eXBlOiAnY3VzdG9tJyxcclxuICAgICAgICByZW5kZXJDdXN0b206IGZ1bmN0aW9uKHN3aXBlciwgY3VycmVudCwgdG90YWwpIHtcclxuICAgICAgICAgIGlmIChjdXJyZW50IDwgMTApIHtcclxuICAgICAgICAgICAgY3VycmVudCA9IGAwJHtjdXJyZW50fWA7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHRvdGFsIDwgMTApIHtcclxuICAgICAgICAgICAgdG90YWwgPSBgMCR7dG90YWx9YDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICByZXR1cm4gYDxzcGFuIGNsYXNzPVwic3dpcGVyLXBhZ2luYXRpb24tY3VycmVudFwiPiR7Y3VycmVudH08L3NwYW4+ICZtZGFzaDsgPHNwYW4gY2xhc3M9XCJzd2lwZXItcGFnaW5hdGlvbi10b3RhbFwiPiR7dG90YWx9PC9zcGFuPmBcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcblxyXG5cclxuICAgICAgYnJlYWtwb2ludHM6IHtcclxuICAgICAgICA2MDA6IHtcclxuICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDMsXHJcbiAgICAgICAgICBzcGFjZUJldHdlZW46IDMwLFxyXG5cclxuICAgICAgICAgIG5hdmlnYXRpb246IGZhbHNlLFxyXG4gICAgICAgICAgcGFnaW5hdGlvbjogZmFsc2UsXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBjb21wYW55TGlmZVNsaWRlciA9IG5ldyBTd2lwZXIoJy5jb21wYW55LWxpZmVfX3NsaWRlciAuc3dpcGVyLWNvbnRhaW5lcicsIHtcclxuICAgICAgc2xpZGVzUGVyVmlldzogMSxcclxuICAgICAgc3BhY2VCZXR3ZWVuOiAyMCxcclxuICAgICAgc2xpZGVzUGVyQ29sdW1uOiAwLFxyXG5cclxuICAgICAgYnJlYWtwb2ludHM6IHtcclxuICAgICAgICA2MDA6IHtcclxuICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIsXHJcbiAgICAgICAgICBzbGlkZXNQZXJDb2x1bW46IDIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICA5MDA6IHtcclxuICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDMsXHJcbiAgICAgICAgICBzbGlkZXNQZXJDb2x1bW46IDIsXHJcbiAgICAgICAgICBzcGFjZUJldHdlZW46IDMwLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgMTIwMDoge1xyXG4gICAgICAgICAgc2xpZGVzUGVyVmlldzogNCxcclxuICAgICAgICAgIHNsaWRlc1BlckNvbHVtbjogMixcclxuICAgICAgICAgIHNwYWNlQmV0d2VlbjogMzAsXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgICNTRVJWSUNFIEZVTkNUSU9OXHJcbiAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuICBcclxuICBmdW5jdGlvbiBpZlZpc2libGUocG9zKSB7XHJcbiAgICBjb25zdCBib3R0b21MaW5lID0gaHRtbC5jbGllbnRIZWlnaHQgKyBodG1sLnNjcm9sbFRvcDtcclxuXHJcbiAgICBpZihwb3MgPCBib3R0b21MaW5lKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZ2V0Q29vcmRzKGVsZW0pIHtcclxuICAgIGxldCBjID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0b3A6IGMudG9wICsgaHRtbC5zY3JvbGxUb3AsXHJcbiAgICAgIGxlZnQ6IGMubGVmdCxcclxuICAgICAgcmlnaHQ6IGMucmlnaHQsXHJcbiAgICAgIGJvdHRvbTogYy5ib3R0b20gKyBodG1sLnNjcm9sbFRvcFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaW5pdE92ZXJsYXkoKSB7XHJcbiAgICBsZXQgb3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGVsZW1Ob2RlOiBvdmVybGF5LFxyXG4gICAgICBhZGQ6IGZ1bmN0aW9uKHBhcmVudCkge1xyXG4gICAgICAgIC8vINCU0L7QtNCw0Y4gb3ZlcmxheVxyXG4gICAgICAgIHBhcmVudC5hZnRlcihvdmVybGF5KTtcclxuICAgICAgICBvdmVybGF5LmNsYXNzTGlzdC5hZGQoJ292ZXJsYXknKTtcclxuICAgICAgICBvdmVybGF5LmNsYXNzTGlzdC5hZGQoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAvLyDQktC40LrQu9GO0YfQsNGOINGB0LrRgNC+0LvQu1xyXG4gICAgICAgIHNjcm9sbE9mZigpO1xyXG4gICAgICB9LFxyXG5cclxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAvL9Cj0LTQsNC70Y/RjiBvdmVybGF5XHJcbiAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdpcy12aXNpYmxlJylcclxuICAgICAgICAvLyDQktC60LvRjtGH0LDRjiDRgdC60YDQvtC70LtcclxuICAgICAgICBzY3JvbGxPbigpO1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIC8vIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgIG92ZXJsYXkucmVtb3ZlKCk7XHJcbiAgICAgICAgfSwgNTAwKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgI0FOSU1BVEUgUFJPR1JFU1NcclxuICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuICBjb25zdCBwcm9ncmVzc0FyciA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2dyZXNzJykpLm1hcChpdGVtID0+IHtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBlbGVtOiAgICAgICAgaXRlbSxcclxuICAgICAgcG9zOiAgICAgICAgIGdldENvb3JkcyhpdGVtKSxcclxuICAgICAgbWV0ZXI6ICAgICAgIGl0ZW0ucXVlcnlTZWxlY3RvcignLnByb2dyZXNzX19tZXRlcicpLFxyXG4gICAgICBvdXQ6ICAgICAgICAgaXRlbS5xdWVyeVNlbGVjdG9yKCcucHJvZ3Jlc3NfX291dCcpLFxyXG4gICAgICBwZXJjZW50OiAgICAgK2l0ZW0uZGF0YXNldC5kb25lQnksXHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGFuaW1hdGVQcm9ncmVzcyA9IGZ1bmN0aW9uKHByb2dyZXNzKSB7XHJcbiAgICBpZiAocHJvZ3Jlc3MuZWxlbS5jbGFzc0xpc3QuY29udGFpbnMoJ2lzLXZpc2libGUnKSkgcmV0dXJuO1xyXG4gICAgbGV0IGNvdW50ID0gMDtcclxuXHJcbiAgICAgIHByb2dyZXNzLmVsZW0uY2xhc3NMaXN0LmFkZCgnaXMtdmlzaWJsZScpO1xyXG5cclxuICAgICAgbGV0IHRpbWVySWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uIGNvdW50ZXIoKSB7XHJcbiAgICAgICAgY291bnQrKztcclxuXHJcbiAgICAgICAgcHJvZ3Jlc3MubWV0ZXIuc3R5bGUud2lkdGggPSBgJHtjb3VudH0lYDtcclxuICAgICAgICBwcm9ncmVzcy5vdXQuaW5uZXJUZXh0ID0gY291bnQ7XHJcblxyXG4gICAgICAgIGlmIChjb3VudCA+PSBwcm9ncmVzcy5wZXJjZW50KSB7XHJcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXJJZCk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHNldFRpbWVvdXQoY291bnRlciwgMTApO1xyXG4gICAgICB9LCAxMCk7XHJcbiAgfTtcclxuXHJcblxyXG4gIHByb2dyZXNzQXJyLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICBpZihpZlZpc2libGUoaXRlbS5wb3MudG9wKSkge1xyXG4gICAgICBhbmltYXRlUHJvZ3Jlc3MoaXRlbSk7XHJcbiAgICB9XHJcbiAgfSlcclxuXHJcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGUgPT4ge1xyXG4gICAgcHJvZ3Jlc3NBcnIuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG5cclxuICAgICAgaWYoaWZWaXNpYmxlKGl0ZW0ucG9zLnRvcCkpIHtcclxuICAgICAgICBhbmltYXRlUHJvZ3Jlc3MoaXRlbSk7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSk7XHJcblxyXG5cclxuICBcclxuICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgICNTVEFHRSBBTklNQVRJT05cclxuICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG4gIHtcclxuICAgIGNvbnN0IHNjaGVkdWxlSXRlbXMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zdGFnZScpKSxcclxuICAgICAgICAgIHN2ZyAgICAgICAgICAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2NoZWR1bGVfX3N2ZycpLFxyXG4gICAgICAgICAgeG1sbnMgICAgICAgICA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc7XHJcblxyXG4gICAgaWYoaHRtbC5jbGllbnRXaWR0aCA+PSAxMjYwKSB7XHJcblxyXG4gICAgY29uc3QgY3JlYXRlQW5pbWF0ZSA9IGZ1bmN0aW9uKGF0dHIsIHZhbHVlcywgZHVyLCBiZWdpbikge1xyXG4gICAgICBjb25zdCBhbmltYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKHhtbG5zLCAnYW5pbWF0ZScpO1xyXG5cclxuICAgICAgYW5pbWF0ZS5zZXRBdHRyaWJ1dGUoJ2F0dHJpYnV0ZU5hbWUnLCBhdHRyKTtcclxuICAgICAgYW5pbWF0ZS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlcycsIHZhbHVlcyk7XHJcbiAgICAgIGFuaW1hdGUuc2V0QXR0cmlidXRlKCdkdXInLCBkdXIpO1xyXG4gICAgICBhbmltYXRlLnNldEF0dHJpYnV0ZSgnYmVnaW4nLCBiZWdpbik7XHJcbiAgICAgIGFuaW1hdGUuc2V0QXR0cmlidXRlKCdmaWxsJywgJ2ZyZWV6ZScpO1xyXG5cclxuICAgICAgcmV0dXJuIGFuaW1hdGU7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGNyZWF0ZVBvaW50ID0gZnVuY3Rpb24oeVBvcywgZmlsbCkge1xyXG4gICAgICBjb25zdCBwb2ludCAgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKHhtbG5zLCAnY2lyY2xlJyksXHJcbiAgICAgICAgICAgIGFuaW1hdGUgPSBjcmVhdGVBbmltYXRlKCdyJywgJzA7MjA7MTAnLCAnLjVzJywgJ2luZGVmaW5pdGUnKTtcclxuXHJcbiAgICAgIHBvaW50LnNldEF0dHJpYnV0ZU5TKG51bGwsICdjeCcsICczMHB4Jyk7XHJcbiAgICAgIHBvaW50LnNldEF0dHJpYnV0ZU5TKG51bGwsICdjeScsIGAke3lQb3N9cHhgKTtcclxuICAgICAgcG9pbnQuc2V0QXR0cmlidXRlTlMobnVsbCwgJ3InLCA0KTtcclxuICAgICAgcG9pbnQuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2ZpbGwnLCBmaWxsKTtcclxuICAgICAgcG9pbnQuc2V0QXR0cmlidXRlKCdpZCcsICdjaXJjbGUnKTtcclxuXHJcbiAgICAgIHBvaW50LmFwcGVuZChhbmltYXRlKTtcclxuXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgYzogcG9pbnQsXHJcbiAgICAgICAgYTogYW5pbWF0ZVxyXG4gICAgICB9O1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBjcmVhdGVQYXRoID0gZnVuY3Rpb24oeVBvcywgbGluZUxlbmd0aCkge1xyXG4gICAgICBjb25zdCBwYXRoICAgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKHhtbG5zLCAncGF0aCcpLFxyXG4gICAgICAgICAgICBhbmltYXRlID0gY3JlYXRlQW5pbWF0ZSgnZCcsIGBNIDMwICR7eVBvc30sIHYgMDsgTTMwICR7eVBvc30sIHYke2xpbmVMZW5ndGh9YCwgJy41cycsICdpbmRlZmluaXRlJyk7XHJcbiAgICAgIHBhdGguc2V0QXR0cmlidXRlTlMobnVsbCwgJ2QnLCBgTSAzMCAke3lQb3N9LCB2MGApO1xyXG4gICAgICBwYXRoLnNldEF0dHJpYnV0ZU5TKG51bGwsICdzdHJva2UnLCAnZ3JleScpO1xyXG4gICAgICBwYXRoLnNldEF0dHJpYnV0ZU5TKG51bGwsICdzdHJva2Utd2lkdGgnLCAnLjJweCcpO1xyXG5cclxuICAgICAgcGF0aC5hcHBlbmQoYW5pbWF0ZSk7XHJcblxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHA6IHBhdGgsXHJcbiAgICAgICAgYTogYW5pbWF0ZVxyXG4gICAgICB9O1xyXG4gICAgfTtcclxuICAgIFxyXG4gICAgY29uc3QgYW5pbWF0ZVN2ZyA9IGZ1bmN0aW9uKGVsZW1zKSB7XHJcbiAgICAgIFxyXG4gICAgICBlbGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCwgaXRlbXNBcnIpID0+IHtcclxuXHJcbiAgICAgICAgaWYoaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ2lzLXZpc2libGUnKSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZihpZlZpc2libGUoZ2V0Q29vcmRzKGl0ZW0pLnRvcCArIGh0bWwuY2xpZW50SGVpZ2h0IC8gNCkpIHtcclxuICAgICAgICAgIGxldCBtICAgICA9IHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUoaXRlbS5wYXJlbnRFbGVtZW50KS5tYXJnaW5Cb3R0b20pLFxyXG4gICAgICAgICAgICAgIHBvcyAgID0gZ2V0Q29vcmRzKGl0ZW0pLnRvcCAtIGdldENvb3JkcyhzdmcpLnRvcCArIChpdGVtLm9mZnNldEhlaWdodCkvMixcclxuICAgICAgICAgICAgICBwb2ludCxcclxuICAgICAgICAgICAgICBwYXRoLFxyXG4gICAgICAgICAgICAgIHBhdGhMZW5ndGg7XHJcblxyXG4gICAgICAgICAgaWYoaW5kZXggPT09IDApIHtcclxuICAgICAgICAgICAgcGF0aExlbmd0aCA9IGdldENvb3JkcyhpdGVtc0FycltpbmRleCsxXSkudG9wICsgaXRlbXNBcnJbaW5kZXgrMV0ub2Zmc2V0SGVpZ2h0LzIgLSBnZXRDb29yZHMoc3ZnKS50b3AgLSBpdGVtLm9mZnNldEhlaWdodC8yO1xyXG5cclxuICAgICAgICAgIH0gZWxzZSBpZihpbmRleCAhPT0gaXRlbXNBcnIubGVuZ3RoLTEpIHtcclxuICAgICAgICAgICAgcGF0aExlbmd0aCA9IGdldENvb3JkcyhpdGVtc0FycltpbmRleCsxXSkudG9wICsgaXRlbXNBcnJbaW5kZXgrMV0ub2Zmc2V0SGVpZ2h0LzIgLSBnZXRDb29yZHMoaXRlbSkudG9wIC0gaXRlbS5vZmZzZXRIZWlnaHQgLzI7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29uc3QgZ2V0QmcgPSBmdW5jdGlvbihpdGVtKSB7XHJcbiAgICAgICAgICAgIGlmKGl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdzdGFnZS0tY29tcGxhdGUnKSkge1xyXG4gICAgICAgICAgICAgIHJldHVybiAnIzM5QkZDNSc7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZihpdGVtLmNsYXNzTGlzdC5jb250YWlucygnc3RhZ2UtLXByb2Nlc3MnKSkge1xyXG4gICAgICAgICAgICAgIHJldHVybiAnI0ZGNTcyMic7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuICcjRkZEMEMxJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgcG9pbnQgPSBjcmVhdGVQb2ludChwb3MsIGdldEJnKGl0ZW0pKTtcclxuICAgICAgICAgIHBhdGggPSBjcmVhdGVQYXRoKHBvcywgcGF0aExlbmd0aCk7XHJcblxyXG4gICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIGlmKGluZGV4ID09PSBpdGVtc0Fyci5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgIHN2Zy5hcHBlbmQocG9pbnQuYyk7XHJcbiAgICAgICAgICAgIHBvaW50LmEuYmVnaW5FbGVtZW50KCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzdmcuYXBwZW5kKHBvaW50LmMpO1xyXG4gICAgICAgICAgICBwb2ludC5hLmJlZ2luRWxlbWVudCgpO1xyXG4gICAgICAgICAgICBzdmcucHJlcGVuZChwYXRoLnApO1xyXG4gICAgICAgICAgICBwYXRoLmEuYmVnaW5FbGVtZW50KCk7XHJcbiAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9O1xyXG5cclxuICAgIGFuaW1hdGVTdmcoc2NoZWR1bGVJdGVtcyk7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGU9PiB7XHJcbiAgICAgIGFuaW1hdGVTdmcoc2NoZWR1bGVJdGVtcyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBhZGRWaXNpYmxlID0gZnVuY3Rpb24oZWxlbXMpe1xyXG4gICAgICAgIGVsZW1zLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICBpZihpdGVtLmNsYXNzTGlzdC5jb250YWlucygnaXMtdmlzaWJsZScpKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgaWYoaWZWaXNpYmxlKGdldENvb3JkcyhpdGVtKS50b3AgKyBodG1sLmNsaWVudEhlaWdodCAvIDQpKSB7XHJcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBhZGRWaXNpYmxlKHNjaGVkdWxlSXRlbXMpO1xyXG5cclxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGU9PiB7XHJcbiAgICAgICAgYWRkVmlzaWJsZShzY2hlZHVsZUl0ZW1zKTtcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAjRklMVEVSXHJcbiAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcbiAgaWYoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZpbHRlcicpKSB7XHJcbiAgICBjb25zdCBmbHQgICAgICA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmaWx0ZXInKSxcclxuICAgICAgICAgIGZsdEVsZW1zID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtZmlsdGVyZWQtZWxlbScpKTtcclxuXHJcbiAgICBsZXQgY2F0ICAgICAgPSAnYWxsJyxcclxuICAgICAgICBwcmV2aWV3cyA9IFtdLFxyXG4gICAgICAgIGFydGljbGVzO1xyXG5cclxuICAgIHNob3dGaWx0ZXJSZXN1bHQoY2F0KTtcclxuICAgIGFydGljbGVzID0gZ2V0QXJ0aWNsZShjYXQpO1xyXG5cclxuICAgIGZsdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgIGlmKGUudGFyZ2V0LnRhZ05hbWUgPT09ICdCVVRUT04nKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdpcy1hY3RpdmUnKSkge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBsZXQgY3VycmVudEJ0biA9IGZsdC5xdWVyeVNlbGVjdG9yKCcuZmlsdGVyX19idG4uaXMtYWN0aXZlJykgfHwgZmx0LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0cy1maWx0ZXJfX2J0bi5pcy1hY3RpdmUnKTtcclxuICAgICAgICAgIGN1cnJlbnRCdG4uY2xhc3NMaXN0LnRvZ2dsZSgnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QudG9nZ2xlKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZsdEVsZW1zLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGNhdCA9IGUudGFyZ2V0LmRhdGFzZXQuY2F0ZWdvcnk7XHJcbiAgICAgICAgc2hvd0ZpbHRlclJlc3VsdChjYXQpO1xyXG4gICAgICAgIGFydGljbGVzID0gZ2V0QXJ0aWNsZShjYXQpO1xyXG4gICAgICAgIFxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBzaG93RmlsdGVyUmVzdWx0KGNhdCkge1xyXG4gICAgICBwcmV2aWV3cyA9IFtdO1xyXG4gICAgICBpZihjYXQgPT09ICdhbGwnKSB7XHJcbiAgICAgICAgZmx0RWxlbXMuZm9yRWFjaCgoZWxlbSkgPT4ge1xyXG4gICAgICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcHJldmlld3MgPSBmbHRFbGVtcztcclxuXHJcbiAgICAgICAgcHJldmlld3NbMF0uY2xhc3NMaXN0LmFkZCgnaXMtYWN0aXZlJylcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZsdEVsZW1zLmZvckVhY2goKGVsZW0pPT4ge1xyXG4gICAgICAgIGlmKGVsZW0uZGF0YXNldC5jYXRlZ29yeSA9PT0gY2F0KSB7XHJcbiAgICAgICAgICBlbGVtLmNsYXNzTGlzdC5hZGQoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgIHByZXZpZXdzLnB1c2goZWxlbSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH0pO1xyXG4gICAgICBwcmV2aWV3c1swXS5jbGFzc0xpc3QuYWRkKCdpcy1hY3RpdmUnKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRBcnRpY2xlKGNhdCkge1xyXG4gICAgICBsZXQgYXJyID0gW10sXHJcbiAgICAgICAgICBhcnRpY2xlTGlzdCA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFydGljbGVfX2NvbnRlbnQnKSk7XHJcblxyXG4gICAgICBhcnRpY2xlTGlzdC5mb3JFYWNoKGFydGljbGU9PiB7XHJcbiAgICAgICAgaWYoYXJ0aWNsZS5jbGFzc0xpc3QuY29udGFpbnMoJ2lzLXZpc2libGUnKSkge1xyXG4gICAgICAgICAgYXJ0aWNsZS5jbGFzc0xpc3QucmVtb3ZlKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmKGNhdCA9PT0gJ2FsbCcpIHtcclxuICAgICAgICBhcnIgPSBhcnRpY2xlTGlzdDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhcnRpY2xlTGlzdC5mb3JFYWNoKChhcnRpY2xlLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgaWYoYXJ0aWNsZS5kYXRhc2V0LmNhdGVnb3J5ID09PSBjYXQpIHtcclxuICAgICAgICAgICAgYXJyLnB1c2goYXJ0aWNsZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgICBhcnJbMF0uY2xhc3NMaXN0LmFkZCgnaXMtdmlzaWJsZScpO1xyXG4gICAgICByZXR1cm4gYXJyO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gdG9nZ2xlQXJ0aWNsZShhcnRpY2xlcykge1xyXG5cclxuICAgIH1cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ibG9nX19wcmV2aWV3JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgIGxldCBhcnRpY2xlUHJldmlldyA9IGUudGFyZ2V0LmNsb3Nlc3QoJy5ibG9nX19wcmV2aWV3LWl0ZW0nKTtcclxuXHJcbiAgICAgIGlmKGFydGljbGVQcmV2aWV3LmNsYXNzTGlzdC5jb250YWlucygnaXMtYWN0aXZlJykpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcHJldmlld3MuZm9yRWFjaChwcmV2aWV3ID0+IHtcclxuICAgICAgICAgIGlmKHByZXZpZXcuY2xhc3NMaXN0LmNvbnRhaW5zKCdpcy1hY3RpdmUnKSkge1xyXG4gICAgICAgICAgICBwcmV2aWV3LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICBhcnRpY2xlcy5mb3JFYWNoKGFydGljbGUgPT4ge1xyXG4gICAgICAgICAgICAgIGlmKHByZXZpZXcuZGF0YXNldC5pZCA9PT0gYXJ0aWNsZS5kYXRhc2V0LmlkKSB7XHJcbiAgICAgICAgICAgICAgICBhcnRpY2xlLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgaWYoYXJ0aWNsZVByZXZpZXcuZGF0YXNldC5pZCA9PT0gYXJ0aWNsZS5kYXRhc2V0LmlkKSB7XHJcbiAgICAgICAgICAgICAgICBhcnRpY2xlLmNsYXNzTGlzdC5hZGQoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICBhcnRpY2xlUHJldmlldy5jbGFzc0xpc3QuYWRkKCdpcy1hY3RpdmUnKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgI1NDUk9MTCAgT04vT0ZGXHJcbiAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuICBsZXQgZ2V0Rml4ZWQgPSBmdW5jdGlvbigpIHtcclxuICAgIGxldCBhbGwgPSBkb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3JBbGwoJyonKTtcclxuXHJcbiAgICByZXR1cm4gQXJyYXkuZnJvbShhbGwpLmZpbHRlcihlbGVtID0+IHtcclxuICAgICAgbGV0IGJvb2wgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW0pLnBvc2l0aW9uID09PSAnZml4ZWQnO1xyXG4gICAgICByZXR1cm4gYm9vbDtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBsZXQgZml4ZWRFbGVtZW50cyA9IGdldEZpeGVkKCk7XHJcblxyXG4gIGxldCBzY3JvbGxPbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3Njcm9sbC1vZmYnKTtcclxuICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQgPSAnJztcclxuICAgICAgZml4ZWRFbGVtZW50cy5mb3JFYWNoKGVsZW0gPT4ge1xyXG4gICAgICAgIGVsZW0uc3R5bGUucGFkZGluZ1JpZ2h0ID0gYGA7XHJcbiAgICAgIH0pXHJcbiAgICB9LCAzMDApO1xyXG4gIH1cclxuXHJcbiAgbGV0IHNjcm9sbE9mZiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdzY3JvbGwtb2ZmJyk7XHJcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLnBhZGRpbmdSaWdodCA9IGAke3Njcm9sbFd9cHhgO1xyXG4gICAgZml4ZWRFbGVtZW50cy5mb3JFYWNoKGVsZW0gPT4ge1xyXG4gICAgICBlbGVtLnN0eWxlLnBhZGRpbmdSaWdodCA9IGAke3Njcm9sbFd9cHhgXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgICNBQ0NPUkRJT05cclxuICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuICBjb25zdCBhY2NvcmRpb25zQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFjY29yZGlvbnMnKSxcclxuICAgICAgICBhY2NvcmRpb25zQXJyICAgICAgID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFjY29yZGlvbicpO1xyXG4gIGxldCBjdXJyZW50SXRlbSAgICAgICAgICAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWNjb3JkaW9uLmlzLW9wZW4nKTtcclxuICBcclxuICBpZihjdXJyZW50SXRlbSkge1xyXG4gICAgY3VycmVudEl0ZW0ucXVlcnlTZWxlY3RvcignLmFjY29yZGlvbl9fZHJvcCcpLnN0eWxlLmhlaWdodCA9IGAke3BhcnNlSW50KGdldENvbXB1dGVkU3R5bGUoY3VycmVudEl0ZW0ucXVlcnlTZWxlY3RvcignLmFjY29yZGlvbl9fdHh0JykpLmhlaWdodCkgKyBwYXJzZUludChnZXRDb21wdXRlZFN0eWxlKGN1cnJlbnRJdGVtLnF1ZXJ5U2VsZWN0b3IoJy5hY2NvcmRpb25fX3R4dCcpKS5tYXJnaW5Cb3R0b20pfXB4YDtcclxuICB9XHJcblxyXG4gIGNvbnN0IGFjY29yZGlvbkNsb3NlID0gZnVuY3Rpb24oaXRlbSkge1xyXG5cclxuICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaXMtb3BlbicpO1xyXG4gICAgaXRlbS5xdWVyeVNlbGVjdG9yKCcuYWNjb3JkaW9uX19kcm9wJykuc3R5bGUuaGVpZ2h0ID0gMDtcclxuXHJcbiAgICAvL3RoaXMgY29kZSB3b3JrIGZvciAjRklYRUQgU0lERUJBUlxyXG4gICAgc2V0VGltZW91dCgoKT0+IHtcclxuICAgICAgcGFyZW50Q29vcmRzID0gZ2V0Q29vcmRzKGJhci5wYXJlbnROb2RlKSxcclxuICAgICAgdG9wQm91bmQgICAgID0gTWF0aC5hYnMocGFyZW50Q29vcmRzLnRvcCksXHJcbiAgICAgIGJvdEJvdW5kICAgICA9IE1hdGguYWJzKHBhcmVudENvb3Jkcy5ib3R0b20pO1xyXG4gICAgfSwgNTAwKVxyXG4gIH1cclxuXHJcbiAgY29uc3QgYWNjb3JkaW9uT3BlbiA9IGZ1bmN0aW9uKGl0ZW0pIHtcclxuXHJcbiAgICBsZXQgcyAgICAgICAgPSBnZXRDb21wdXRlZFN0eWxlKGl0ZW0ucXVlcnlTZWxlY3RvcignLmFjY29yZGlvbl9fdHh0JykpLFxyXG4gICAgICAgIGggICAgICAgID0gcGFyc2VJbnQocy5oZWlnaHQpLFxyXG4gICAgICAgIG1iICAgICAgID0gcGFyc2VJbnQocy5tYXJnaW5Cb3R0b20pLFxyXG4gICAgICAgIGl0ZW1Ecm9wID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuYWNjb3JkaW9uX19kcm9wJyk7XHJcblxyXG4gICAgaXRlbS5jbGFzc0xpc3QuYWRkKCdpcy1vcGVuJyk7XHJcbiAgICBpdGVtRHJvcC5zdHlsZS5oZWlnaHQgPSBgJHtoICsgbWJ9cHhgO1xyXG4gICAgLy90aGlzIGNvZGUgd29yayBmb3IgI0ZJWEVEIFNJREVCQVJcclxuICAgIHNldFRpbWVvdXQoKCk9PiB7XHJcbiAgICAgIHBhcmVudENvb3JkcyA9IGdldENvb3JkcyhiYXIucGFyZW50Tm9kZSksXHJcbiAgICAgIHRvcEJvdW5kICAgICA9IE1hdGguYWJzKHBhcmVudENvb3Jkcy50b3ApLFxyXG4gICAgICBib3RCb3VuZCAgICAgPSBNYXRoLmFicyhwYXJlbnRDb29yZHMuYm90dG9tKTtcclxuICAgIH0sIDUwMClcclxuICB9XHJcblxyXG4gIGlmIChhY2NvcmRpb25zQ29udGFpbmVyKSB7XHJcblxyXG4gICAgYWNjb3JkaW9uc0NvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgIGlmKGUudGFyZ2V0LmNsb3Nlc3QoJy5hY2NvcmRpb25fX3BhbmVsJykpIHtcclxuICAgICAgICBsZXQgYWNjb3JkaW9uID0gZS50YXJnZXQucGFyZW50RWxlbWVudDtcclxuICAgICAgICBcclxuICAgICAgICBpZihhY2NvcmRpb24uY2xhc3NMaXN0LmNvbnRhaW5zKCdhY2NvcmRpb24nKSkge1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICBpZihhY2NvcmRpb24gPT09IGN1cnJlbnRJdGVtKSB7XHJcbiAgICAgICAgICAgIGFjY29yZGlvbkNsb3NlKGFjY29yZGlvbik7XHJcbiAgICAgICAgICAgIGN1cnJlbnRJdGVtID0gbnVsbDtcclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYoYWNjb3JkaW9uICE9PSBjdXJyZW50SXRlbSAmJiBjdXJyZW50SXRlbSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBhY2NvcmRpb25zQXJyLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYoaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ2lzLW9wZW4nKSkge1xyXG4gICAgICAgICAgICAgICAgYWNjb3JkaW9uQ2xvc2UoaXRlbSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICBhY2NvcmRpb25PcGVuKGFjY29yZGlvbik7XHJcbiAgICAgICAgICBjdXJyZW50SXRlbSA9IGFjY29yZGlvbjtcclxuICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcblxyXG5cclxuICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgICNCVVJHRVIgLyBEUk9QIE1FTlVcclxuICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuXHJcbiAgbGV0IGJ1cmdlciAgICA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idXJnZXInKSxcclxuICAgIHNjcm9sbFcgICAgID0gd2luZG93LmlubmVyV2lkdGggLSBodG1sLmNsaWVudFdpZHRoO1xyXG5cclxuICAvL9Ce0LHRgNC+0LHQu9GP0LUg0L3QsNCy0ZbQs9Cw0YbRltGOINGH0LXRgNC10Lcg0LrQu9Cw0LLRltGI0YMg0KLQkNCSXHJcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZSkgPT4ge1xyXG4gICAgaWYgKCFkb2N1bWVudC5hY3RpdmVFbGVtZW50LmNsb3Nlc3QoJy5kcm9wLWNvbnRlbnQnKSkge1xyXG4gICAgICAvLyDQpNC+0LrRg9GBINC/0L7QutC40L3Rg9CyINC+0YHRgtCw0L3QvdGW0Lkg0LXQu9C10LzQtdC90YIg0ZYg0L/RgNC10YXQvtC00LjRgtGMINC30L3QvtCyINC90LAgYnVyZ2VyXHJcbiAgICAgIGlmIChlLmNvZGUgPT09ICdUYWInICYmIGRyb3BNZW51LmNsYXNzTGlzdC5jb250YWlucygnaXMtdmlzaWJsZScpKSB7XHJcbiAgICAgICAgYnVyZ2VyLmZvY3VzKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICBpZiAoaW5uZXJXaWR0aCA+PSAxMTAwICYmIGJ1cmdlci5jbGFzc0xpc3QuY29udGFpbnMoJ2lzLWFjdGl2ZScpKSB7XHJcblxyXG4gICAgICBidXJnZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaXMtYWN0aXZlJyk7XHJcbiAgICAgIGRyb3BNZW51LmNsYXNzTGlzdC50b2dnbGUoJ2lzLXZpc2libGUnKTtcclxuXHJcbiAgICAgIHBhZ2VPdmVybGF5LnJlbW92ZSgpO1xyXG4gICAgfVxyXG4gIH0pXHJcblxyXG4gIGJ1cmdlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgIHNjcm9sbFcgPSB3aW5kb3cuaW5uZXJXaWR0aCAtIGh0bWwuY2xpZW50V2lkdGg7XHJcblxyXG4gICAgYnVyZ2VyLmNsYXNzTGlzdC50b2dnbGUoJ2lzLWFjdGl2ZScpO1xyXG4gICAgZHJvcE1lbnUuY2xhc3NMaXN0LnRvZ2dsZSgnaXMtdmlzaWJsZScpO1xyXG5cclxuICAgIGlmIChkcm9wTWVudS5jbGFzc0xpc3QuY29udGFpbnMoJ2lzLXZpc2libGUnKSkge1xyXG4gICAgICBwYWdlT3ZlcmxheS5hZGQoZHJvcE1lbnUpO1xyXG5cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHBhZ2VPdmVybGF5LnJlbW92ZSgpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgICNNT0RBTFxyXG4gID09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcbiAgZnVuY3Rpb24gbW9kYWxJbml0KGVsZW0pIHtcclxuICAgIGlmKCFlbGVtKSByZXR1cm47XHJcbiAgICBjb25zdCBtICAgICA9IGVsZW0sXHJcbiAgICAgICAgICBtQm9keSA9IG0ucXVlcnlTZWxlY3RvcignLm1vZGFsX19ib2R5Jyk7XHJcbiAgICBsZXQgYnRuT3BlbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbC1vcGVuJyk7XHJcbiAgICBmdW5jdGlvbiBvcGVuKCkge1xyXG4gICAgICBtLmNsYXNzTGlzdC5hZGQoJ2lzLW9wZW4nKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGNsb3NlKCkge1xyXG4gICAgICBtLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLW9wZW4nKTtcclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgIG9wZW46IG9wZW4sXHJcbiAgICAgIGNsb3NlOiBjbG9zZVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbmNvbnN0IG1vZGFsID0gbW9kYWxJbml0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbCcpKTtcclxuXHJcbmRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgaWYoZS50YXJnZXQuY2xvc2VzdCgnI21vZGFsLW9wZW4nKSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgbW9kYWwub3BlbigpO1xyXG4gICAgc2Nyb2xsT2ZmKCk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIGlmKGUudGFyZ2V0LmNsb3Nlc3QoJyNtb2RhbC1jbG9zZScpKSB7XHJcbiAgICBtb2RhbC5jbG9zZSgpO1xyXG4gICAgc2Nyb2xsT24oKVxyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxufSk7XHJcblxyXG4gIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgI01FRElBIEpVTVBFUlNcclxuICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG4gIC8vICoqKlxyXG4gIC8vKiDQn9GA0LjQs9Cw0Y7Rh9C+0LzRgyDQtdC70LXQvNC10L3RgtGDINC/0YDQuNGB0LLQvtGX0YLQuCDQsNGC0YDQuNCx0YPRgiBkYXRhLWp1bXAg0YLQsCBkYXRhLWp1bXAtdG9cclxuICAvLyog0JIgZGF0YS1qdW1wLXRvINC30LDQv9C40YHQsNGC0Lgg0YHRgtGA0L7QutGDOiBcclxuICAvLyogXCJuZXdQYXJlbnRFbGVtZW50U2VsZWN0b3IuanMtanVtcCBhZnRlckVMZW1lbnRQb3NpdGlvbiBtZWRpYVNjcmVlbldpZHRoXCJcclxuICAvLyogbmV3UGFyZW50RWxlbWVudFNlbGVjdG9yLmpzLWp1bXAgIC0g0LHQsNGC0YzQutGW0LLRgdGM0LrQuNC5INGB0LXQu9C10LrRgtC+0YAgKyAuanMtanVtcFxyXG4gIC8vKiBhZnRlckVMZW1lbnRQb3NpdGlvbiAtINC/0ZbRgdC70Y8g0Y/QutC+0LPQviDQtdC70LXQvNC10L3RgtCwINCy0YHRgtCw0LLQu9GP0YLQuCBcclxuICAvLyogbWVkaWFTY3JlZW5XaWR0aCAtINC/0YDQuCDRj9C60L7QvNGDINGA0L7Qt9GI0LjRgNC10L3QvdGWINC/0LXRgNC10YHRgtCw0LLQu9GP0YLQuFxyXG4gIC8vKiBcclxuICAvLyAqKipcclxuXHJcbiAgbGV0IGFyciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWp1bXBdJyk7XHJcblxyXG4gIGxldCBqdW1wZXJzID0gQXJyYXkuZnJvbShhcnIpLm1hcChlbGVtID0+IHtcclxuXHJcbiAgICBsZXQgcGFyYW0gPSBlbGVtLmRhdGFzZXQuanVtcFRvLnNwbGl0KCcgJyk7XHJcbiAgICAvLyBJZiBpbiBkYXRhLWp1bXAtdG8gZWxlbWVudCBwb3NpdGlvbiA8PSAwIHNob3dlZCBhbGVydCgpOyBcclxuICAgIGlmICgrcGFyYW1bMV0gPCAwIHx8IHBhcmFtWzFdID09PSAnJykge1xyXG4gICAgICBhbGVydChgRXJyb3I6IGJhZCB2YWx1ZSBpbiBkYXRhLWp1bXAtdG86IFwiLi4uICR7K3BhcmFtWzFdfSAuLi5cImApXHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBlbDogZWxlbSxcclxuICAgICAgcmVhbFBhcmVudDogZWxlbS5wYXJlbnRFbGVtZW50LFxyXG4gICAgICByZWFsUHJldkVsZW06IGVsZW0ucHJldmlvdXNFbGVtZW50U2libGluZyxcclxuICAgICAgbmV3UGFyZW50OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHBhcmFtWzBdKSxcclxuICAgICAgbmV3UG9zOiArcGFyYW1bMV0sXHJcbiAgICAgIHNjcmVlbjogK3BhcmFtWzJdLFxyXG4gICAgfVxyXG4gIH0pXHJcblxyXG4gIGZ1bmN0aW9uIGp1bXAoKSB7XHJcbiAgICBzY3JlZW5XID0gd2luZG93LmlubmVyV2lkdGg7XHJcblxyXG4gICAganVtcGVycy5mb3JFYWNoKGp1bXBlciA9PiB7XHJcbiAgICAgIGlmIChzY3JlZW5XID49IGp1bXBlci5zY3JlZW4gJiYganVtcGVyLmVsLmRhdGFzZXQuanVtcCkge1xyXG4gICAgICAgIC8vINCe0LHRgNC+0LHQu9GP0ZQg0L/RgNC40LbQvtC6INCyINC/0L7Rh9Cw0YLQutC+0LLQuNC5INC10LvQtdC80LXQvdGCIFxyXG5cclxuICAgICAgICBpZiAoIWp1bXBlci5yZWFsUHJldkVsZW0pIHtcclxuICAgICAgICAgIGp1bXBlci5yZWFsUGFyZW50LnByZXBlbmQoanVtcGVyLmVsKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGp1bXBlci5yZWFsUHJldkVsZW0uYWZ0ZXIoanVtcGVyLmVsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGp1bXBlci5lbC5kYXRhc2V0Lmp1bXAgPSAnJztcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHNjcmVlblcgPCBqdW1wZXIuc2NyZWVuICYmICFqdW1wZXIuZWwuZGF0YXNldC5qdW1wKSB7XHJcbiAgICAgICAgLy8g0J7QsdGA0L7QsdC70Y/RlCDQv9GA0LjQttC+0Log0LIg0L3QvtCy0LjQuSDQtdC70LXQvNC10L3RglxyXG5cclxuICAgICAgICBpZiAoIWp1bXBlci5uZXdQYXJlbnQuY2hpbGRFbGVtZW50Q291bnQpIHtcclxuICAgICAgICAgIGp1bXBlci5uZXdQYXJlbnQuYXBwZW5kKGp1bXBlci5lbCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChqdW1wZXIubmV3UGFyZW50LmNoaWxkRWxlbWVudENvdW50IDwganVtcGVyLm5ld1Bvcykge1xyXG4gICAgICAgICAganVtcGVyLm5ld1BhcmVudC5hcHBlbmQoanVtcGVyLmVsKVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaWYgKGp1bXBlci5uZXdQb3MgPT09IDApIHtcclxuXHJcbiAgICAgICAgICAgIGp1bXBlci5uZXdQYXJlbnQucHJlcGVuZChqdW1wZXIuZWwpXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBbanVtcGVyLm5ld1BvcyAtMV0g0LfQvNGW0YnRg9GOINC90LAg0L7QtNC40L3QuNGG0Y4uIEpTINGA0LDRhdGD0ZQg0L/QvtGH0LjQvdCw0Y7Rh9C4INC3IDAuXHJcbiAgICAgICAgICAgIGp1bXBlci5uZXdQYXJlbnQuY2hpbGRyZW5banVtcGVyLm5ld1BvcyAtIDFdLmFmdGVyKGp1bXBlci5lbCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBqdW1wZXIuZWwuZGF0YXNldC5qdW1wID0gJ21vdmVkJztcclxuICAgICAgfVxyXG5cclxuICAgIH0pXHJcbiAgfVxyXG4gIGp1bXAoKTtcclxuXHJcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uKGUpIHtcclxuICAgIC8vINCv0LrRidC+INC30LzRltC90Y7RlNGC0YzRgdGPINCy0LjRgdC+0YLQsCDQtdC60YDQsNC90LAg0YLQvtC00ZYg0L/QtdGA0LXRgNC40LLQsNGU0Lwg0LLQuNC60L7QvdCw0L3QvdGPINGE0YPQvdC60YbRltGXXHJcbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPT09IHNjcmVlblcpIHJldHVybjtcclxuICAgIGp1bXAoKVxyXG4gIH0pXHJcblxyXG5cclxuICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgICNTVkcgRFJBV0lORCBMSU5FXHJcbiAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuICB7XHJcbiAgICBsZXQgbGluZUluaXQgPSBmdW5jdGlvbihlbGVtKSB7XHJcblxyXG4gICAgICBpZiAoIWVsZW0pIHtcclxuICAgICAgICAvLyBhbGVydCgnU29yeSBNaWNrbGUsIGZyb20gc3ZnIGRyYXdpbmcgbGluZScpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgbGV0IGxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RlcHNfX2xpc3QnKSxcclxuICAgICAgICBpdGVtc0FyciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zdGVwc19faXRlbScpLFxyXG4gICAgICAgIGRyYXdBcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0ZXBzX19zdmctd3JhcCcpLFxyXG4gICAgICAgIHBhdGhFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN2Z19fbGluZScpLFxyXG4gICAgICAgIGNpcmNsZUVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3ZnX19jaXJjbGUnKSxcclxuICAgICAgICBpdGVtc0luUm93LFxyXG4gICAgICAgIHZJbmRlbnQsXHJcbiAgICAgICAgaEluZGVudCA9IDEwLFxyXG4gICAgICAgIGxpbmVTdGFydFBvcyA9IGBNIDUgMGA7XHJcblxyXG5cclxuICAgICAgZnVuY3Rpb24gZHJhdygpIHtcclxuICAgICAgICBlbGVtLnNldEF0dHJpYnV0ZSgndmlld0JveCcsIGAwIDAgJHtlbGVtLnBhcmVudE5vZGUub2Zmc2V0V2lkdGh9ICR7ZWxlbS5wYXJlbnROb2RlLm9mZnNldEhlaWdodH1gKTtcclxuICAgICAgICBwYXRoRWxlbS5yZW1vdmVBdHRyaWJ1dGUoJ3N0cm9rZS1kYXNoYXJyYXknKTtcclxuICAgICAgICBwYXRoRWxlbS5yZW1vdmVBdHRyaWJ1dGUoJ3N0cm9rZS1kYXNob2Zmc2V0Jyk7XHJcblxyXG4gICAgICAgIGl0ZW1zSW5Sb3cgPSBNYXRoLnJvdW5kKGxpc3Qub2Zmc2V0V2lkdGggLyBpdGVtc0FyclswXS5vZmZzZXRXaWR0aCksXHJcbiAgICAgICAgICB2SW5kZW50ID0gcGFyc2VJbnQoZ2V0Q29tcHV0ZWRTdHlsZShpdGVtc0FyclswXSkubWFyZ2luQm90dG9tKTtcclxuXHJcbiAgICAgICAgY2lyY2xlRWxlbS5zZXRBdHRyaWJ1dGUoJ2N4JywgJzUnKTtcclxuICAgICAgICBjaXJjbGVFbGVtLnNldEF0dHJpYnV0ZSgnY3knLCAnMycpO1xyXG5cclxuICAgICAgICBsZXQgc3RyID0gJyc7XHJcblxyXG4gICAgICAgIHN0ciArPSBgJHtsaW5lU3RhcnRQb3N9IHYke2l0ZW1zQXJyWzBdLm9mZnNldEhlaWdodCAtIHZJbmRlbnQvMn1gO1xyXG5cclxuICAgICAgICBsZXQgdG1wQ291bnQgPSBpdGVtc0luUm93O1xyXG4gICAgICAgIGxldCByb3dMZW5ndGggPSAwO1xyXG5cclxuICAgICAgICBpdGVtc0Fyci5mb3JFYWNoKChpdGVtLCBpLCBhcnIpID0+IHtcclxuXHJcbiAgICAgICAgICBpZiAoaSA8IGFyci5sZW5ndGggLSAxKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoaSArIDEgPT09IHRtcENvdW50KSB7XHJcbiAgICAgICAgICAgICAgLy8g0L7QsdGA0L7QsdC70Y/RlCDQvtGB0YLQsNC90L3RltC5INC10LvQtdC80LXQvdGCINGA0Y/QtNGDXHJcbiAgICAgICAgICAgICAgcm93TGVuZ3RoICs9IGl0ZW0ub2Zmc2V0V2lkdGggLSBoSW5kZW50O1xyXG4gICAgICAgICAgICAgIHN0ciArPSBgIGgke3Jvd0xlbmd0aH0gdiAke3ZJbmRlbnR9YDtcclxuICAgICAgICAgICAgICBzdHIgKz0gYCBoJHstcm93TGVuZ3RofSB2JHthcnJbaSsxXS5vZmZzZXRIZWlnaHR9YDtcclxuXHJcbiAgICAgICAgICAgICAgcm93TGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgICB0bXBDb3VudCArPSBpdGVtc0luUm93O1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAvLyDQvtCx0YDQvtCxLiDQtdC70LXQvNC10L3RglxyXG4gICAgICAgICAgICAgIHJvd0xlbmd0aCArPSBpdGVtLm9mZnNldFdpZHRoO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8g0L7QtNGA0L7QsdC70Y/QtSDQvtGB0YLQsNC90L3RltC5INC10LvQtdC80LXQvdGCINCyINGB0L/QuNGB0LrRg1xyXG4gICAgICAgICAgICByb3dMZW5ndGggKz0gaXRlbS5vZmZzZXRXaWR0aCAtIGhJbmRlbnQgKiAyO1xyXG5cclxuICAgICAgICAgICAgc3RyICs9IGAgaCR7cm93TGVuZ3RofWBcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHBhdGhFbGVtLnNldEF0dHJpYnV0ZSgnZCcsIHN0cik7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBsZXQgYW5pbWF0ZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmIChsaXN0LmNsYXNzTGlzdC5jb250YWlucygnaXMtdmlzaWJsZScpKSByZXR1cm47XHJcblxyXG4gICAgICAgIGxldCBwb3MgPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcclxuXHJcbiAgICAgICAgcGF0aEVsZW0uc2V0QXR0cmlidXRlKCdzdHJva2UtZGFzaGFycmF5JywgcGF0aEVsZW0uZ2V0VG90YWxMZW5ndGgoKSk7XHJcbiAgICAgICAgcGF0aEVsZW0uc2V0QXR0cmlidXRlKCdzdHJva2UtZGFzaG9mZnNldCcsIHBhdGhFbGVtLmdldFRvdGFsTGVuZ3RoKCkpO1xyXG5cclxuICAgICAgICBpZiAocG9zIDwgaHRtbC5jbGllbnRIZWlnaHQgLyAyKSB7XHJcbiAgICAgICAgICBsZXQgbGluZUFuaW1hdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluZS1hbmltYXRlJyksXHJcbiAgICAgICAgICAgIGNpcmNsZUFuaW1hdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2lyY2xlLWFuaW1hdGUnKTtcclxuICAgICAgICAgIGNpcmNsZUFuaW1hdGUuYmVnaW5FbGVtZW50KCk7XHJcbiAgICAgICAgICBsaXN0LmNsYXNzTGlzdC5hZGQoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0aW1lSW50ZXJ2YWwgPSBwYXJzZUludChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluZS1hbmltYXRlJykuZ2V0QXR0cmlidXRlKCdkdXInKSkgLyBpdGVtc0Fyci5sZW5ndGg7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnN0ZXBzX19pdGVtJykuZm9yRWFjaChmdW5jdGlvbihpdGVtLCBpbmRleCkge1xyXG4gICAgICAgICAgbGV0IGRlbGF5ID0gaW5kZXggKiB0aW1lSW50ZXJ2YWw7XHJcbiAgICAgICAgICBpdGVtLnN0eWxlLnRyYW5zaXRpb25EZWxheSA9IFwiXCIuY29uY2F0KGRlbGF5ICsgLjUsIFwic1wiKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfTtcclxuXHJcblxyXG4gICAgICBkcmF3KCk7XHJcbiAgICAgIGFuaW1hdGUoKTtcclxuXHJcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgZHJhdygpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgYW5pbWF0ZSgpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBsaW5lSW5pdChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3ZnJykpO1xyXG4gIH1cclxuXHJcbn0pXHJcbiJdfQ==
