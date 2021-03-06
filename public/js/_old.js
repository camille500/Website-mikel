(function () {

  const elements = {
    image_groups: document.querySelectorAll('.__image_wrapper'),
    image: document.querySelectorAll('.__image'),
    info: document.querySelector('.__info'),
    close: document.querySelector('#close'),
    title: document.querySelectorAll('.__title'),
    copyright: document.querySelector('#copy_date'),
    image: document.querySelectorAll('.__clickable'),
    title_one: document.querySelector('.one'),
    title_two: document.querySelector('.two'),
    title_three: document.querySelector('.three'),
    image_info: document.querySelectorAll('.__image_info')
  }

  let allData = {};

  let imageInterval = false;
  let negativeInterval = false;
  let actualNumber = false;
  let allLatest = [];
  let latestTitle = false;

  const app = {
    init() {
      this.getData();
      images.init();
      eventListeners.init();
      this.setCopyright();
      app.changeTitle();
      titleInterval = setInterval(app.changeTitle, 750);
    },
    setCopyright() {
      const date = new Date();
      const year = date.getFullYear();
      elements.copyright.textContent = year;
    },
    changeTitle() {
      if(latestTitle === false) {
        latestTitle = 'one';
        elements.title_three.style.opacity = 0;
        elements.title_one.style.opacity = 1;
      } else if(latestTitle === 'one') {
        latestTitle = 'two';
        elements.title_one.style.opacity = 0;
        setTimeout(function() {
          elements.title_two.style.opacity = 1;
        }, 50)
      } else {
        latestTitle = false;
        elements.title_two.style.opacity = 0;
        setTimeout(function() {
          elements.title_three.style.opacity = 1;
        }, 50)
      }
    },
    test() {
      for(var key in allData.images) {
        console.log(key)
      }
      setTimeout(function(){
        document.getElementById('normal').src = 'http://www.menshealth.com/sites/menshealth.com/files/beer-main_0.jpg';

      }, 2000)
    },
    getData() {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
             let data = JSON.parse(xhttp.responseText);
             allData = data;
             app.test();
          }
      };
      xhttp.open("GET", "http://localhost:3000/images", true);
      xhttp.send();
    }
  }

  const images = {
    init() {
      const amountOfGroups = elements.image_groups.length - 1;
      let number = Math.floor(Math.random() * amountOfGroups) + 1;
      actualNumber = number;
      setTimeout(function() {
        images.changeImage();
      }, 750)
      images.startInterval()
    },
    startInterval() {
      imageInterval = setInterval(images.changeImage, 5000);
    },
    pauzeInterval() {
      clearInterval(imageInterval);
    },
    negativeInterval() {
      const amountOfGroups = elements.image_groups.length - 1;
      let number = Math.floor(Math.random() * amountOfGroups) + 1;
      actualNumber = number;
      if(allLatest.indexOf(number) > -1) {
        const amountOfGroups = elements.image_groups.length - 1;
        let number = Math.floor(Math.random() * amountOfGroups) + 1;
        actualNumber = number;
        allLatest.push(number)
      } else {
        allLatest.push(number)
      }
      elements.image_groups.forEach(function(group) {
        group.style.opacity = 0;
      });
      elements.image_groups[number].childNodes[1].style.opacity = 0;
      elements.image_groups[number].childNodes[3].style.opacity = 1;
      elements.image_groups[number].style.opacity = 1;
    },
    changeImage() {
      const amountOfGroups = elements.image_groups.length - 1;
      let number = Math.floor(Math.random() * amountOfGroups) + 1;
      actualNumber = number;
      if(allLatest.indexOf(number) > -1) {
        const amountOfGroups = elements.image_groups.length - 1;
        let number = Math.floor(Math.random() * amountOfGroups) + 1;
        actualNumber = number;
        allLatest.push(number)
      } else {
        allLatest.push(number)
      }
      elements.image_groups.forEach(function(group) {
        group.style.opacity = 0;
      });
      elements.image_groups[number].childNodes[1].style.opacity = 1;
      elements.image_groups[number].style.opacity = 1;
    },
  }

  const eventListeners = {
    init() {
      elements.title.forEach(function(title){
        title.addEventListener("click", eventListeners.openInfo);
      })
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
      elements.title.forEach(function(title) {
        title.style.opacity = 0;
      })
      elements.image_info.forEach(function(info) {
        info.style.opacity = 0;
      })
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
      elements.image_info.forEach(function(info) {
        info.style.opacity = 1;
      })
      elements.info.style.zIndex = -100000;
      document.body.style.backgroundColor = 'black';
    },
    goToNext() {
      clearInterval(imageInterval);
      images.changeImage();
      imageInterval = setInterval(images.changeImage, 5000);
    },
  }

  app.init();

})();
