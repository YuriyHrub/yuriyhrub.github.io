'use strict';
(function() {
// IE polifil --- .closest()
  if (!Element.prototype.closest) {
    Element.prototype.closest = function(css) {
      var node = this;

      while (node) {
        if (node.matches(css)) return node;
        else node = node.parentElement;
      }
      return null;
    };
  }

})();

(function() {
// IE polifil --- .matches()

  // проверяем поддержку
  if (!Element.prototype.matches) {

    // определяем свойство
    Element.prototype.matches = Element.prototype.matchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector;

  }

})();

window.onload = function() {
  if(document.documentElement.clientWidth >= 899) {
    
  var currentElement = null; //Активний елемент
  var currentClass; //Класс міняючий transition

  document.querySelectorAll('.works-item').forEach(function(item) {

    item.addEventListener('mouseover', function() {
      var target = event.target; //Елемент на який навели курсор
      
      if(!target.closest('.works-item')) return;
      
      if(currentElement) return;
        while(!target.classList.contains('works-item')) {
          target = target.parentElement;
        }
        currentElement = target;
        
        // те що необхідно зробити з елементом при наведенні
        if(!currentElement.querySelector('#item-overlay')) {
          var overlay = document.createElement('div');
          overlay.id = 'item-overlay';
          currentElement.appendChild(overlay)  
        }
        currentElement.classList.toggle('js-show-description')
        setTimeout(function() {
          currentElement.querySelector('#item-overlay').classList.add('item-overlay')
        }, 50);
    });  
  });

  document.querySelectorAll('.works-item').forEach(function(item){
    item.addEventListener('mouseout', function() {
      var target = event.target;
      var relatedElement = event.relatedTarget;
     
      if(target == null) return; //Якщо курсор приходить ззовні вікна
     
      if(!currentElement) return;
     
      if(!relatedElement) {
        // Якщо курсор виходить за межі браузера
        target = currentElement;
        target.classList.toggle('js-show-description');
        setTimeout(function() {
          target.removeChild(target.querySelector('#item-overlay'));
        }, 200);
        currentElement = null;
        return;
      }

      if(!relatedElement.closest('.works-item')) {
        // Якщо курсор виходить за межі works-item
        target = currentElement;
        target.classList.toggle('js-show-description')
        setTimeout(function() {
          target.removeChild(target.querySelector('#item-overlay'))
        }, 200);

        currentElement = null;
      }
    });
  })

    document.addEventListener('mousemove', function() {
      var target = event.target;
      var x = event.clientX + window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
      var y = event.clientY + window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;


      if(target.closest('.works-item')) {     
        var overlay = currentElement.querySelector('#item-overlay');
        var coords = getCoordsOnPage(currentElement);
        
        if(x - coords.left < y - coords.top && x - coords.left < coords.bottom - y) {
          if(currentClass !== 'l-to-r') {
            overlay.classList.remove(currentClass);
          }
          overlay.classList.add('l-to-r');
          currentClass = 'l-to-r';
        }
        if(y - coords.top < x - coords.left &&  y - coords.top < coords.right - x) {
          if(currentClass !== 't-to-b') {
            overlay.classList.remove(currentClass);
          }
          overlay.classList.add('t-to-b')
          currentClass = 't-to-b';
        }
        if(coords.bottom - y < x - coords.left && coords.bottom - y < coords.right - x) {
          if(currentClass !== 'b-to-t') {
            overlay.classList.remove(currentClass);
          }
          overlay.classList.add('b-to-t')
          currentClass = 'b-to-t';
        }
        if(coords.right - x < y - coords.top && coords.right - x < coords.bottom - y) {
          if(currentClass !== 'r-to-l') {
            overlay.classList.remove(currentClass);
          }
          overlay.classList.add('r-to-l')
          currentClass = 'r-to-l';
        }
      }
      
      // Hover ефект при наведении
      if(target.closest('.js-hover')) {
        niceHoverEfect(target, x, y);
      };
    });
  
  }

  document.addEventListener('click', function() {
    // Mobile menu
    if(event.target.closest('.menu-toggle')) {
      var mainMenu = document.querySelector('.main-menu');

      if(mainMenu.classList.contains('js-menu_hide')) {
        mainMenu.classList.remove('js-menu_hide');
        document.querySelector('.menu-toggle').classList.add('offset');
      }
      else {
        mainMenu.classList.add('js-menu_hide');
        document.querySelector('.menu-toggle').classList.remove('offset');
      }            
    }

    else if(!event.target.closest('.main-menu')) {
      document.querySelector('.main-menu').classList.add('js-menu_hide')
      document.querySelector('.menu-toggle').classList.remove('offset')
    }
    

  });
  
  copyProportions(document.querySelector('.event-img'));
}

window.addEventListener('resize', function(){
  copyProportions(document.querySelector('.event-img'));
});

function niceHoverEfect(elem, coordsX, coordsY) {
  // Отримує координати курсора і змінює позицію градіента
  // відповідно до нього
  var x = coordsX - getCoordsOnPage(elem).left;
  var y = coordsY - getCoordsOnPage(elem).top;
  elem.style.backgroundImage = 'radial-gradient(circle farthest-side at '+x+'px '+y+'px, gold, transparent)';
  elem.onmouseout = function(){
  // Відміняє ефект 
    elem.style.backgroundImage='';
  }
}

function copyProportions(originalElement) {
    // Копіюе розміри переданого originalElement
    var elem = document.querySelector('.event-show-more');
    elem.style.width = getComputedStyle(originalElement).width.slice();
    elem.style.height = getComputedStyle(originalElement).height.slice(); 
}

// Animate 
(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

function animate(options){
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


(function() {
  //Page scroll
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

function getCoordsOnPage(elem) {
  var box = elem.getBoundingClientRect();

  var html = document.documentElement;
  var body = document.body;
  
  var scrollTop = window.pageYOffset || html.scrollTop || body.scrollTop;
  var scrollLeft = window.pageXOffset || html.scrollLeft || body.scrollLeft;

  var clientTop = html.clientTop || body.clientTop || 0;
  var clientLeft = html.clientLeft || body.clientLeft || 0;

  return {
    top: box.top + scrollTop - clientTop,
    left: box.left + scrollLeft - clientLeft,
    bottom: box.bottom + scrollTop - clientTop,
    right : box.right + scrollLeft - clientLeft
  }
}

