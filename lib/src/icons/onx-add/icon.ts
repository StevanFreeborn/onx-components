import OnxIcon from '../onx-icon';

export default class OnxAdd extends OnxIcon {
  static tagName = 'onx-add' as const;
  protected svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  constructor() {
    super();

    this.width = '16';
    this.height = '16';

    this.svg.setAttribute('width', this.width);
    this.svg.setAttribute('height', this.height);
    this.svg.setAttribute('viewBox', '0 0 16 16');
    this.svg.setAttribute('fill', 'currentColor');
    this.svg.innerHTML = /* html */ `
      <path id="add" d="M9.34277 2.6875V6.84473H13.5V9.51953H9.34277V13.6875H6.68945V9.51953H2.5V6.84473H6.68945V2.6875H9.34277Z" fill="currentColor"/>
    `;
  }

  static defineElement() {
    if (customElements.get(OnxAdd.tagName)) {
      console.warn(`${OnxAdd.tagName} is already defined`);
      return;
    }

    customElements.define(OnxAdd.tagName, OnxAdd);
  }
}

OnxAdd.defineElement();

declare global {
  interface HTMLElementTagNameMap {
    [OnxAdd.tagName]: OnxAdd;
  }
}
