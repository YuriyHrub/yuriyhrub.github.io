'use strict';

// Animate 
(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();
function animate(options) {
  var start = performance.now();

  requestAnimationFrame( function animate(time) {
    var timeFraction = (time - start) / options.duration;

    if(timeFraction > 1) timeFraction = 1;

    var progress = options.timing(timeFraction);

    options.draw(progress);

    if(timeFraction < 1) {
      requestAnimationFrame(animate)
    }
  })
};



// Mobile menu
;(function() {

  var menu = document.getElementById('menu'),
  menuToggle = document.querySelector('.menu-toggle');

  document.addEventListener('click', function(event) {
    var elem = event.target;


    if(menu.classList.contains('menu_show')) {
      menu.classList.remove('menu_show');
      menuToggle.classList.remove('toggle-on');
    } else if(!elem.closest('.menu-toggle')) {
      return;

    } else {
      menu.classList.add('menu_show');
      menuToggle.classList.add('toggle-on');
    }

  });
})();

// Fixed menu
(function() {

  var html = document.documentElement,
  header = document.querySelector('.header'),
  scrollTop;

  document.addEventListener('scroll', function() {

    if(document.documentElement.clientWidth < 600) {
      return;
    }

    scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if(scrollTop) {
      header.classList.add('j-header-fixed');
    } else {
      header.classList.remove('j-header-fixed');
    };
  });
})();

// Scrolling

(function() {
  document.addEventListener('click', function() {
    if(event.target.closest('[href^="#"]')) {
      event.preventDefault();

      var html = document.documentElement,
      sectionId = event.target.getAttribute('href').slice(1),
      coordY = document.getElementById(sectionId).getBoundingClientRect().top,
      scrollTop = html.scrollTop;

        animate({
        duration: 500,
        timing: function(timeFraction){
          return timeFraction;
        },
        draw: function(progress) {
          progress = progress * 100;
          html.scrollTop = scrollTop + progress * (coordY / 100);
        }
      });
    }

  });
})();

// Google maps

function initMap() {
  var bridge = {
    lat: 48.857963,
    lng:  2.342561
  }
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: bridge,
    disableDefaultUI: true,
    styles: [
    {
      "elementType": "geometry.stroke",
      "stylers": [
      {
        "visibility": "off"
      }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
      {
        "color": "#5d5d5d"
      },
      {
        "visibility": "simplified"
      }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
      {
        "color": "#eeeeee"
      }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
      {
        "visibility": "off"
      }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "labels",
      "stylers": [
      {
        "visibility": "off"
      }
      ]
    },
    {
      "featureType": "landscape.man_made",
      "elementType": "geometry",
      "stylers": [
      {
        "color": "#282828"
      }
      ]
    },
    {
      "featureType": "poi.attraction",
      "elementType": "geometry",
      "stylers": [
      {
        "visibility": "off"
      }
      ]
    },
    {
      "featureType": "poi.business",
      "elementType": "geometry",
      "stylers": [
      {
        "visibility": "off"
      }
      ]
    },
    {
      "featureType": "poi.business",
      "elementType": "labels",
      "stylers": [
      {
        "visibility": "off"
      }
      ]
    },
    {
      "featureType": "poi.medical",
      "stylers": [
      {
        "visibility": "off"
      }
      ]
    },
    {
      "featureType": "poi.park",
      "stylers": [
      {
        "visibility": "off"
      }
      ]
    },
    {
      "featureType": "poi.place_of_worship",
      "stylers": [
      {
        "visibility": "off"
      }
      ]
    },
    {
      "featureType": "poi.school",
      "stylers": [
      {
        "visibility": "off"
      }
      ]
    },
    {
      "featureType": "road.arterial",
      "stylers": [
      {
        "color": "#383838"
      }
      ]
    },
    {
      "featureType": "road.local",
      "stylers": [
      {
        "color": "#383838"
      }
      ]
    },
    {
      "featureType": "transit.station",
      "stylers": [
      {
        "visibility": "off"
      }
      ]
    },
    {
      "featureType": "transit.station.bus",
      "stylers": [
      {
        "visibility": "off"
      }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
      {
        "color": "#004044"
      }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels",
      "stylers": [
      {
        "visibility": "off"
      }
      ]
    }
    ]
  });
}




