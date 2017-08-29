(function() {

  const elements = {
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
    description: document.querySelector('.__description'),
    title: document.querySelectorAll('.__title'),
    rotate: document.querySelector('.__title_rotate'),
    blink_mail: document.querySelectorAll('.blink_mail'),
    negative: document.querySelectorAll('.__negative'),
    safari: document.querySelector('.__safari_layer')
  }

  const config = {
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

  let imageInterval = false;

  const app = {
    init() {
      data.get();
      eventListeners.init();
      layout.init();
      this.IsSafari();
      setTimeout(function() {
        elements.info.style.opacity = 1;
      }, 50)
    },
    IsSafari() {
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
  }


  const data = {
    get() {
      const request = new XMLHttpRequest();
      request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          let data = JSON.parse(request.responseText);
          config.allData = data;
        }
        data.makeArray();
      };
      request.open("GET", "http://studio-orphee.eu/images", true);
      request.send();
    },
    makeArray() {
      for (let key in config.allData.images) {
        config.imageArray.push(key);
      }
      this.shuffleArray(config.imageArray);
    },
    shuffleArray(array) {
      array.forEach(function(image, index) {
        let j = Math.floor(Math.random() * index);
        [array[index], array[j]] = [array[j], array[index]];
      });
      if (array.length) {
        config.imageArray = array;
        images.init();
      }
    }
  }

  const images = {
    init() {
      const imageArray = config.imageArray;
      elements.image_holders.forEach(function(image, index) {
        image.src = `${config.imageUrl}${imageArray[index]}`;
        config.atImage ++;
      });
      elements.negative.forEach(function(image, index) {
        const source = imageArray[index].replace('.1', '.2');
        image.src = `${config.imageUrl}${source}`;
      });
      const source = elements.image_groups[0].childNodes[1].src
      const source_length = source.length;
      const description = source.substr(source_length - 8, source_length);
      elements.description.textContent = config.allData.images[description];
      config.imageArray = imageArray;
      this.startInterval();
    },
    startInterval() {
      setTimeout(function() {
        elements.image_groups[0].style.opacity = 1;
        elements.safari.style.display = 'none';
      }, config.timeOut)
      elements.image.forEach(function(image) {
        image.style.opacity = 1;
      })
      clearInterval(imageInterval);
      imageInterval = setInterval(images.crossFadeImage, config.interval);
    },
    crossFadeImage() {
      const actual = config.actualImage;
      const next = actual + 1;
      if(config.actualImage === 0) {
        images.changeRest();
      }
      if(config.atImage >= (config.imageArray.length - 1)) {
        clearInterval(imageInterval);
        config.atImage = 1;
        images.init();
      }
      config.actualImage ++;
      if(config.actualImage > 4) {
        config.actualImage = 0;
        elements.image_groups[actual].style.opacity = 0;
        elements.image_groups[config.actualImage].style.opacity = 1;
        const source = elements.image_groups[config.actualImage].childNodes[1].src
        const source_length = source.length;
        const description = source.substr(source_length - 8, source_length);
        elements.description.textContent = config.allData.images[description];
      } else {
        if(config.actualImage > 2) {
          images.changeFirstThree();
        }
        elements.image_groups[actual].style.opacity = 0;
        elements.image_groups[next].style.opacity = 1;
        const source = elements.image_groups[config.actualImage].childNodes[1].src
        const source_length = source.length;
        const description = source.substr(source_length - 8, source_length);
        elements.description.textContent = config.allData.images[description];
      }
    },
    changeFirstThree() {
      const atImage = config.atImage;
      elements.image_holders.forEach(function(image, index) {
        if(index < 2) {
          let actualIndex = index + config.atImage;
          if(config.imageArray[actualIndex] != undefined) {
            image.src = `${config.imageUrl}${config.imageArray[actualIndex]}`;
          } else {
            image.src = `${config.imageUrl}06.1.jpg`;
          }
          config.atImage ++;
        }
      });
      config.atImage = atImage;
      elements.negative.forEach(function(image, index) {
        if(index < 2) {
          let actualIndex = index + config.atImage;
          if(config.imageArray[actualIndex]) {
            const source = config.imageArray[actualIndex].replace('.1', '.2');
            image.src = `${config.imageUrl}${source}`;
            config.atImage ++;
          }
        }
      });
    },
    changeRest() {
      let atImage = config.atImage;
      elements.image_holders.forEach(function(image, index) {
        if(index >= 2) {
          let actualIndex = index + config.atImage;
          if(config.imageArray[actualIndex] != undefined) {
            image.src = `${config.imageUrl}${config.imageArray[actualIndex]}`;
          } else {
            image.src = `${config.imageUrl}08.1.jpg`;
          }
          config.atImage ++;
        }
      });
      config.atImage = atImage;
      elements.negative.forEach(function(image, index) {
        if(index >= 2) {
          let actualIndex = index + config.atImage;
          if(config.imageArray[actualIndex]) {
            const source = config.imageArray[actualIndex].replace('.1', '.2');
            image.src = `${config.imageUrl}${source}`;
            config.atImage ++;
          }
        }
      });
    }
  };

  const layout = {
    init() {
      elements.rotate.style.color = 'black';
      elements.blink_mail.forEach(function(blink) {
        blink.style.color = 'black';
      })
      this.changeTitle();
      this.setCopyright();
      blinkInterval = setInterval(layout.blinkMail, 750);
      rotateInterval = setInterval(layout.rotateTitle, 750);
      titleInterval = setInterval(layout.changeTitle, 750);
    },
    setCopyright() {
      const date = new Date();
      const year = date.getFullYear();
      elements.copyright.textContent = year;
    },
    changeTitle() {
      if(config.latestTitle === false) {
        config.latestTitle = 'one';
        elements.title_three.style.opacity = 0;
        elements.title_one.style.opacity = 1;
      } else if(config.latestTitle === 'one') {
        config.latestTitle = 'two';
        elements.title_one.style.opacity = 0;
        setTimeout(function() {
          elements.title_two.style.opacity = 1;
        }, 50)
      } else {
        config.latestTitle = false;
        elements.title_two.style.opacity = 0;
        setTimeout(function() {
          elements.title_three.style.opacity = 1;
        }, 50)
      }
    },
    rotateTitle() {
      if(elements.rotate.style.color == 'black') {
        elements.rotate.style.opacity = 0;
        elements.rotate.style.color = '#ffffff';
        setTimeout(function() {
          elements.rotate.style.opacity = 1;
        }, 50)
      } else {
        elements.rotate.style.color = 'black';
      }
    },
    blinkMail() {
      elements.blink_mail.forEach(function(blink) {
        if(blink.style.color == 'black') {
          blink.style.color = '#00FF24';
        } else {
          blink.style.color = 'black';
        }
      })
    }
  }

  eventListeners = {
    init() {
      elements.image.forEach(function(image) {
        image.addEventListener("click", eventListeners.goToNext);
      });
      elements.title.forEach(function(title){
        title.addEventListener("click", eventListeners.openInfo);
      });
      elements.close.addEventListener("click", eventListeners.closeInfo);
    },
    goToNext() {
      clearInterval(imageInterval);
      images.crossFadeImage();
      imageInterval = setInterval(images.crossFadeImage, config.interval);
    },
    openInfo() {
      elements.image_holders.forEach(function(image, index) {
        image.style.display = 'none';
      });
      elements.negative.forEach(function(image, index) {
        image.style.display = 'block';
      });
      elements.title.forEach(function(title) {
        title.style.display = 'none';
      });
      elements.image_info[0].style.display = 'none';
      elements.info.style.display = 'block';
      elements.info.style.zIndex = 10000000000;
      document.body.style.backgroundColor = 'white';
    },
    closeInfo() {
      elements.image_holders.forEach(function(image, index) {
        image.style.display = 'block';
      });
      elements.negative.forEach(function(image, index) {
        image.style.display = 'none';
      });
      elements.title.forEach(function(title) {
        title.style.display = 'block';
      });
      elements.image_info[0].style.display = 'block';
      elements.info.style.display = 'none';
      elements.info.style.zIndex = -100000;
      document.body.style.backgroundColor = 'black';
    }
  }

  app.init();

})();
