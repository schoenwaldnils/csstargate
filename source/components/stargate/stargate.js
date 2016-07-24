if (typeof HTMLElement !== 'function') {
  const oHTMLElement = () => {};
  oHTMLElement.prototype = HTMLElement.prototype;
  HTMLElement = oHTMLElement;
}

class Stargate extends HTMLElement {
  createdCallback() {
    // default options
    this.options = {
      address: [27, 7, 15, 32, 12, 30, 1],
      speed: 4000, // should pe same as css-transition '.Stargate-symboles'
      delay: 2000,
      currentIndex: 0,
      isRunning: false,
      selectors: {
        symboles: '.Stargate-symboles',
        symbole: '.Stargate-symbole',
        eventHorizon: '.Stargate-horizon',
        button: '.Stargate-button',
      },
    };

    this.elements = {};
    Object.keys(this.options.selectors).forEach((key) => {
      this.elements[key] = this.querySelectorAll(this.options.selectors[key]);
    });

    // TODO: remove when dhd is ready
    this.elements.button[0].addEventListener('click', () =>
      this.setAttribute('data-address', JSON.stringify(this.options.address))
    );
  }

  static get observedAttributes() {
    return ['data-address'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`name: ${name}`);
    console.log(`oldValue: ${oldValue}`);
    console.log(`newValue: ${newValue}`);
    if (newValue != null) {
      this.options.address = JSON.parse(newValue);
      this.runGate();
    } else {
      this.resetGate();
    }
  }

  resetGate() {
    this.options.currentIndex = 0;
    this.options.address = [];
    this.elements.symboles[0].style.transform = null;
  }

  rotate() {
    this.options.isRunning = this.options.isRunning === true;

    return {
      next(that) {
        if (that.options.currentIndex < that.options.address.length) {
          that.rotateTo(that.options.address[that.options.currentIndex]);
          that.increaseIndex();
          return { done: false };
        }
        return { done: true };
      },
    };
  }

  increaseIndex() {
    this.options.currentIndex++;
  }

  runGate() {
    this.rotate();
    this.rotate().next(this);
  }

  rotateTo(chevron) {
    this.options.isRunning = true;

    console.log(`Rotating to ${chevron}`);
    this.elements.symboles[0].style.transform = `rotate(${360 / 39 * (chevron - 1) * -1}deg)`;

    setTimeout(() => this.rotate().next(this), this.options.speed + this.options.delay);
  }

  activateHook(hook) {
    console.log(hook);
  }
}

export default document.registerElement('c-stargate', Stargate);
