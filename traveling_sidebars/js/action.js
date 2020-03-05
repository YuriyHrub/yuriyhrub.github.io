'use strict';
window.addEventListener('load', function() {
  let mainBlock    = document.querySelector('.central-block'),
      wrapper      = document.querySelector('.wrapper'),
      blockWidth   = 1200,
      sidebarWidth = 250,
      leftBtn      = document.querySelector('.left-btn'),
      rightBtn     = document.querySelector('.right-btn');

  document.querySelectorAll('.sidebar').forEach(sidebar => sidebar.style.width = `${sidebarWidth}px`);
  wrapper.style.paddingLeft = leftBtn.offsetWidth + 'px';
  wrapper.style.paddingRight = rightBtn.offsetWidth + 'px';

  document.addEventListener('click', function(event) { 
    if(event.target.classList.contains('btn')) {
      
      let windowWidth  = document.documentElement.clientWidth,
          sidebar      = event.target.closest('.sidebar'),
          offset       = parseInt(getComputedStyle(mainBlock).marginLeft);

      if(offset >= 0 && offset <= sidebarWidth) {
  
        if(!sidebar.classList.contains('hidden')) {
          // when sidebar hidding
          sidebar.classList.contains('left-sidebar') ? 
            wrapper.style.marginLeft = 0 :
            //right bnt click
            wrapper.style.marginRight = 0;
        } else {
          sidebar.classList.contains('left-sidebar') ?
            wrapper.style.marginLeft = sidebarWidth + 'px' :
          // right btn click
            wrapper.style.marginRight = sidebarWidth + 'px';
        }
      }

    sidebar.classList.toggle('hidden');

    }
  })

})
