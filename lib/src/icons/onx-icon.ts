import OnxComponent from '../components/onx-component.js';
import iconMap from './icons/index.js';

export class OnxIcon extends OnxComponent {
  static readonly tagName = 'onx-icon';

  private static readonly _iconMap = iconMap;

  private static readonly _obsAttributes = {
    height: 'height',
    width: 'width',
    name: 'name',
    rotate: 'rotate',
    inline: 'inline',
  };

  get height() {
    return this.getAttribute(OnxIcon._obsAttributes.height) || '1em';
  }

  set height(value: string) {
    this.syncSvg();
    this.setAttribute(OnxIcon._obsAttributes.height, value);
  }

  get width() {
    return this.getAttribute(OnxIcon._obsAttributes.width) || '1em';
  }

  set width(value: string) {
    this.syncSvg();
    this.setAttribute(OnxIcon._obsAttributes.width, value);
  }

  get rotate() {
    return this.getAttribute(OnxIcon._obsAttributes.rotate);
  }

  set rotate(value: string | null) {
    if (value) {
      this.syncSvg();
      this.setAttribute(OnxIcon._obsAttributes.rotate, value);
    }
  }

  get inline() {
    return this.hasAttribute(OnxIcon._obsAttributes.inline);
  }

  set inline(value: boolean) {
    if (value) {
      this.setAttribute(OnxIcon._obsAttributes.inline, '');
    } else {
      this.removeAttribute(OnxIcon._obsAttributes.inline);
    }

    this.syncSvg();
  }

  get name() {
    return this.getAttribute(OnxIcon._obsAttributes.name);
  }

  set name(value: string | null) {
    if (value) {
      this.setAttribute(OnxIcon._obsAttributes.name, value);
      this.render();
    }
  }

  private static readonly _fallbackIcon = `
    <svg viewBox="0 0 24 24">
      <path d="M3,3 L21,3 L21,21 L3,21 L3,3 M3,3 L21,21 M21,3 L3,21" fill="none" stroke="currentColor" stroke-width="1"/>
    </svg>
  `;

  private _svg: SVGElement | null | undefined = null;

  private syncSvg() {
    if (this._svg) {
      this._svg.setAttribute(OnxIcon._obsAttributes.height, this.height);
      this._svg.setAttribute(OnxIcon._obsAttributes.width, this.width);
      this._svg.style.rotate = this.rotate ? `${this.rotate}deg` : '0deg';
      this._svg.style.display = this.inline ? 'inline-block' : 'block';
    }
  }

  private useFallbackIcon() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = OnxIcon._fallbackIcon;
      this._svg = this.shadowRoot.querySelector('svg');
      this.syncSvg();
    }
  }

  protected render() {
    if (this.name !== null && OnxIcon._iconMap[this.name]) {
      OnxIcon._iconMap[this.name]()
        .then(iconModule => {
          if (this.shadowRoot) {
            this.shadowRoot.innerHTML = iconModule.default;
            this._svg = this.shadowRoot.querySelector('svg');
            this.syncSvg();
          }
        })
        .catch(error => {
          if (error instanceof Error) {
            // eslint-disable-next-line no-console
            console.error("Couldn't load icon", error.message);
          }

          this.useFallbackIcon();
        });

      return;
    }

    this.useFallbackIcon();
  }

  static get observedAttributes() {
    return Object.values(OnxIcon._obsAttributes);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) {
      return;
    }

    switch (name) {
      case OnxIcon._obsAttributes.height:
        this.height = newValue;
        break;
      case OnxIcon._obsAttributes.width:
        this.width = newValue;
        break;
      case OnxIcon._obsAttributes.name:
        this.name = newValue;
        break;
      case OnxIcon._obsAttributes.rotate:
        this.rotate = newValue;
        break;
      case OnxIcon._obsAttributes.inline:
        this.inline = newValue !== null;
        break;
      default:
        break;
    }
  }
}

customElements.define(OnxIcon.tagName, OnxIcon);

declare global {
  interface HTMLElementTagNameMap {
    [OnxIcon.tagName]: OnxIcon;
  }
}
