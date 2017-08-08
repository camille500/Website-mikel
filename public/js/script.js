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
  }

  const config = {
    allData: {},
    imageArray: [],
    negativeArray: [],
    normalArray: [],
    atImage: 0,
    actualImage: 0,
    interval: 5000,
    imageUrl: 'http://localhost:3000/dist/images/',
    oldUrl: '/dist/images/',
    replaceCount: 0,
    actualShown: false
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
        config.normalArray = array;
        data.makeNegativeArray(array);
        images.init(array);
      }
    },
    makeNegativeArray(array) {
      array.forEach(function(item) {
        item = item.replace('.1', '.2');
        config.negativeArray.push(item);
      })
    }
  }

  const images = {
    init(imageArray) {
      elements.image_holders.forEach(function(image, index) {
        image.src = `${config.oldUrl}${imageArray[index]}`;
        config.atImage ++;
      });
      elements.image_groups[0].style.opacity = 1;
      const source = elements.image_groups[0].childNodes[1].src
      const source_length = source.length;
      const description = source.substr(source_length - 8, source_length);
      elements.description.textContent = config.allData.images[description];
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
      elements.image_holders.forEach(function(image, index) {
        if(index < 2) {
          let actualIndex = index + config.atImage;
          image.src = `${config.oldUrl}${config.imageArray[actualIndex]}`;
          config.atImage ++;
        }
      });
    },
    changeRest() {
      elements.image_holders.forEach(function(image, index) {
        if(index >= 2) {
          let actualIndex = index + config.atImage;
          image.src = `${config.oldUrl}${config.imageArray[actualIndex]}`;
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
        image.src = image.src.replace('.1', '.2');
      });
      config.imageArray = config.negativeArray;
      elements.info.style.display = 'block';
      elements.info.style.zIndex = 100000;
      document.body.style.backgroundColor = 'white';
    },
    closeInfo() {
      elements.image_holders.forEach(function(image, index) {
        image.src = image.src.replace('.2', '.1');
      });
      config.imageArray = config.normalArray;
      elements.info.style.display = 'none';
      elements.info.style.zIndex = -100000;
      document.body.style.backgroundColor = 'black';
    }
  }

  app.init();

})();
