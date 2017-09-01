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
    negative = document.getElementsByClassName('__negative'),
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
  getData();
  // initializeEventListeners();
  // initializeLayout();
  var wrap = document.getElementsByClassName('__image_wrapper');
  var image = document.getElementsByClassName('__image');
  for(var i = 0; i < wrap.length; i++) {
    wrap[i].classList.add('testing')
  }
  for(var i = 0; i < image.length; i++) {
    image[i].classList.add('testing');
  }
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
  for(var i = 0; i < negative.length; i++) {
    var source = imageArray[i].replace('.1', '.2');
    negative[i].src = config.imageUrl + source;
  }
  var source = image_groups[0].childNodes[1].src;
  var source_length = source.length;
  var description = source.substr(source_length - 8, source_length);
  description.textContent = config.allData.images[description];
  config.imageArray = imageArray;
  startImageInterval();
}

function startImageInterval() {
  setTimeout(function() {
    console.log('Fired')
    image_groups[0].classList.remove = 'testing';
    safari.style.display = 'none';
  }, config.timeOut);
  for(var i = 0; i < image.length; i++) {
    image[i].classList.remove('testing');
  }
  clearInterval(imageInterval);
  imageInterval = setInterval(crossFadeImages, config.interval);
}

function crossFadeImages() {
  var actual = config.actualImage;
  var next = actual + 1;
  if(config.actualImage === 0) {
    changeRestOfImages();
  }
  if(config.atImage >= (config.imageArray.length - 1)) {
    clearInterval(imageInterval);
    config.atImage = 1;
    initializeImages();
  }
  config.actualImage ++;
  if(config.actualImage > 4) {
    config.actualImage = 0;
    image_groups[actual].classList.remove('testing')
    image_groups[config.actualImage].classList.add('testing');
    var source = image_groups[config.actualImage].childNodes[1].src
    var source_length = source.length;
    var description = source.substr(source_length - 8, source_length);
    description.textContent = config.allData.images[description];
  } else {
    if(config.actualImage > 2) {
      changeFirstThreeImages();
    }
    image_groups[actual].classList.remove('testing')
    image_groups[next].classList.add('testing')
    var source = image_groups[config.actualImage].childNodes[1].src
    var source_length = source.length;
    var description = source.substr(source_length - 8, source_length);
    description.textContent = config.allData.images[description];
  }
}

function changeFirstThreeImages() {
  // KOMT NOG
}

function changeRestOfImages() {
  // KOMT NOG
}



initApplication();
