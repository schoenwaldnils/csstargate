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
      this.setOption('address', this.options.address);
      element.classList.add('is-active');
    }
  }

  resetGate() {
    document.querySelectorAll('.Stargate')[0].removeAttribute('data-address');
  }

  resetDhd() {
    this.options.address = [];
    this.elements.symbole.forEach((symbol) => symbol.classList.remove('is-active'));
    this.elements.submit[0].classList.remove('is-active');
  }

  sendAdress(address) {
    document.querySelectorAll('.Stargate')[0].setAttribute('data-address', JSON.stringify(address));
  }

  setOption(key, value) {
    switch (key) {
      case 'address':
        this.options[key] = value;
        if (value.length === 6) {
          this.elements.submit[0].classList.add('is-active');
        }
        break;
      default:
        this.options[key] = value;
        break;
    }
  }
}

export default document.registerElement('c-dhd', Dhd);
