import OnxIcon from '../onx-icon.js';

export class OnxTrash extends OnxIcon {
  static tagName = 'onx-trash' as const;

  protected svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  constructor() {
    super();

    this.svg.setAttribute('width', this.width);
    this.svg.setAttribute('height', this.height);
    this.svg.setAttribute('viewBox', '0 0 12 12');
    this.svg.setAttribute('fill', 'currentColor');
    this.svg.innerHTML = /* html */ `
      <g id="trash">
        <path id="Vector" d="M3.97717 0H8.02192V1.74H10.4339V3.288H1.56592V1.74H3.97792L3.97717 0ZM1.56592 4.704H10.4339L9.40192 12H2.59792L1.56592 4.704ZM4.58992 0.6V1.74H7.40992V0.6H4.58992Z" fill="currentColor"/>
      </g>
    `;
  }
}

customElements.define(OnxTrash.tagName, OnxTrash);

declare global {
  interface HTMLElementTagNameMap {
    [OnxTrash.tagName]: OnxTrash;
  }
}
