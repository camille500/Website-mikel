(function () {

  const elements = {
    image_groups: document.querySelectorAll('.__image_wrapper'),
    info: document.querySelector('.__info'),
    close: document.querySelector('#close'),
    title: document.querySelector('.__title'),
    copyright: document.querySelector('#copy_date'),
    image: document.querySelectorAll('.__clickable'),
  }

  let imageInterval = false;
  let negativeInterval = false;
  let actualNumber = false;

  const app = {
    init() {
      images.init();
      eventListeners.init();
      this.setCopyright();
    },
    setCopyright() {
      const date = new Date();
      const year = date.getFullYear();
      elements.copyright.textContent = year;
    }
  }

  const images = {
    init() {
      const amountOfGroups = elements.image_groups.length - 1;
      const number = Math.floor(Math.random() * amountOfGroups) + 1;
      elements.image_groups[number].style.opacity = 1;
      actualNumber = number;
      images.startInterval(number)
    },
    startInterval() {
      imageInterval = setInterval(images.changeImage, 5000);
    },
    pauzeInterval() {
      clearInterval(imageInterval);
    },
    negativeInterval() {
      const amountOfGroups = elements.image_groups.length - 1;
      const number = Math.floor(Math.random() * amountOfGroups) + 1;
      elements.image_groups.forEach(function(group) {
        group.style.opacity = 0;
      });
      elements.image_groups[number].childNodes[1].style.opacity = 0;
      elements.image_groups[number].childNodes[3].style.opacity = 1;
      elements.image_groups[number].style.opacity = 1;
      actualNumber = number;
    },
    changeImage() {
      const amountOfGroups = elements.image_groups.length - 1;
      const number = Math.floor(Math.random() * amountOfGroups) + 1;
      elements.image_groups.forEach(function(group) {
        group.style.opacity = 0;
      });
      elements.image_groups[number].childNodes[1].style.opacity = 1;
      elements.image_groups[number].style.opacity = 1;
      actualNumber = number;
    },
  }

  const eventListeners = {
    init() {
      elements.title.addEventListener("click", eventListeners.openInfo);
      elements.close.addEventListener("click", eventListeners.closeInfo);
      elements.image.forEach(function(image){
        image.addEventListener("click", eventListeners.goToNext);
      })
    },
    openInfo() {
      clearInterval(imageInterval);
      negativeInterval = setInterval(images.negativeInterval, 5000);
      elements.image_groups[actualNumber].childNodes[1].style.opacity = 0;
      elements.image_groups[actualNumber].childNodes[3].style.opacity = 1;
      elements.info.style.opacity = 1;
      elements.info.style.zIndex = 100000;
      document.body.style.backgroundColor = 'white';
    },
    closeInfo() {
      clearInterval(negativeInterval);
      imageInterval = setInterval(images.changeImage, 5000);
      elements.image_groups[actualNumber].childNodes[1].style.opacity = 1;
      elements.image_groups[actualNumber].childNodes[3].style.opacity = 0;
      elements.info.style.opacity = 0;
      elements.info.style.zIndex = -100000;
      document.body.style.backgroundColor = 'black';
    },
    goToNext() {
      clearInterval(imageInterval);
      images.changeImage();
      imageInterval = setInterval(images.changeImage, 5000);
      console.log('click');
    },
  }

  app.init();

})();
