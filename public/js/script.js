(function () {

  const elements = {
    image_groups: document.querySelector('.__image_wrapper'),
    image_groups_next: document.querySelector('.__image_wrapper_next'),
    actual_normal: document.getElementById('actual_normal'),
    actual_negative: document.getElementById('actual_negative'),
    next_normal: document.getElementById('next_normal'),
    next_negative: document.getElementById('next_negative'),
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
    actualImage: 1,
    interval: 5000,
    latestTitle: false
  };

  const app = {
    init() {
      data.get();
      eventListeners.init();
      this.setCopyright();
      this.changeTitle();
      titleInterval = setInterval(app.changeTitle, 750);
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
      for(let key in config.allData.images) {
        config.imageArray.push(key);
      }
      this.shuffleArray(config.imageArray);
    },
    shuffleArray(array) {
      array.forEach(function(image, index) {
        let j = Math.floor(Math.random() * index);
        [array[index], array[j]] = [array[j], array[index]];
      });
      if(array.length) {
        images.init(array);
      }
    }
  }

  images = {
    init(imageArray) {
      let negative = imageArray[config.actualImage].replace('.1', '.2');
      elements.actual_normal.src = `/dist/images/${imageArray[config.actualImage]}`;
      elements.actual_negative.src = negative;
      config.actualImage ++;
      negative = imageArray[config.actualImage].replace('.1', '.2');
      elements.next_normal.src = `/dist/images/${imageArray[config.actualImage]}`;
      elements.next_negative.src = negative;
      setTimeout(function(){
        elements.image_groups.style.opacity = 1;
      }, 500)
      config.imageArray = imageArray;
      this.startInterval();
    },
    startInterval() {
      imageInterval = setInterval(images.changeImage, config.interval);
    },
    changeImage() {
      if(config.actualImage < config.imageArray.length) {
        if(elements.image_groups.style.opacity == 0) {
          config.actualImage ++;
          images.replaceNext();
          elements.image_groups.style.opacity = 1;
          elements.image_groups_next.style.opacity = 0;
        } else if(elements.image_groups.style.opacity == 1) {
          config.actualImage ++;
          images.replaceActual();
          elements.image_groups.style.opacity = 0;
          elements.image_groups_next.style.opacity = 1;
        }
      } else {
        config.actualImage = 1;
      }
    },
    replaceActual() {
      setTimeout(function() {
        negative = config.imageArray[config.actualImage].replace('.1', '.2');
        elements.actual_normal.src = `/dist/images/${config.imageArray[config.actualImage]}`;
        elements.actual_negative.src = `/dist/images/${negative}`;
      }, 1600)
    },
    replaceNext() {
      setTimeout(function() {
        negative = config.imageArray[config.actualImage].replace('.1', '.2');
        elements.next_normal.src = `/dist/images/${config.imageArray[config.actualImage]}`;
        elements.next_negative.src = `/dist/images/${negative}`;
      }, 1600)
    }
  };

  eventListeners = {
    init() {
      elements.image.forEach(function(image){
        image.addEventListener("click", eventListeners.goToNext);
      })
    },
    goToNext() {
      clearInterval(imageInterval);
      images.changeImage();
      imageInterval = setInterval(images.changeImage, config.interval);
    }
  }


  app.init();

})();
