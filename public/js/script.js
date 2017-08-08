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
  }

  const config = {
    allData: {},
    imageArray: [],
    atImage: 0,
    actualImage: 0,
    interval: 5000,
    imageUrl: 'http://localhost:3000/dist/images/',
    replaceCount: 0,
  };

  let imageInterval = false;

  const app = {
    init() {
      data.get();
      eventListeners.init();
      layout.init();
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
      request.open("GET", "https://site-mikel.herokuapp.com/images", true);
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
        images.init(array);
      }
    }
  }

  const images = {
    init(imageArray) {
      elements.image_holders.forEach(function(image, index) {
        image.src = `${config.imageUrl}${imageArray[index]}`;
        config.atImage ++;
      });
      elements.image_groups[0].style.opacity = 1;
      config.imageArray = imageArray;
      this.startInterval();
    },
    startInterval() {
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
      if(config.actualImage > 3) {
        config.actualImage = 0;
        elements.image_groups[actual].style.opacity = 0;
        elements.image_groups[config.actualImage].style.opacity = 1;
      } else {
        if(config.actualImage > 2) {
          images.changeFirstThree();
        }
        elements.image_groups[actual].style.opacity = 0;
        elements.image_groups[next].style.opacity = 1;
      }
    },
    changeFirstThree() {
      elements.image_holders.forEach(function(image, index) {
        if(index < 2) {
          let actualIndex = index + config.atImage;
          image.src = `${config.imageUrl}${config.imageArray[actualIndex]}`;
          config.atImage ++;
        }
      });
    },
    changeRest() {
      elements.image_holders.forEach(function(image, index) {
        if(index >= 2) {
          let actualIndex = index + config.atImage;
          image.src = `${config.imageUrl}${config.imageArray[actualIndex]}`;
          config.atImage ++;
        }
      });
    }
  };

  const layout = {
    init() {
      this.changeTitle();
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
  }

  eventListeners = {
    init() {
      elements.image.forEach(function(image) {
        image.addEventListener("click", eventListeners.goToNext);
      })
    },
    goToNext() {
      clearInterval(imageInterval);
      images.crossFadeImage();
      imageInterval = setInterval(images.crossFadeImage, config.interval);
    }
  }

  app.init();

})();
