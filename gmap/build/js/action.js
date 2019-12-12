'use strict';

function initMap() {
  var coords = {
    lat: 49.842957,
    lng: 24.031111
  };
  var markerIcon = 'src/img/location.svg'; //Путь прописывать от index.html

  var hideLabel = [{
    "elementType": "labels",
    "stylers": [{
      "visibility": "off"
    }]
  }, {
    "featureType": "road",
    "stylers": [{
      "visibility": "off"
    }]
  }];
  var roadHide = [{
    "featureType": "road",
    "stylers": [{
      "visibility": "off"
    }]
  }];
  var nightMap = [{
    "elementType": "geometry",
    "stylers": [{
      "color": "#242f3e"
    }]
  }, {
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#746855"
    }]
  }, {
    "elementType": "labels.text.stroke",
    "stylers": [{
      "color": "#242f3e"
    }]
  }, {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#d59563"
    }]
  }, {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#d59563"
    }]
  }, {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [{
      "color": "#263c3f"
    }]
  }, {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#6b9a76"
    }]
  }, {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [{
      "color": "#38414e"
    }]
  }, {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [{
      "color": "#212a37"
    }]
  }, {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#9ca5b3"
    }]
  }, {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [{
      "color": "#746855"
    }]
  }, {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [{
      "color": "#1f2835"
    }]
  }, {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#f3d19c"
    }]
  }, {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [{
      "color": "#2f3948"
    }]
  }, {
    "featureType": "transit.station",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#d59563"
    }]
  }, {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{
      "color": "#17263c"
    }]
  }, {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#515c6d"
    }]
  }, {
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": [{
      "color": "#17263c"
    }]
  }];
  var nightMapNotLabels = [{
    "elementType": "geometry",
    "stylers": [{
      "color": "#242f3e"
    }]
  }, {
    "elementType": "labels",
    "stylers": [{
      "visibility": "off"
    }]
  }, {
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#746855"
    }]
  }, {
    "elementType": "labels.text.stroke",
    "stylers": [{
      "color": "#242f3e"
    }]
  }, {
    "featureType": "administrative.land_parcel",
    "stylers": [{
      "visibility": "off"
    }]
  }, {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#d59563"
    }]
  }, {
    "featureType": "administrative.neighborhood",
    "stylers": [{
      "visibility": "off"
    }]
  }, {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#d59563"
    }]
  }, {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [{
      "color": "#263c3f"
    }]
  }, {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#6b9a76"
    }]
  }, {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [{
      "color": "#38414e"
    }]
  }, {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [{
      "color": "#212a37"
    }]
  }, {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#9ca5b3"
    }]
  }, {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [{
      "color": "#746855"
    }]
  }, {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [{
      "color": "#1f2835"
    }]
  }, {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#f3d19c"
    }]
  }, {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [{
      "color": "#2f3948"
    }]
  }, {
    "featureType": "transit.station",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#d59563"
    }]
  }, {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{
      "color": "#17263c"
    }]
  }, {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#515c6d"
    }]
  }, {
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": [{
      "color": "#17263c"
    }]
  }]; //Конструктор Map

  var map = new google.maps.Map(document.getElementById('map'), {
    center: coords,
    zoom: 15,
    mapTypeId: 'satellite',
    //тип карты
    disableDefaultUI: true,
    //отключение управления по умолчанию
    streetViewControl: true,
    nightMode: false,
    labelsIsHidden: true
  }); // Сздание контейнера для controlUI

  var zoomControl = document.createElement('div');
  var customZoom = new MakeControl({
    classList: ['custom-control', 'zoom-control'],
    html: "<span class=\"plus\">+</span><span class=\"minus\">-</span>",
    title: 'Zoom map'
  }, zoomControl, map);
  zoomControl.index = 1; // Добавление zoomControl на карту

  map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(zoomControl);
  zoomControl.addEventListener('click', function () {
    if (event.target.classList.contains('plus')) {
      map.setZoom(map.getZoom() + 1);
    } else {
      map.setZoom(map.getZoom() - 1);
    }
  });
  var navControl = document.createElement('div');
  var customNav = new MakeControl({
    classList: ['custom-control', 'nav-control'],
    html: "<img src=\"src/img/compass.svg\">",
    title: 'My coordinates'
  }, navControl, map);
  map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(navControl);
  navControl.addEventListener('click', function () {
    map.setCenter(coords);
  });
  var typeControl = document.createElement('div');
  var customType = new MakeControl({
    classList: ['custom-control', 'type-control'],
    html: "<div class=\"toggle\">\n            <div class=\"roadmap\">Roadmap</div>\n            <div class=\"satellite\">Satelite</div>\n            <div class=\"night-map\">Night mode</div>\n            <div class=\"label\">Labels</div>\n           </div>",
    title: 'Togle map type'
  }, typeControl, map);
  map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(typeControl);
  console.log("map type: ".concat(map.getMapTypeId(), ", labelsIsHidden: ").concat(map.labelsIsHidden, ", nightMode: ").concat(map.nightMode));
  typeControl.addEventListener('click', function () {
    if (event.target.classList.contains('roadmap')) {
      if (map.labelsIsHidden) {
        if (map.nightMode) {
          map.setOptions({
            styles: hideLabel,
            nightMode: false
          });
        } else {
          map.setOptions({
            mapTypeId: 'roadmap',
            styles: hideLabel
          });
        }
      } else {
        // If labels not hidden
        if (map.nightMode) {
          map.setOptions({
            styles: [],
            nightMode: false
          });
        } else {
          map.setMapTypeId('roadmap');
        }
      }
    } else if (event.target.classList.contains('satellite')) {
      if (map.labelsIsHidden) {
        if (map.nightMode) {
          map.setMapTypeId('satellite');
          map.nightMode = false;
        } else {
          map.setMapTypeId('satellite');
        }
      } else {
        //if labels not hidden
        if (map.nightMode) {
          map.setOptions({
            mapTypeId: 'hybrid',
            styles: [],
            nightMode: false
          });
        } else {
          map.setMapTypeId('hybrid');
        }
      }
    } else if (event.target.classList.contains('night-map')) {
      if (map.labelsIsHidden) {
        map.setOptions({
          mapTypeId: 'roadmap',
          styles: nightMapNotLabels,
          nightMode: true,
          labelsIsHidden: true
        });
      } else {
        map.setOptions({
          mapTypeId: 'roadmap',
          styles: nightMap,
          nightMode: true,
          labelsIsHiden: false
        });
      }
    } else {
      // click on the label button
      if (map.labelsIsHidden) {
        if (map.getMapTypeId() === 'satellite') {
          map.setOptions({
            mapTypeId: 'hybrid',
            styles: []
          });
          map.labelsIsHidden = false;
        } else if (map.getMapTypeId() === 'roadmap' && !map.nightMode) {
          map.setOptions({
            styles: []
          });
          map.labelsIsHidden = false;
        } else {
          //when nightMode
          map.setOptions({
            styles: nightMap,
            labelsIsHidden: false
          });
        }
      } else {
        // If labels is visible
        if (map.getMapTypeId() === 'hybrid') {
          map.setMapTypeId('satellite');
          map.labelsIsHidden = true;
        } else if (map.getMapTypeId() === 'roadmap' && !map.nightMode) {
          map.setOptions({
            styles: hideLabel
          });
          map.labelsIsHidden = true;
        } else {
          map.setOptions({
            styles: nightMapNotLabels,
            labelsIsHidden: true
          });
        }
      }
    }
  });
  var html = "<img src=\"src/img/location.svg\">\n              <p>Lviv, Ukraine</p>";
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
  };

  MyOverlay.prototype.draw = function () {
    var projection = this.getProjection();
    var sw = projection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
    var ne = projection.fromLatLngToDivPixel(this.bounds_.getNorthEast());
    var div = this.div_;
    div.style.left = sw.x + 'px';
    div.style.top = ne.y + 'px';
  };
} //End mapInit


function MakeControl(option, controlDiv, map, handler) {
  // Создание кнопки
  var controlUI = document.createElement('div');

  for (var i = 0; i < option.classList.length; i++) {
    controlUI.classList.add(option.classList[i]);
  }

  controlUI.innerHTML = option.html;
  controlUI.title = option.title;
  controlDiv.appendChild(controlUI);
}

window.addEventListener('load', function () {
  var toggle = document.querySelector('.popup-btn');
  var dialog = document.querySelector('.popup');
  toggle.addEventListener('click', function () {
    dialog.classList.toggle('popup-hide');
  });
});
window.initMap = initMap;