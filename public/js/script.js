(function () {

  const elements = {
    image_groups: document.querySelectorAll('.__image_wrapper'),
    info: document.querySelector('.__info'),
    close: document.querySelector('#close'),
    title: document.querySelector('.__title'),
  }

  let imageInterval = false;
  let actualNumber = false;

  const app = {
    init() {
      images.init();
      eventListeners.init();
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
      imageInterval = setInterval(images.changeImage, 7500);
    },
    pauzeInterval() {
      clearInterval(imageInterval);
    },
    changeImage() {
      const amountOfGroups = elements.image_groups.length - 1;
      const number = Math.floor(Math.random() * amountOfGroups) + 1;
      elements.image_groups.forEach(function(group) {
        group.style.opacity = 0;
      });
      elements.image_groups[number].style.opacity = 1;
      actualNumber = number;
    },
  }

  const eventListeners = {
    init() {
      elements.title.addEventListener("click", eventListeners.openInfo);
      elements.close.addEventListener("click", eventListeners.closeInfo);
    },
    openInfo() {
      clearInterval(imageInterval);
      elements.image_groups[actualNumber].childNodes[1].style.opacity = 0;
      elements.image_groups[actualNumber].childNodes[3].style.opacity = 1;
      elements.info.style.opacity = 1;
      elements.info.style.zIndex = 100000;
      document.body.style.backgroundColor = 'white';
    },
    closeInfo() {
      imageInterval = setInterval(images.changeImage, 7500);
      elements.image_groups[actualNumber].childNodes[1].style.opacity = 1;
      elements.image_groups[actualNumber].childNodes[3].style.opacity = 0;
      elements.info.style.opacity = 0;
      elements.info.style.zIndex = -100000;
      document.body.style.backgroundColor = 'black';
    }
  }

  app.init();

})();
