'use strict';

(function () {
  var _elements;

  var elements = (_elements = {
    image_groups: document.querySelectorAll('.__image_wrapper'),
    image_holders: document.querySelectorAll('.__cross-fade'),
    image: document.querySelectorAll('.__image'),
    copyright: document.querySelector('#copy_date'),
    title_one: document.querySelector('.one'),
    title_two: document.querySelector('.two'),
    title_three: document.querySelector('.three'),
    image_info: document.querySelectorAll('.__image_info'),
    info: document.querySelector('.__info'),
    close: document.querySelector('#close'),
    title: document.querySelectorAll('.__title'),
    description: document.querySelector('.__description')
  }, _elements['title'] = document.querySelectorAll('.__title'), _elements.rotate = document.querySelector('.__title_rotate'), _elements.blink_mail = document.querySelectorAll('.blink_mail'), _elements.negative = document.querySelectorAll('.__negative'), _elements.safari = document.querySelector('.__safari_layer'), _elements);

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

  var app = {
    init: function init() {
      data.get();
      eventListeners.init();
      layout.init();
      this.IsSafari();
      setTimeout(function () {
        elements.info.style.opacity = 1;
      }, 50);
    },
    IsSafari: function IsSafari() {
      var ua = navigator.userAgent.toLowerCase();
      if (ua.indexOf('safari') != -1) {
        if (ua.indexOf('chrome') > -1) {
          config.timeOut = 0;
        } else {
          console.log(ua.indexOf('mobile'));
          if (ua.indexOf('mobile') != -1) {
            elements.safari.style.display = 'none';
          } else {
            elements.safari.style.display = 'block';
            config.timeOut = 1200;
          }
        }
      }
    }
  };

  var data = {
    get: function get() {
      var request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          var _data = JSON.parse(request.responseText);
          config.allData = _data;
        }
        data.makeArray();
      };
      request.open("GET", "http://studio-orphee.eu/images", true);
      request.send();
    },
    makeArray: function makeArray() {
      for (var key in config.allData.images) {
        config.imageArray.push(key);
      }
      this.shuffleArray(config.imageArray);
    },
    shuffleArray: function shuffleArray(array) {
      array.forEach(function (image, index) {
        var j = Math.floor(Math.random() * index);
        var _ref = [array[j], array[index]];
        array[index] = _ref[0];
        array[j] = _ref[1];
      });
      if (array.length) {
        config.imageArray = array;
        images.init();
      }
    }
  };

  var images = {
    init: function init() {
      var imageArray = config.imageArray;
      for(var i = 0; i < elements.image_holders.length; i++) {
        elements.image_holders[i].src = '' + config.imageUrl + imageArray[i];
        config.atImage++;
      }
      elements.negative.forEach(function (image, index) {
        var source = imageArray[index].replace('.1', '.2');
        image.src = '' + config.imageUrl + source;
      });
      var source = elements.image_groups[0].childNodes[1].src;
      var source_length = source.length;
      var description = source.substr(source_length - 8, source_length);
      elements.description.textContent = config.allData.images[description];
      config.imageArray = imageArray;
      this.startInterval();
    },
    startInterval: function startInterval() {
      setTimeout(function () {
        elements.image_groups[0].style.opacity = 1;
        elements.safari.style.display = 'none';
      }, config.timeOut);
      elements.image.forEach(function (image) {
        image.style.opacity = 1;
      });
      clearInterval(imageInterval);
      imageInterval = setInterval(images.crossFadeImage, config.interval);
    },
    crossFadeImage: function crossFadeImage() {
      var actual = config.actualImage;
      var next = actual + 1;
      if (config.actualImage === 0) {
        images.changeRest();
      }
      if (config.atImage >= config.imageArray.length - 1) {
        clearInterval(imageInterval);
        config.atImage = 1;
        images.init();
      }
      config.actualImage++;
      if (config.actualImage > 4) {
        config.actualImage = 0;
        elements.image_groups[actual].style.opacity = 0;
        elements.image_groups[config.actualImage].style.opacity = 1;
        var source = elements.image_groups[config.actualImage].childNodes[1].src;
        var source_length = source.length;
        var description = source.substr(source_length - 8, source_length);
        elements.description.textContent = config.allData.images[description];
      } else {
        if (config.actualImage > 2) {
          images.changeFirstThree();
        }
        elements.image_groups[actual].style.opacity = 0;
        elements.image_groups[next].style.opacity = 1;
        var _source = elements.image_groups[config.actualImage].childNodes[1].src;
        var _source_length = _source.length;
        var _description = _source.substr(_source_length - 8, _source_length);
        elements.description.textContent = config.allData.images[_description];
      }
    },
    changeFirstThree: function changeFirstThree() {
      var atImage = config.atImage;
      elements.image_holders.forEach(function (image, index) {
        if (index < 2) {
          var actualIndex = index + config.atImage;
          if (config.imageArray[actualIndex] != undefined) {
            image.src = '' + config.imageUrl + config.imageArray[actualIndex];
          } else {
            image.src = config.imageUrl + '06.1.jpg';
          }
          config.atImage++;
        }
      });
      config.atImage = atImage;
      elements.negative.forEach(function (image, index) {
        if (index < 2) {
          var actualIndex = index + config.atImage;
          if (config.imageArray[actualIndex]) {
            var source = config.imageArray[actualIndex].replace('.1', '.2');
            image.src = '' + config.imageUrl + source;
            config.atImage++;
          }
        }
      });
    },
    changeRest: function changeRest() {
      var atImage = config.atImage;
      elements.image_holders.forEach(function (image, index) {
        if (index >= 2) {
          var actualIndex = index + config.atImage;
          if (config.imageArray[actualIndex] != undefined) {
            image.src = '' + config.imageUrl + config.imageArray[actualIndex];
          } else {
            image.src = config.imageUrl + '08.1.jpg';
          }
          config.atImage++;
        }
      });
      config.atImage = atImage;
      elements.negative.forEach(function (image, index) {
        if (index >= 2) {
          var actualIndex = index + config.atImage;
          if (config.imageArray[actualIndex]) {
            var source = config.imageArray[actualIndex].replace('.1', '.2');
            image.src = '' + config.imageUrl + source;
            config.atImage++;
          }
        }
      });
    }
  };

  var layout = {
    init: function init() {
      elements.rotate.style.color = 'black';
      elements.blink_mail.forEach(function (blink) {
        blink.style.color = 'black';
      });
      this.changeTitle();
      this.setCopyright();
      var blinkInterval = setInterval(layout.blinkMail, 750);
      var rotateInterval = setInterval(layout.rotateTitle, 750);
      var titleInterval = setInterval(layout.changeTitle, 750);
    },
    setCopyright: function setCopyright() {
      var date = new Date();
      var year = date.getFullYear();
      elements.copyright.textContent = year;
    },
    changeTitle: function changeTitle() {
      if (config.latestTitle === false) {
        config.latestTitle = 'one';
        elements.title_three.style.opacity = 0;
        elements.title_one.style.opacity = 1;
      } else if (config.latestTitle === 'one') {
        config.latestTitle = 'two';
        elements.title_one.style.opacity = 0;
        setTimeout(function () {
          elements.title_two.style.opacity = 1;
        }, 50);
      } else {
        config.latestTitle = false;
        elements.title_two.style.opacity = 0;
        setTimeout(function () {
          elements.title_three.style.opacity = 1;
        }, 50);
      }
    },
    rotateTitle: function rotateTitle() {
      if (elements.rotate.style.color == 'black') {
        elements.rotate.style.opacity = 0;
        elements.rotate.style.color = '#00FF24';
        setTimeout(function () {
          elements.rotate.style.opacity = 1;
        }, 50);
      } else {
        elements.rotate.style.color = 'black';
      }
    },
    blinkMail: function blinkMail() {
      elements.blink_mail.forEach(function (blink) {
        if (blink.style.color == 'black') {
          blink.style.color = '#00FF24';
        } else {
          blink.style.color = 'black';
        }
      });
    }
  };

