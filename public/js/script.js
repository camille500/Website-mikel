(function () {

  const elements = {
    image_groups: document.querySelectorAll('.__image_wrapper'),
    title: document.querySelector('.__title'),
  }

  let imageInterval = false;
  let actualNumber = false;

  const app = {
    init() {
      images.init();
      eventListeners.init();
    },
    enhance() {

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
    },
    openInfo() {
      clearInterval(imageInterval);
      elements.image_groups[actualNumber].childNodes[1].style.opacity = 0;
      elements.image_groups[actualNumber].childNodes[3].style.opacity = 1;
      console.log(actualNumber);
    }
  }

  app.init();

})();
