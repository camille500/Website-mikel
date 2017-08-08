(function () {

  /* ALL ELEMENTS USED IN THE SCRIPT
  ---------------------------------------- */
  const elements = {
    copyright: document.querySelector('#copy_date'),
    title_one: document.querySelector('.one'),
    title_two: document.querySelector('.two'),
    title_three: document.querySelector('.three'),
  };

  /* ALL CONFIGURATION VARIABLES
  ---------------------------------------- */
  const config = {
    latestTitle: false
  };

  /* MAIN APPLICATION
  ---------------------------------------- */
  const app = {
    init() {
      eventListeners.init();
      layout.init();
    },
  };

  /* ALL IMAGE HANDLING
  ---------------------------------------- */
  const images = {
    init() {

    },
  };

  /* ALL LAYOUT HANDLING
  ---------------------------------------- */
  const layout = {
    init() {
      this.setCopyright();
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
  };

  /* ALL EVENTLISTENERS
  ---------------------------------------- */
  const eventListeners = {
    init() {

    },
  };

  app.init();

})();