var eventListeners = {
    init: function init() {
      for(var i = 0; i < elements.image.length; i++) {
        elements.image[i].addEventListener("click", eventListeners.goToNext);
      }
      elements.title.forEach(function (title) {
        title.addEventListener("click", eventListeners.openInfo);
      });
      elements.close.addEventListener("click", eventListeners.closeInfo);
    },
    goToNext: function goToNext() {
      clearInterval(imageInterval);
      images.crossFadeImage();
      imageInterval = setInterval(images.crossFadeImage, config.interval);
    },
    openInfo: function openInfo() {
      elements.image_holders.forEach(function (image, index) {
        image.style.display = 'none';
      });
      elements.negative.forEach(function (image, index) {
        image.style.display = 'block';
      });
      elements.title.forEach(function (title) {
        title.style.display = 'none';
      });
      elements.image_info[0].style.display = 'none';
      elements.info.style.display = 'block';
      elements.info.style.zIndex = 10000000000;
      document.body.style.backgroundColor = 'white';
    },
    closeInfo: function closeInfo() {
      elements.image_holders.forEach(function (image, index) {
        image.style.display = 'block';
      });
      elements.negative.forEach(function (image, index) {
        image.style.display = 'none';
      });
      elements.title.forEach(function (title) {
        title.style.display = 'block';
      });
      elements.image_info[0].style.display = 'block';
      elements.info.style.display = 'none';
      elements.info.style.zIndex = -100000;
      document.body.style.backgroundColor = 'black';
    }
  };

  app.init();
})();
