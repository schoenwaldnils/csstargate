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
        buttonGo: '.Stargate-button--go',
        buttonStop: '.Stargate-button--stop',
      },
    };

    this.elements = {};
    Object.keys(this.options.selectors).forEach((key) => {
      this.elements[key] = this.querySelectorAll(this.options.selectors[key]);
    });

    // TODO: remove when dhd is ready
    this.elements.buttonGo[0].addEventListener('click', () =>
      this.setAttribute('data-address', JSON.stringify([27, 7, 15, 32, 12, 30, 1]))
    );
    this.elements.buttonStop[0].addEventListener('click', () =>
      this.removeAttribute('data-address')
    );
  }

  static get observedAttributes() {
    return ['data-address'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (newValue != null) {
      this.options.address = JSON.parse(newValue);
      this.runGate();
    } else {
      this.options.address = [];
      this.resetGate();
    }
  }

  resetGate() {
    this.elements.symboles[0].removeAttribute('style');
    this.options.currentIndex = 0;
    this.options.isRunning = false;
    this.setHorizon(false);
  }

  rotate() {
    return {
      next(that, index, address) {
        if (index < address.length) {
          that.rotateTo(that.options.address[index]);
          that.increaseIndex();
          return { done: false };
        }
        that.setHorizon(true);
        return { done: true };
      },
    };
  }

  increaseIndex() {
    this.options.currentIndex++;
  }

  setHorizon(state) {
    if (state === true && this.options.isRunning) {
      this.elements.eventHorizon[0].classList.add('is-active');
    } else {
      this.elements.eventHorizon[0].classList.remove('is-active');
    }
  }

  runGate() {
    this.options.isRunning = true;
    this.rotate().next(this, this.options.currentIndex, this.options.address);
  }

  rotateTo(chevron) {
    console.log(`Rotating to ${chevron}`);
    this.elements.symboles[0].style.transform = `rotate(${360 / 39 * (chevron - 1) * -1}deg)`;

    setTimeout(() =>
      this.rotate().next(this, this.options.currentIndex, this.options.address),
      this.options.speed + this.options.delay
    );
  }

  activateHook(hook) {
    console.log(hook);
  }
}

export default document.registerElement('c-stargate', Stargate);
