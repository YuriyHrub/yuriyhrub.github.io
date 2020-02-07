'use strict';
window.addEventListener('load', function() {
  let centralBlock = document.querySelector('.central-block'),
      wrapper      = document.querySelector('.wrapper'),
      blockWidth   = 1200,
      sidebarWidth = 250,
      leftBtn      = document.querySelector('.left-btn'),
      rightBtn     = document.querySelector('.right-btn');

  document.querySelectorAll('.sidebar').forEach(sidebar => sidebar.style.width = `${sidebarWidth}px`);
  document.addEventListener('click', function(event) {
    
    if(event.target.classList.contains('btn')) {
      let windowWidth  = document.documentElement.clientWidth,
      sidebar          = event.target.closest('.sidebar');

      if(windowWidth - sidebarWidth < blockWidth) {

        if(!sidebar.classList.contains('hidden')) {
          if(sidebar.classList.contains('left-sidebar')) {
            wrapper.style.marginLeft = '0px';
          } else { wrapper.style.marginRight = '0px'; }
        }
        else {
          if(sidebar.classList.contains('left-sidebar')) {
            wrapper.style.marginLeft = sidebarWidth + 'px';
          } else { wrapper.style.marginRight = sidebarWidth + 'px';}
        }
      }
      else if(centralBlock.offsetWidth + sidebarWidth === windowWidth) {
        wrapper.style.width = centralBlock.offsetWidth - sidebarWidth + 'px'
      }
      console.log(centralBlock.offsetWidth)

      sidebar.classList.toggle('hidden');
    }
  })

})
