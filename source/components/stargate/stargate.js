class Stargate extends HTMLElement {
  createdCallback() {
    // default options
    this.options = {
      address: [27, 7, 15, 32, 12, 30, 1],
      delay: 4000,
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
    // this.runGate();
  }

  set address(address) {
    this.setAttribute('data-address', address);
  }

  runGate() {
    this.options.address.forEach((symbole, index) => {
      console.log(symbole);
      this.elements.symboles
        .style.transform = `rotate(${symbole * 10}deg)`;
      this.activateHook(index);
    });
  }

  activateHook(hook) {
    console.log(hook);
  }
}

export default document.registerElement('c-stargate', Stargate);
