import OnxIcon from '../onx-icon.js';

export class OnxCaretDown extends OnxIcon {
  static tagName = 'onx-caret-down' as const;

  protected svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  constructor() {
    super();

    this.width = '16';
    this.height = '16';

    this.setAttribute('width', this.width);
    this.setAttribute('height', this.height);
    this.svg.setAttribute('viewBox', '0 0 16 16');
    this.svg.setAttribute('fill', 'currentColor');
    this.svg.innerHTML = /* html */ `
      <path id="caret-down" d="M8 10L5 5.5H11L8 10Z" fill="currentColor"/>
    `;
  }
}

customElements.define(OnxCaretDown.tagName, OnxCaretDown);

declare global {
  interface HTMLElementTagNameMap {
    [OnxCaretDown.tagName]: OnxCaretDown;
  }
}
