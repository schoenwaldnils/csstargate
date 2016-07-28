if (typeof HTMLElement !== 'function') {
  const oHTMLElement = () => {};
  oHTMLElement.prototype = HTMLElement.prototype;
  HTMLElement = oHTMLElement;
}

class Dhd extends HTMLElement {
  createdCallback() {
    // default options
    this.options = {
      address: [],
      selectors: {
        symboles: '.Dhd-symboles',
        symbole: '.Dhd-symbole',
        submit: '.Dhd-submit',
        reset: '.Dhd-reset',
      },
    };

    this.elements = {};
    Object.keys(this.options.selectors).forEach((key) => {
      this.elements[key] = this.querySelectorAll(this.options.selectors[key]);
    });

    this.elements.symbole[0].addEventListener('click', () =>
      this.setAttribute('data-address', JSON.stringify([27, 7, 15, 32, 12, 30, 1]))
    );

    this.elements.submit[0].addEventListener('click', () =>
      this.processClickSubmit()
    );

    this.elements.reset[0].addEventListener('click', () => {
      this.resetGate();
      this.resetDhd();
    });

    this.elements.symbole.forEach((element) =>
      element.addEventListener('click', () => this.processClickSymbole(element))
    );
  }

  processClickSubmit() {
    if (this.options.address.length === 6) {
      this.options.address.push(1);
      this.sendAdress(this.options.address);
    }
  }

  processClickSymbole(element) {
    if (this.options.address.length < 6 && !element.classList.contains('is-active')) {
      const chevron = element.getAttribute('data-chevron');
      this.options.address.push(chevron);
      element.classList.add('is-active');
      // this.options.address.push(target.getAttribute('data-address'));
    }
  }

  resetGate() {
    document.querySelectorAll('.Stargate')[0].removeAttribute('data-address');
  }

  resetDhd() {
    this.options.address = [];
    this.elements.symbole.forEach((symbol) => symbol.classList.remove('is-active'));
  }

  sendAdress(address) {
    // document.querySelectorAll('.data')[0].setAttribute('data-address', address);
    document.querySelectorAll('.Stargate')[0].setAttribute('data-address', JSON.stringify(address));
  }
}

export default document.registerElement('c-dhd', Dhd);
