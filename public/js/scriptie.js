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
    makeDataArray();
  };
  request.open("GET", "http://studio-orphee.eu/images", true);
  request.send();
}

function makeDataArray() {
  for (var key in config.allData.images) {
    config.imageArray.push(key);
  }
  shuffleDataArray(config.imageArray);
}

function shuffleDataArray(array) {
  array.forEach(function(image, index) {
    var j = Math.floor(Math.random() * index);
    var _ref = [array[j], array[index]];
    array[index] = _ref[0];
    array[j] = _ref[1];
    _ref;
  });
  if (array.length) {
    console.log(array)
    config.imageArray = array;
    initializeImages();
  }
}

function initializeImages() {
  var imageArray = config.imageArray;
  for(var i = 0; i < image_holders.length; i++) {
    image_holders[i].src = config.imageUrl + imageArray[i];
    config.atImage ++;
  }
}

// elements.negative.forEach(function(image, index) {
//   const source = imageArray[index].replace('.1', '.2');
//   image.src = `${config.imageUrl}${source}`;
// });
// const source = elements.image_groups[0].childNodes[1].src
// const source_length = source.length;
// const description = source.substr(source_length - 8, source_length);
// elements.description.textContent = config.allData.images[description];
// config.imageArray = imageArray;
// this.startInterval();

initApplication();