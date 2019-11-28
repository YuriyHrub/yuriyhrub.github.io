'use strict'; // IE polifil --- .closest()

(function () {
  if (!Element.prototype.closest) {
    Element.prototype.closest = function (css) {
      var node = this;

      while (node) {
        if (node.matches(css)) return node;else node = node.parentElement;
      }

      return null;
    };
  }
})(); // IE polifil --- .matches()


(function () {
  // проверяем поддержку
  if (!Element.prototype.matches) {
    // определяем свойство
    Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector;
  }
})(); // forEach polifil


if ('NodeList' in window && !NodeList.prototype.forEach) {
  console.info('polyfill for IE11');

  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;

    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
} // remove() polyfill


if (!Element.prototype.remove) {
  Element.prototype.remove = function () {
    if (this.parentNode) {
      this.parentNode.removeChild(this);
    }
  };
}

window.onload = function () {
  var windowWidth = screen.width;

  if (windowWidth >= 1200) {
    centered(document.documentElement.clientHeight);
  }

  if (windowWidth >= 900) document.querySelector('.pop-up-container').classList.add('pop-up-hidden');
  window.addEventListener('resize', function () {
    windowWidth = screen.width;

    if (windowWidth >= 1200) {
      hightLight(getCoordsOnPage(sections));
    }
  }); // Burger menu

  var menuToggle = document.querySelector('.burger-menu'),
      menu = document.querySelector('.main-menu'),
      menuLinks = document.querySelectorAll('.menu-link'),
      currentMenuLink = null,
      prevMenuLink = null; // Click events

  document.addEventListener('click', function (e) {
    var target = e.target;

    if (target.closest('.burger-menu')) {
      // Клик по меню
      showHideMenu();
      return;
    } else if (target.closest('.main-menu') === null && !menu.classList.contains('menu-hide')) {
      // Клик вне меню
      showHideMenu();
      return;
    } else if (target.classList.contains('menu-link')) {
      setTimeout(showHideMenu, 500);
    } // Скрывает и показывает pop-up


    if (target.closest('.pop-up-toggle')) {
      document.querySelector('.pop-up-container').classList.toggle('pop-up-hidden');
    }
  }); // Клик внутри формы

  document.forms.feedback.addEventListener('click', function () {
    if (event.target.type === 'checkbox') {
      var label = event.target.parentElement;
      label.classList.toggle('checked');
    }
  });
  var currentTab = null;
  markTab(document.querySelectorAll('.tab')[0]); //Marked tab when window.onload
  //Hover events

  document.addEventListener('mouseover', function (e) {
    if (windowWidth <= 1200) return;
    var target = event.target;

    if (target.closest('.tab')) {
      var tab = target;

      if (tab.classList.contains('tab')) {
        markTab(tab);
      } else {
        while (!tab.classList.contains('tab')) {
          tab = tab.parentElement;
        }

        markTab(tab);
      }
    }
  });
  var panelItems = document.querySelectorAll('.panel-link'),
      //Sulki z .nav-panel
  sections = document.querySelectorAll('.site-section'),
      currentPanelItem = null,
      prevPanelItem = null;
  hightLight(getCoordsOnPage(sections)); //When window.onload
  // Scroll event

  var btnFixed = false,
      homeHeight = document.querySelector('.home-section').offsetHeight,
      feedbackTop = Math.round(document.querySelector('.feedback-section').getBoundingClientRect().top);
  document.addEventListener('scroll', function (e) {
    // Создание кнопки в центре
    var scrollTop = document.documentElement.scrollTop,
        feedbackTop = Math.round(document.querySelector('.feedback-section').getBoundingClientRect().top);

    if (!btnFixed && scrollTop >= homeHeight - 10) {
      var a = document.createElement('a');
      a.href = '#hire-us';
      a.innerHTML = 'Hire us';
      a.classList.add('btn-fixed');
      document.body.appendChild(a);
      btnFixed = true;
    }

    if (btnFixed && feedbackTop <= screen.height / 2) {
      document.querySelector('.btn-fixed').remove();
      btnFixed = false;
    }

    if (btnFixed && scrollTop + 10 <= homeHeight) {
      document.querySelector('.btn-fixed').remove();
      btnFixed = false;
    }

    hightLight(getCoordsOnPage(sections)); // show popUp block in map

    if (screen.width >= 900) {
      var popUp = document.querySelector('.pop-up-container'),
          mapTop = document.getElementById('map').getBoundingClientRect().top;

      if (mapTop <= 50 && popUp.classList.contains('pop-up-hidden')) {
        popUp.classList.remove('pop-up-hidden');
      }

      if (mapTop < 0 && !popUp.classList.contains('pop-up-hidden')) {
        popUp.classList.add('pop-up-hidden');
      }
    }
  });

  function centered(viewHeight) {
    document.querySelectorAll('.site-section').forEach(function (section, index) {
      var sectionHeight = Math.round(section.offsetHeight);
      console.log(sectionHeight, section.id);

      if (sectionHeight <= viewHeight && section.id !== 'contact') {
        var diff = viewHeight - sectionHeight;
        section.style.paddingTop = "".concat(diff / 2, "px");
        section.style.paddingBottom = "".concat(diff / 2, "px");
      }
    });
  }

  function hightLight(coords) {
    if (windowWidth < 1200) return; // Pru scrolli pidsvichue v navPanel pozuciyu ta nomer section

    var windowHeight = document.documentElement.clientHeight,
        currentScroll = document.documentElement.scrollTop,
        changingBorder = currentScroll + windowHeight / 2; //Liniya pru pereteni yakoi zminyuetsya currentPanelItem

    coords.forEach(function (section, i) {
      if (changingBorder >= section.top && changingBorder <= section.bottom) {
        //Liniya peretuny mizh section.top i section.bottom
        currentPanelItem = panelItems[i];
        currentMenuLink = menuLinks[i];

        if (prevPanelItem !== null && prevPanelItem !== currentPanelItem) {
          //Delete class y prev navItem and menuLink
          prevPanelItem.classList.remove('link-active');
          prevMenuLink.classList.remove('link-active');
        }

        if (currentPanelItem.classList.contains('link-active')) return;
        currentPanelItem.classList.add('link-active');
        currentMenuLink.classList.add('link-active');
        prevPanelItem = currentPanelItem;
        prevMenuLink = currentMenuLink;
      }
    });
  }

  function markTab(tab) {
    if (windowWidth < 1200) return; // Pru hoveri cursorom na tab peremischae povzynok na potribnuy tab

    if (currentTab !== null && currentTab !== tab) {
      // Удаляє класс у попереднього елемента
      // При першому визові функції пропускае условіе 
      currentTab.classList.remove('tab-active');
    }

    currentTab = tab;
    var tabParentBlockLeftCoord = document.querySelector('.home-tabs').getBoundingClientRect().left,
        currentTabLeftCoord = currentTab.getBoundingClientRect().left,
        tabToggle = document.querySelector('.tabs-toggle');
    tabToggle.style.left = "".concat(currentTabLeftCoord - tabParentBlockLeftCoord, "px");
    currentTab.classList.add('tab-active');
  }

  function showHideMenu() {
    menuToggle.classList.toggle('js-active');
    menu.classList.toggle('menu-hide');
  }

  function getCoordsOnPage(elements) {
    var arr = [],
        currentScroll = document.documentElement.scrollTop;
    elements.forEach(function (section) {
      var c = section.getBoundingClientRect();
      arr.push({
        id: section.id,
        top: c.top + currentScroll,
        right: c.right + currentScroll,
        bottom: c.bottom + currentScroll,
        left: c.left + currentScroll
      });
    });
    return arr;
  } // alert(`Height: ${screen.height}, width: ${screen.width}`)

};

