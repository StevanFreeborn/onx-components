import OnxIcon from '../onx-icon.js';

export class OnxCheckCircle extends OnxIcon {
  static tagName = 'onx-check-circle' as const;

  protected svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  constructor() {
    super();

    this.svg.setAttribute('width', this.width);
    this.svg.setAttribute('height', this.height);
    this.svg.setAttribute('viewBox', '0 0 12 12');
    this.svg.setAttribute('fill', 'currentColor');
    this.svg.innerHTML = /* html */ `
      <g id="check-circle" clip-path="url(#clip0_2618_383)">
        <path id="Vector" d="M6 0C2.6865 0 0 2.6865 0 6C0 9.3135 2.6865 12 6 12C9.3135 12 12 9.3135 12 6C12 2.6865 9.3135 0 6 0ZM5.07 8.76825L2.30925 6.0075L3.36975 4.947L5.06925 6.648L8.676 3.04125L9.7365 4.10175L5.07 8.769V8.76825Z" fill="currentColor"/>
      </g>
      <defs>
        <clipPath id="clip0_2618_383">
          <rect width="12" height="12" fill="currentColor"/>
        </clipPath>
      </defs>
    `;
  }
}

customElements.define(OnxCheckCircle.tagName, OnxCheckCircle);

declare global {
  interface HTMLElementTagNameMap {
    [OnxCheckCircle.tagName]: OnxCheckCircle;
  }
}
