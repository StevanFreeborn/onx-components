import OnxIcon from '../onx-icon';

export default class OnxCreate extends OnxIcon {
  static tagName = 'onx-create' as const;
  protected svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  constructor() {
    super();

    this.svg.setAttribute('width', this.width);
    this.svg.setAttribute('height', this.height);
    this.svg.setAttribute('viewBox', '0 0 12 12');
    this.svg.setAttribute('fill', 'currentColor');
    this.svg.innerHTML = /* html */ `
      <g id="create" clip-path="url(#clip0_2622_460)">
        <path id="Vector" d="M5.2875 2.25V5.2875H2.25V6.75H5.2875V9.7875H6.75V6.75H9.75V5.2875H6.7125V2.25H5.2875ZM6 0C9.3135 0 12 2.6865 12 6C12 9.3135 9.3135 12 6 12C2.6865 12 0 9.3135 0 6C0.00975 2.69025 2.691 0.00975 6 0Z" fill="currentColor"/>
      </g>
      <defs>
        <clipPath id="clip0_2622_460">
          <rect width="12" height="12" fill="currentColor"/>
        </clipPath>
      </defs>
    `;
  }

  static defineElement() {
    if (customElements.get(OnxCreate.tagName)) {
      console.warn(`${OnxCreate.tagName} is already defined`);
      return;
    }

    customElements.define(OnxCreate.tagName, OnxCreate);
  }
}

OnxCreate.defineElement();

declare global {
  interface HTMLElementTagNameMap {
    [OnxCreate.tagName]: OnxCreate;
  }
}
