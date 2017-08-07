(function () {

  const elements = {
    image_groups: document.querySelector('.__image_wrapper'),
    image_groups_next: document.querySelector('.__image_wrapper_next'),
    actual_normal: document.getElementById('actual_normal'),
    actual_negative: document.getElementById('actual_negative'),
    next_normal: document.getElementById('next_normal'),
    next_negative: document.getElementById('next_negative'),
  }

  const config = {
    allData: {},
    imageArray: [],
    actualImage: 1,
  };

  const app = {
    init() {
      data.get();
    },
    enhance() {

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
      request.open("GET", "http://site-mikel.herokuapp.com/images", true);
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
      imageInterval = setInterval(images.changeImage, 5000);
    },
    changeImage() {
      console.log(config.actualNumber)
      console.log(config.imageArray);
    }
  }


  app.init();

})();
