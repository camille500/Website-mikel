/* ELEMENTEN */
var image_groups = document.getElementsByClassName('__image_wrapper'),
    image_holders = document.getElementsByClassName('__cross-fade'),
    image = document.getElementsByClassName('__image'),
    copyright = document.getElementById('copy_date'),
    title_one = document.getElementsByClassName('one')[0],
    title_two = document.getElementsByClassName('two')[0],
    title_three = document.getElementsByClassName('three')[0],
    image_info = document.getElementsByClassName('__image_info'),
    info = document.getElementsByClassName('__info')[0],
    close = document.getElementById('close'),
    title = document.getElementsByClassName('__title'),
    description = document.getElementsByClassName('__description')[0],
    rotate = document.getElementsByClassName('__title_rotate')[0],
    blink_mail = document.getElementsByClassName('blink_mail'),
    negative = document.getElementsByClassName('negative'),
    safari = document.getElementsByClassName('__safari_layer')[0];

var config = {
  allData: {},
  imageArray: [],
  atImage: 0,
  actualImage: 0,
  interval: 6000,
  imageUrl: '/dist/images/',
  replaceCount: 0,
  actualShown: false,
  safari_check: false,
  timeOut: 0
};

var imageInterval = false;

function initApplication() {
  console.log(info)
  getData();
  // initializeEventListeners();
  // initializeLayout();
  checkForSafari();
  setTimeout(function() {
    info.style.opacity = 1;
  }, 50)
}

function checkForSafari() {
  var ua = navigator.userAgent.toLowerCase();
   if (ua.indexOf('safari') != -1) {
     if (ua.indexOf('chrome') > -1) {
       config.timeOut = 0;
     } else {
       console.log(ua.indexOf('mobile'))
       if(ua.indexOf('mobile') != -1) {
         elements.safari.style.display = 'none';
       } else {
         elements.safari.style.display = 'block';
         config.timeOut = 1200;
       }
     }
   }
}

function getData() {
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(request.responseText);
      config.allData = data;
    }
    console.log(data);
  };
  request.open("GET", "http://studio-orphee.eu/images", true);
  request.send();
}

initApplication();
