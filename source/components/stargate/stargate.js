class Stargate extends HTMLElement {
  createdCallback() {
    // default options
    this.options = {
      address: [27, 7, 15, 32, 12, 30, 1],
      speed: 4000, // should pe same as css-transition '.Stargate-symboles'
      delay: 2000,
      isRunning: false,
      selectors: {
        symboles: '.Stargate-symboles',
        symbole: '.Stargate-symbole',
        eventHorizon: '.Stargate-horizon',
      },
    };

    this.elements = {};
    Object.keys(this.options.selectors).forEach((key) => {
      this.elements[key] = this.querySelectorAll(this.options.selectors[key]);
    });

    this.runGate();
  }

  static get observedAttributes() {
    return ['data-address'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.options.address = newValue;
    this.runGate();
  }

  set address(address) {
    this.setAttribute('data-address', address);
  }

  runGate() {
    function* rotate(that) {
      let i = 0;
      while (i < that.options.address.length) {
        that.rotateTo(that.options.address[i]);
        yield i++;
      }
    }

    this.rotate = rotate(this);
    this.rotate.next();
  }

  rotateTo(chevron) {
    const speed = (!this.options.isRunning) ? 1 : this.options.speed;
    this.options.isRunning = true;
    setTimeout(() => {
      console.log(`Rotating to ${chevron}`);
      this.elements.symboles[0].style.transform = `rotate(${360 / 39 * (chevron - 1) * -1}deg)`;
      setTimeout(() => {
        this.rotate.next();
      }, this.options.delay);
    }, speed);
  }

  activateHook(hook) {
    console.log(hook);
  }
}

export default document.registerElement('c-stargate', Stargate);
