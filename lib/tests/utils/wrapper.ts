export default class Wrapper extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = '<onx-button variant="primary-filled">Primary Filled</onx-button>';
  }
}

customElements.define('onx-wrapper', Wrapper);