window.initMap = function () {
  var coords = {
    lat: 49.820870,
    lng: 23.985022
  };
  var markerIcon = 'src/img/map_marker.png'; //Путь прописывать от index.html

  var styles = [{
    "featureType": "all",
    "elementType": "labels.text.fill",
    "stylers": [{
      "saturation": 36
    }, {
      "color": "#707070"
    }, {
      "lightness": 40
    }]
  }, {
    "featureType": "all",
    "elementType": "labels.text.stroke",
    "stylers": [{
      "visibility": "on"
    }, {
      "color": "#000000"
    }, {
      "lightness": 16
    }]
  }, {
    "featureType": "all",
    "elementType": "labels.icon",
    "stylers": [{
      "visibility": "off"
    }]
  }, {
    "featureType": "administrative",
    "elementType": "geometry.fill",
    "stylers": [{
      "color": "#000000"
    }, {
      "lightness": 20
    }]
  }, {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [{
      "color": "#000000"
    }, {
      "lightness": 17
    }, {
      "weight": 1.2
    }]
  }, {
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [{
      "color": "#424242"
    }]
  }, {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [{
      "color": "#000000"
    }, {
      "lightness": 21
    }]
  }, {
    "featureType": "poi",
    "elementType": "labels",
    "stylers": [{
      "visibility": "on"
    }]
  }, {
    "featureType": "poi",
    "elementType": "labels.icon",
    "stylers": [{
      "visibility": "off"
    }]
  }, {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [{
      "lightness": 17
    }, {
      "color": "#484848"
    }]
  }, {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [{
      "lightness": 29
    }, {
      "weight": 0.2
    }, {
      "color": "#ff0000"
    }, {
      "visibility": "off"
    }]
  }, {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [{
      "color": "#000000"
    }, {
      "lightness": 18
    }]
  }, {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [{
      "color": "#000000"
    }, {
      "lightness": 16
    }]
  }, {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [{
      "color": "#000000"
    }, {
      "lightness": 19
    }]
  }, {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{
      "color": "#000000"
    }, {
      "lightness": 17
    }]
  }];
  var map = new google.maps.Map(document.getElementById('map'), {
    center: coords,
    zoom: 12,
    disableDefaultUI: true,
    styles: styles
  });
  /*  let marker = new google.maps.Marker({
      icon: markerIcon,
      position: coords,
      title: 'HEllo',
      map: map
    });*/

  var html = "<div class=\"pin\"></div>\n              <div class=\"pin-effect\"></div>";
  var overlay;
  MyOverlay.prototype = new google.maps.OverlayView();
  var bounds = new google.maps.LatLngBounds(new google.maps.LatLng(coords));
  overlay = new MyOverlay(map, coords, html, bounds);

  function MyOverlay(map, coordinates, html, bounds) {
    this.map_ = map;
    this.html_ = html;
    this.coordinates_ = coordinates;
    this.bounds_ = bounds;
    this.div_ = null;
    this.setMap(map);
  }

  MyOverlay.prototype.onAdd = function () {
    var div = document.createElement('div');
    div.classList.add('marker');
    div.innerHTML = html;
    this.div_ = div;
    var panes = this.getPanes();
    panes.overlayMouseTarget.appendChild(this.div_);
    var mapOverlay = document.createElement('div');
    mapOverlay.classList.add('map-overlay');
    panes.overlayShadow.appendChild(mapOverlay);
  };

  MyOverlay.prototype.draw = function () {
    var projection = this.getProjection();
    var sw = projection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
    var ne = projection.fromLatLngToDivPixel(this.bounds_.getNorthEast());
    var div = this.div_;
    div.style.left = sw.x + 'px';
    div.style.top = ne.y + 'px';
  };

  map.addListener('zoom_changed', function () {
    var zoom = this.getZoom();

    if (zoom <= 16 && this.getMapTypeId() === 'hybrid') {
      this.setMapTypeId('roadmap');
    }

    if (zoom >= 16) {
      this.setMapTypeId('hybrid');
    }
  });
}; //End mapInit
// initMap();
"use strict";

