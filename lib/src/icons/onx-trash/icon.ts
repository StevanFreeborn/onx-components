import OnxIcon from '../onx-icon';

export default class OnxTrash extends OnxIcon {
  static tagName = 'onx-trash' as const;
  protected svgOuterHtml = /* html */ `
    <svg width="${this.width}" height="${this.height}" viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <g id="trash">
      <path id="Vector" d="M3.97717 0H8.02192V1.74H10.4339V3.288H1.56592V1.74H3.97792L3.97717 0ZM1.56592 4.704H10.4339L9.40192 12H2.59792L1.56592 4.704ZM4.58992 0.6V1.74H7.40992V0.6H4.58992Z" fill="currentColor"/>
      </g>
    </svg>
  `;
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

  static defineElement() {
    if (customElements.get(OnxTrash.tagName)) {
      console.warn(`${OnxTrash.tagName} is already defined`);
      return;
    }

    customElements.define(OnxTrash.tagName, OnxTrash);
  }
}

OnxTrash.defineElement();

declare global {
  interface HTMLElementTagNameMap {
    [OnxTrash.tagName]: OnxTrash;
  }
}
