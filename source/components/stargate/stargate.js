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
      lockTime: 700,
      currentIndex: 0,
      isRunning: false,
      hooks: [1, 2, 3, 6, 7, 8, 0],
      selectors: {
        symboles: '.Stargate-symboles',
        symbole: '.Stargate-symbole',
        eventHorizon: '.Stargate-horizon',
        chevrons: '.Stargate-chevron',
        video: '.Stargate-video',
        buttonGo: '.Stargate-button--go',
        buttonStop: '.Stargate-button--stop',
        buttonTC: '.Stargate-button--toggleChevrons',
      },
    };

    this.elements = {};
    Object.keys(this.options.selectors).forEach((key) => {
      this.elements[key] = this.querySelectorAll(this.options.selectors[key]);
    });

    this.calcFontSize();
  }

  static get observedAttributes() {
    return ['data-address'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (newValue != null) {
      this.options.address = JSON.parse(newValue);
      this.resetGate();
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
    this.elements.chevrons.forEach((element) => element.classList.remove('is-active'));
    clearTimeout(this.timerSpeed);
    clearTimeout(this.timerHook);
    clearTimeout(this.timerLockTime);
    clearTimeout(this.timerAktivateChevron);
  }

  rotate() {
    return {
      next(that, index, address) {
        if (index < address.length) {
          that.rotateTo(index);
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
      this.elements.video[0].play();
    } else {
      this.elements.eventHorizon[0].classList.remove('is-active');
      this.elements.video[0].pause();
      this.elements.video[0].load();
    }
  }

  runGate() {
    this.options.isRunning = true;
    this.rotate().next(this, this.options.currentIndex, this.options.address);
  }

  rotateTo(index) {
    const chevron = this.options.address[index];
    console.log(`Rotating to ${chevron}`);
    this.elements.symboles[0].style.transform = `rotate(${360 / 39 * (chevron - 1) * -1}deg)`;

    this.timerSpeed = setTimeout(() =>
      this.activateHook(this.options.hooks[index]),
      this.options.speed
    );

    this.timerAktivateChevron = setTimeout(() =>
      this.rotate().next(this, this.options.currentIndex, this.options.address),
      this.options.speed + this.options.delay
    );
  }

  activateHook(index) {
    this.lockChevron();
    this.timerLockTime = setTimeout(() =>
      this.elements.chevrons[index].classList.add('is-active'),
      this.options.lockTime
    );
  }

  lockChevron() {
    this.elements.chevrons[0].classList.add('is-open');
    this.timerHook = setTimeout(() =>
      this.elements.chevrons[0].classList.remove('is-open'),
      this.options.lockTime - 200
    );
  }

  calcFontSize() {
    const html = document.querySelector('html');
    const windowHeight = window.innerHeight;
    const rootFontSizePX = window.getComputedStyle(html, null).getPropertyValue('font-size');
    let rootFontSize = parseInt(rootFontSizePX, 10);
    let stargateHeight = rootFontSize * 46;

    while (windowHeight >= stargateHeight) {
      rootFontSize = rootFontSize + 2;
      stargateHeight = rootFontSize * 46;
    }

    while (windowHeight <= stargateHeight) {
      rootFontSize = rootFontSize - 2;
      stargateHeight = rootFontSize * 46;
    }

    html.style.fontSize = `${rootFontSize}px`;
  }
}

export default document.registerElement('c-stargate', Stargate);