var multiItemSlider = function () {
  function isElementVisible(element) {
    var rect = element.getBoundingClientRect(),
        vWidth = window.innerWidth || document.documentElement.clientWidth,
        vHeight = window.innerHeight || document.documentElement.clientHeight,
        elemFromPoint = function elemFromPoint(x, y) {
      return document.elementFromPoint(x, y);
    };

    if (rect.right < 0 || rect.bottom < 0 || rect.left > vWidth || rect.top > vHeight) return false;
    return element.contains(elemFromPoint(rect.left, rect.top)) || element.contains(elemFromPoint(rect.right, rect.top)) || element.contains(elemFromPoint(rect.right, rect.bottom)) || element.contains(elemFromPoint(rect.left, rect.bottom));
  }

  return function (selector, config) {
    var mainElement = document.querySelector(selector),
        // основный элемент блока
    sliderWrapper = mainElement.querySelector('.slider-wrapper'),
        // обертка для .slider-item
    sliderItems = mainElement.querySelectorAll('.slider-item'),
        // элементы (.slider-item)
    sliderControls = mainElement.querySelectorAll('.slider-control'),
        // элементы управления
    sliderControlLeft = mainElement.querySelector('.slider-control-left'),
        // кнопка "LEFT"
    sliderControlRight = mainElement.querySelector('.slider-control-right'),
        // кнопка "RIGHT"
    wrapperWidth = parseFloat(getComputedStyle(sliderWrapper).width),
        // ширина обёртки
    itemWidth = parseFloat(getComputedStyle(sliderItems[0]).width),
        // ширина одного элемента
    positionLeftItem = 0,
        // позиция левого активного элемента
    transform = 0,
        // значение трансформации .slider_wrapper
    step = itemWidth / wrapperWidth * 100,
        // величина шага (для трансформации)
    items = [],
        // массив элементов
    interval = 0,
        html = mainElement.innerHTML,
        states = [{
      active: false,
      minWidth: 0,
      count: 1
    }, {
      active: false,
      minWidth: 980,
      count: 2
    }],
        _config = {
      isCycling: false,
      // автоматическая смена слайдов
      direction: 'right',
      // направление смены слайдов
      interval: 3000,
      // интервал между автоматической сменой слайдов
      pause: true // устанавливать ли паузу при поднесении курсора к слайдеру

    },
        visibleItems = Math.round(wrapperWidth / itemWidth),
        indexScaledItem = null;

    for (var key in config) {
      if (key in _config) {
        _config[key] = config[key];
      }
    }

    var startX = 0; // наполнение массива items

    sliderItems.forEach(function (item, index) {
      items.push({
        item: item,
        position: index,
        transform: 0
      });
    });

    if (visibleItems === 3) {
      indexScaledItem = 1;
      items[indexScaledItem].item.classList.add('item-scale');
    } else {
      indexScaledItem = 0;
      items[indexScaledItem].item.classList.add('item-scale');
    }

    var setActive = function setActive() {
      var _index = 0;
      var width = parseFloat(document.body.clientWidth);
      states.forEach(function (item, index, arr) {
        states[index].active = false;
        if (width >= states[index].minWidth) _index = index;
      });
      states[_index].active = true;
    };

    var getActive = function getActive() {
      var _index;

      states.forEach(function (item, index, arr) {
        if (states[index].active) {
          _index = index;
        }
      });
      return _index;
    };

    var position = {
      getItemMin: function getItemMin() {
        var indexItem = 0;
        items.forEach(function (item, index) {
          if (item.position < items[indexItem].position) {
            indexItem = index;
          }
        });
        return indexItem;
      },
      getItemMax: function getItemMax() {
        var indexItem = 0;
        items.forEach(function (item, index) {
          if (item.position > items[indexItem].position) {
            indexItem = index;
          }
        });
        return indexItem;
      },
      getMin: function getMin() {
        return items[position.getItemMin()].position;
      },
      getMax: function getMax() {
        return items[position.getItemMax()].position;
      }
    };

    var transformItem = function transformItem(direction) {
      var nextItem;

      if (!isElementVisible(mainElement)) {
        return;
      }

      if (direction === 'right') {
        positionLeftItem++;

        if (positionLeftItem + wrapperWidth / itemWidth - 1 >= position.getMax()) {
          nextItem = position.getItemMin();
          items[nextItem].position = position.getMax() + 1;
          items[nextItem].transform += items.length * 100;
          items[nextItem].item.style.transform = "translateX(".concat(items[nextItem].transform, "%)");
        }

        if (indexScaledItem === items.length - 1) {
          items[indexScaledItem].item.classList.remove('item-scale');
          indexScaledItem = 0;
          items[indexScaledItem].item.classList.add('item-scale');
        } else {
          items[indexScaledItem].item.classList.remove('item-scale');
          indexScaledItem++;
          items[indexScaledItem].item.classList.add('item-scale');
        }

        transform -= step;
      }

      if (direction === 'left') {
        positionLeftItem--;

        if (positionLeftItem <= position.getMin()) {
          nextItem = position.getItemMax();
          items[nextItem].position = position.getMin() - 1;
          items[nextItem].transform -= items.length * 100;
          items[nextItem].item.style.transform = "translateX(".concat(items[nextItem].transform, "%)");
        }

        if (indexScaledItem === 0) {
          items[indexScaledItem].item.classList.remove('item-scale');
          indexScaledItem = items.length - 1;
          items[indexScaledItem].item.classList.add('item-scale');
        } else {
          items[indexScaledItem].item.classList.remove('item-scale');
          indexScaledItem--;
          items[indexScaledItem].item.classList.add('item-scale');
        }

        transform += step;
      }

      sliderWrapper.style.transform = 'translateX(' + transform + '%)';
    };

    var _cycle = function cycle(direction) {
      if (!_config.isCycling) {
        return;
      }

      interval = setInterval(function () {
        transformItem(direction);
      }, _config.interval);
    }; //Обработчик события onclik


    var controlClick = function controlClick(e) {
      if (e.target.classList.contains('slider-control')) {
        e.preventDefault();
        var direction = e.target.classList.contains('slider-control-right') ? 'right' : 'left';
        transformItem(direction);
        clearInterval(interval);

        _cycle(_config.direction);
      }
    }; // обработка события изменения видимости страницы


    var handleVisibilityChange = function handleVisibilityChange() {
      if (document.visibilityState === "hidden") {
        clearInterval(interval);
      } else {
        clearInterval(interval);

        _cycle(_config.direction);
      }
    };

    var refresh = function refresh() {
      clearInterval(interval);
      mainElement.innerHTML = html;
      sliderWrapper = mainElement.querySelector('.slider-wrapper');
      sliderItems = mainElement.querySelectorAll('.slider-item');
      sliderControls = mainElement.querySelectorAll('.slider-control');
      sliderControlLeft = mainElement.querySelector('.slider-control-left');
      sliderControlRight = mainElement.querySelector('.slider-control-right');
      wrapperWidth = parseFloat(getComputedStyle(sliderWrapper).width);
      itemWidth = parseFloat(getComputedStyle(sliderItems[0]).width);
      positionLeftItem = 0;
      transform = 0;
      step = itemWidth / wrapperWidth * 100;
      items = [];
      visibleItems = Math.round(wrapperWidth / itemWidth);
      sliderItems.forEach(function (item, index) {
        items.push({
          item: item,
          position: index,
          transform: 0
        });
      });
    };

    var setUpListeners = function setUpListeners() {
      mainElement.addEventListener('click', controlClick);

      if (_config.pause && _config.isCycling) {
        mainElement.addEventListener('mouseenter', function () {
          clearInterval(interval);
        });
        mainElement.addEventListener('mouseleave', function () {
          clearInterval(interval);

          _cycle(_config.direction);
        });
      }

      document.addEventListener('visibilitychange', handleVisibilityChange, false);
      window.addEventListener('resize', function () {
        var _index = 0,
            width = parseFloat(document.body.clientWidth);
        states.forEach(function (item, index, arr) {
          if (width >= states[index].minWidth) _index = index;
        });

        if (_index !== getActive()) {
          setActive();
          refresh();
        }
      });
      mainElement.addEventListener('touchstart', function (e) {
        startX = e.changedTouches[0].clientX;
      });
      mainElement.addEventListener('touchend', function (e) {
        var endX = e.changedTouches[0].clientX,
            deltaX = endX - startX;

        if (deltaX > 50) {
          transformItem('left');
        } else if (deltaX < -50) {
          transformItem('right');
        }
      });
    };

    setUpListeners();

    if (document.visibilityState === 'visible') {
      _cycle(_config.direction);
    }

    setActive();
    return {
      right: function right() {
        transformItem('right');
      },
      left: function left() {
        transformItem('left');
      },
      stop: function stop() {
        _config.isCycling = false;
        clearInterval(interval);
      },
      cycle: function cycle() {
        _config.isCycling = true;
        clearInterval(interval);

        _cycle();
      }
    };
  };
}();

var slider = multiItemSlider('.slider', {// isCycling: true
});