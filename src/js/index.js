const page = require('page')
document.computer = true

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  document.computer = false
}

document.addEventListener('touchstart', {}, {passive: true});
document.addEventListener('mousewheel', {}, {passive: true});
document.addEventListener('touchmove', {}, {passive: true});

history.pushState(null, null, location.href);

window.onpopstate = function () {
    history.go(1);
};

page.base('/#!')
require('./home')
page()
