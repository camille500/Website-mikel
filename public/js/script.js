(function () {

  const elements = {
    image_groups: document.querySelectorAll('.__image_wrapper'),
    image: document.querySelectorAll('.__image'),
    info: document.querySelector('.__info'),
    close: document.querySelector('#close'),
    title: document.querySelector('.__title'),
    copyright: document.querySelector('#copy_date'),
    image: document.querySelectorAll('.__clickable'),
    about: document.querySelector('.__about_title'),
  }

  let imageInterval = false;
  let negativeInterval = false;
  let actualNumber = false;
  latestNumber = false;
  let allLatest = [];

  const app = {
    init() {
      images.init();
      eventListeners.init();
      this.setCopyright();
      titleInterval = setInterval(app.changeTitle, 5000);
    },
    setCopyright() {
      const date = new Date();
      const year = date.getFullYear();
      elements.copyright.textContent = year;
    },
    changeTitle() {
      const text = elements.about.textContent;
      if(text === 'Contact') {
        elements.about.textContent = 'About';
      } else {
        elements.about.textContent = 'Contact';
      }
    }
  }

  const images = {
    init() {
      const number = this.generateNumber();
      this.changeImage();
      actualNumber = number;
      images.startInterval(number)
    },
    startInterval() {
      imageInterval = setInterval(images.changeImage, 4000);
    },
    pauzeInterval() {
      clearInterval(imageInterval);
    },
    negativeInterval() {
      const number = images.generateNumber();
      elements.image_groups.forEach(function(group) {
        group.style.opacity = 0;
      });
      elements.image_groups[number].childNodes[1].style.opacity = 0;
      elements.image_groups[number].childNodes[3].style.opacity = 1;
      elements.image_groups[number].style.opacity = 1;
    },
    changeImage() {
      const number = images.generateNumber();
      elements.image_groups.forEach(function(group) {
        group.style.opacity = 0;
      });
      elements.image_groups[number].childNodes[1].style.opacity = 1;
      elements.image_groups[number].style.opacity = 1;
    },
    generateNumber() {
      const amountOfGroups = elements.image_groups.length - 1;
      let number = Math.floor(Math.random() * amountOfGroups) + 1;
      latestNumber = number;
      if(allLatest.length <= amountOfGroups) {
        if(allLatest.indexOf(number) == -1) {
          allLatest.push(number);
          actualNumber = number;
        } else {
          number = images.newNumber();
          allLatest.push(number);
          actualNumber = number;
        }
      } else {
        allLatest = [];
      }
      return number;
    },
    newNumber() {
      const amountOfGroups = elements.image_groups.length - 1;
      const number = Math.floor(Math.random() * amountOfGroups) + 1;
      if(allLatest.indexOf(number) == -1) {
        return number;
      } else {
        const number = Math.floor(Math.random() * amountOfGroups) + 1;
        return number;
      }
    }
  }

  const eventListeners = {
    init() {
      elements.title.addEventListener("click", eventListeners.openInfo);
      elements.about.addEventListener("click", eventListeners.openInfo);
      elements.close.addEventListener("click", eventListeners.closeInfo);
      elements.image.forEach(function(image){
        image.addEventListener("click", eventListeners.goToNext);
      })
    },
    openInfo() {
      clearInterval(imageInterval);
<<<<<<< HEAD
      negativeInterval = setInterval(images.negativeInterval, 5000);
      console.log(actualNumber)
      elements.image_groups[latestNumber].childNodes[1].style.display = 'none';
      elements.image_groups[latestNumber].childNodes[3].style.opacity = 1;
      elements.about.style.display = 'none';
      elements.title.style.display = 'none';
=======
      negativeInterval = setInterval(images.negativeInterval, 4000);
      elements.image_groups[actualNumber].childNodes[1].style.opacity = 0;
      elements.image_groups[actualNumber].childNodes[3].style.opacity = 1;
>>>>>>> parent of 182dac2... Test
      elements.info.style.opacity = 1;
      elements.info.style.zIndex = 100000;
      // document.body.style.backgroundColor = 'white';
    },
    closeInfo() {
      clearInterval(negativeInterval);
<<<<<<< HEAD
      imageInterval = setInterval(images.changeImage, 5000);
      elements.image_groups[latestNumber].childNodes[1].style.opacity = 1;
=======
      imageInterval = setInterval(images.changeImage, 4000);
      elements.image_groups[actualNumber].childNodes[1].style.opacity = 1;
>>>>>>> parent of 182dac2... Test
      elements.image_groups[actualNumber].childNodes[3].style.opacity = 0;
      elements.info.style.opacity = 0;
      elements.info.style.zIndex = -100000;
      document.body.style.backgroundColor = 'black';
      elements.about.style.display = 'block';
      elements.title.style.display = 'block';
    },
    goToNext() {
      clearInterval(imageInterval);
      images.changeImage();
<<<<<<< HEAD
      imageInterval = setInterval(images.changeImage, 5000);
=======
      imageInterval = setInterval(images.changeImage, 4000);
      console.log('click');
>>>>>>> parent of 182dac2... Test
    },
  }

  app.init();

})();
