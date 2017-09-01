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
  initializeEventListeners();
  initializeLayout();
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
         safari.style.display = 'none';
       } else {
         safari.style.display = 'block';
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
  image[0].classList.remove('testing');
  image_groups[0].classList.remove = 'testing';
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
    var check = image_groups[actual].classList;
    if(check.indexOf('testing') != -1) {
      image_groups[actual].classList.remove('testing')
    }
    image_groups[next].classList.add('testing')
    var source = image_groups[config.actualImage].childNodes[1].src
    var source_length = source.length;
    var description = source.substr(source_length - 8, source_length);
    description.textContent = config.allData.images[description];
  }
}

function changeFirstThreeImages() {
  var atImage = config.atImage;
  for(var i = 0; i < image_holders.length; i++) {
    if(i < 2) {
      var actualIndex = i + config.atImage;
      if(config.imageArray[actualIndex] != undefined) {
        image_holders[i].src = config.imageUrl + config.imageArray[actualIndex];
      } else {
        image_holders[i].src = config.imageUrl + '06.1.jpg';
      }
      config.atImage ++;
    }
  }
  config.atImage = atImage;
  for(var i = 0; i < negative.length; i++) {
    if(i < 2) {
      var actualIndex = i + config.atImage;
      if(config.imageArray[actualIndex]) {
        var source = config.imageArray[actualIndex].replace('.1', '.2');
        negative[i].src = config.imageUrl + source;
        config.atImage ++;
      }
    }
  }
}

function changeRestOfImages() {
  var atImage = config.atImage;
  for (var i = 0; i < image_holders.length; i++) {
    if(i >= 2) {
      let actualIndex = i + config.atImage;
      if(config.imageArray[actualIndex] != undefined) {
        image_holders[i].src = config.imageUrl + config.imageArray[actualIndex];
      } else {
        image_holders[i].src = config.imageUrl + '08.1.jpg';
      }
      config.atImage ++;
    }
  }
  config.atImage = atImage;
  for(var i = 0; i < negative.length; i++) {
    if(i >= 2) {
      let actualIndex = i + config.atImage;
      if(config.imageArray[actualIndex]) {
        var source = config.imageArray[actualIndex].replace('.1', '.2');
        negative[i].src = config.imageUrl + source;
        config.atImage ++;
      }
    }
  }
}

function initializeLayout() {
  rotate.style.color = 'black';
  for(var i = 0; i < blink_mail.length; i++) {
    blink_mail[i].style.color = 'black';
  }
  changeTitle();
  setCopyright();
  blinkInterval = setInterval(blinkMail, 750);
  rotateInterval = setInterval(rotateTitle, 750);
  titleInterval = setInterval(changeTitle, 750);
}

function setCopyright() {
  var date = new Date();
  var year = date.getFullYear();
  copyright.textContent = year;
}

function blinkMail() {
  for(var i = 0; i < blink_mail.length; i++) {
    if(blink_mail[i].style.color == 'black') {
      blink_mail[i].style.color = '#00FF24';
    } else {
      blink_mail[i].style.color = 'black';
    }
  }
}

function rotateTitle() {
  if(rotate.style.color == 'black') {
    rotate.style.opacity = 0;
    rotate.style.color = '#ffffff';
    setTimeout(function() {
      rotate.style.opacity = 1;
    }, 50)
  } else {
    rotate.style.color = 'black';
  }
}

function changeTitle() {
  if(config.latestTitle === false) {
    config.latestTitle = 'one';
    title_three.style.opacity = 0;
    title_one.style.opacity = 1;
  } else if(config.latestTitle === 'one') {
    config.latestTitle = 'two';
    title_one.style.opacity = 0;
    setTimeout(function() {
      title_two.style.opacity = 1;
    }, 50)
  } else {
    config.latestTitle = false;
    title_two.style.opacity = 0;
    setTimeout(function() {
      title_three.style.opacity = 1;
    }, 50)
  }
}

function initializeEventListeners() {
  for(var i = 0; i < image.length; i++) {
    image[i].addEventListener("click", goToNext);
  }
  for(var i = 0; i < title.length; i++) {
    title[i].addEventListener("click", openInfo);
  }
  close.addEventListener("click", closeInfo);
}

function goToNext() {
  clearInterval(imageInterval);
  crossFadeImage();
  imageInterval = setInterval(crossFadeImages, config.interval);
}

function openInfo() {
  for(var i = 0; i < image_holders.length; i++) {
    image_holders[i].style.display = 'none';
  }
  for(var i = 0; i < negative.length; i++) {
    negative[i].style.display = 'none';
  }
  for(var i = 0; i < title.length; i++) {
    title[i].style.display = 'none';
  }
  image_info[0].style.display = 'none';
  info.style.display = 'block';
  info.style.zIndex = 10000000000;
  document.body.style.backgroundColor = 'white';
}

function closeInfo() {
  for(var i = 0; i < image_holders.length; i++) {
    image_holders[i].style.display = 'block';
  }
  for(var i = 0; i < negative.length; i++) {
    negative[i].style.display = 'none';
  }
  for(var i = 0; i < title.length; i++) {
    title[i].style.display = 'block';
  }
  image_info[0].style.display = 'block';
  info.style.display = 'none';
  info.style.zIndex = -100000;
  document.body.style.backgroundColor = 'black';
}

initApplication();
