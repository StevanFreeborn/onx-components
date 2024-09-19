import OnxComponent from '../onx-component.js';

export type OnxButtonVariant = (typeof OnxButton.variants)[keyof typeof OnxButton.variants];
export type OnxButtonType = (typeof OnxButton.types)[keyof typeof OnxButton.types];
export type OnxButtonSize = (typeof OnxButton.sizes)[keyof typeof OnxButton.sizes];

export class OnxButton extends OnxComponent {
  static readonly tagName = 'onx-button';

  static readonly variants = {
    primaryFilled: 'primary-filled',
    primaryFilledSuccess: 'primary-filled-success',
    primaryFilledWarning: 'primary-filled-warning',

    secondaryFilled: 'secondary-filled',
    secondaryOutlined: 'secondary-outlined',

    secondaryOutlinedWarning: 'secondary-outlined-warning',
    link: 'link',
    icon: 'icon',
  };

  static readonly sizes = {
    sm: 'sm',
    md: 'md',
    lg: 'lg',
  };

  private static readonly _styles = /* css */ `
    button {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      gap: 0.25rem;
      border-radius: 0.3125rem;

      text-align: center;
      font-size: 0.8125rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.375rem;
      letter-spacing: 0.01563rem;
    }

    button:disabled {
      pointer-events: none;
    }

    .${OnxButton.sizes.sm} {
      padding: 0rem 0.625rem;
    }

    .${OnxButton.sizes.md} {
      padding: 0.125rem 0.625rem;
    }

    .${OnxButton.sizes.lg} {
      padding: 0.375rem 0.75rem;
      gap: 0.375rem;
    }

    .${OnxButton.variants.primaryFilled},
    .${OnxButton.variants.primaryFilledSuccess},
    .${OnxButton.variants.primaryFilledWarning} {
      color: var(--primary-white);
    }

    .${OnxButton.variants.primaryFilled} {
      background-color: var(--primary-light-blue);
    }

    .${OnxButton.variants.primaryFilled}:hover {
      background-color: var(--state-hover-blue);
    }

    .${OnxButton.variants.primaryFilled}:disabled {
      background-color: var(--state-disabled-blue);
    }

    .${OnxButton.variants.primaryFilledSuccess} {
      background-color: var(--status-success);
    }

    .${OnxButton.variants.primaryFilledSuccess}:hover {
      background-color: var(--state-hover-success);
    }

    .${OnxButton.variants.primaryFilledWarning} {
      background-color: var(--status-error);
    }

    .${OnxButton.variants.primaryFilledWarning}:hover {
      background-color: var(--state-hover-error);
    }

    .${OnxButton.variants.secondaryFilled},
    .${OnxButton.variants.secondaryOutlined},
    .${OnxButton.variants.icon} {
      color: var(--gray-dark-gray);

      /* TODO: Be on look out for this border style/color else where */
      border: 1px solid #ACB0BB;
    }

    .${OnxButton.variants.secondaryFilled}:hover,
    .${OnxButton.variants.secondaryOutlined}:hover {
      background-color: var(--state-hover-orange);
    }

    .${OnxButton.variants.secondaryOutlined},
    .${OnxButton.variants.secondaryOutlinedWarning} {
      background-color: transparent;
    }

    .${OnxButton.variants.secondaryFilled} {
      background-color: var(--gray-lighter-gray);
    }

    .${OnxButton.variants.secondaryOutlinedWarning} {
      color: var(--status-error);
      border: 1px solid var(--status-error);
    }

    .${OnxButton.variants.secondaryOutlinedWarning}:hover {
      color: var(--state-hover-error);
      border-color: var(--state-hover-error);
    }

    .${OnxButton.variants.link} {
      background-color: transparent;
      color: var(--primary-light-blue);
    }

    .${OnxButton.variants.link}:hover {
      text-decoration: underline;
    }

    .${OnxButton.variants.icon} {
      width: 1.875rem;
      height: 1.875rem;
      border: 1px solid var(--gray-light-gray);
      background-color: var(--primary-white);
    }

    .${OnxButton.variants.icon}:hover {
      background-color: var(--state-hover-orange);
    }
  `;

  private static readonly _obsAttributes = {
    type: 'type',
    variant: 'variant',
    disabled: 'disabled',
    size: 'size',
  };

  static readonly types = {
    submit: 'submit',
    reset: 'reset',
    button: 'button',
  };

  private _button = document.createElement('button');

  private _internals: ElementInternals;

  static formAssociated = true;

  get type(): OnxButtonType {
    const currentAttribute = this.getAttribute(OnxButton._obsAttributes.type) as OnxButtonType;
    return currentAttribute || OnxButton.types.submit;
  }

  set type(value: OnxButtonType) {
    const isValid = Object.values(OnxButton.types).includes(value);

    if (isValid === false) {
      // eslint-disable-next-line no-console
      console.warn(`Ignored setting because type invalid: ${value}.`);
      return;
    }

    this._button.setAttribute(OnxButton._obsAttributes.type, value);
    this.setAttribute(OnxButton._obsAttributes.type, value);
  }

  get variant(): OnxButtonVariant {
    const currentAttribute = this.getAttribute(
      OnxButton._obsAttributes.variant
    ) as OnxButtonVariant;

    return currentAttribute || OnxButton.variants.primaryFilled;
  }

  set variant(value: OnxButtonVariant) {
    const isValid = Object.values(OnxButton.variants).includes(value);

    if (isValid === false) {
      // eslint-disable-next-line no-console
      console.warn(`Ignored setting because variant invalid: ${value}.`);
      return;
    }

    this._button.classList.replace(this.variant, value);
    this.setAttribute(OnxButton._obsAttributes.variant, value);
  }

  get disabled(): boolean {
    return this.hasAttribute(OnxButton._obsAttributes.disabled);
  }

  set disabled(value: boolean) {
    if (value) {
      this.setAttribute(OnxButton._obsAttributes.disabled, '');
      this._button.setAttribute(OnxButton._obsAttributes.disabled, '');
      return;
    }

    this.removeAttribute(OnxButton._obsAttributes.disabled);
    this._button.removeAttribute(OnxButton._obsAttributes.disabled);
  }

  get size(): OnxButtonSize {
    const currentAttribute = this.getAttribute(OnxButton._obsAttributes.size) as OnxButtonSize;
    return currentAttribute || OnxButton.sizes.sm;
  }

  set size(value: OnxButtonSize) {
    const isValid = Object.values(OnxButton.sizes).includes(value);

    if (isValid === false) {
      // eslint-disable-next-line no-console
      console.warn(`Ignored setting because size invalid: ${value}.`);
      return;
    }

    this._button.classList.replace(this.size, value);
    this.setAttribute(OnxButton._obsAttributes.size, value);
  }

  private _submitForm() {
    this._internals.form?.requestSubmit();
  }

  private _resetForm() {
    this._internals.form?.reset();
  }

  constructor() {
    super();

    this._button.classList.add(this.variant);
    this._button.classList.add(this.size);
    this._button.setAttribute(OnxButton._obsAttributes.type, this.type);

    if (this.disabled) {
      this._button.setAttribute(OnxButton._obsAttributes.disabled, '');
    }

    this._internals = this.attachInternals();

    this._submitForm = this._submitForm.bind(this);
    this._resetForm = this._resetForm.bind(this);
  }

  protected render() {
    const slot = document.createElement('slot');
    this._button.appendChild(slot);

    const styles = document.createElement('style');
    styles.textContent = OnxButton._styles;

    this.shadowRoot?.appendChild(styles);
    this.shadowRoot?.appendChild(this._button);
  }

  connectedCallback() {
    if (this.type === 'submit') {
      this.addEventListener('click', this._submitForm);
    }

    if (this.type === 'reset') {
      this.addEventListener('click', this._resetForm);
    }

    super.connectedCallback();
  }

  disconnectedCallback() {
    if (this.type === 'submit') {
      this.removeEventListener('click', this._submitForm);
    }

    if (this.type === 'reset') {
      this.removeEventListener('click', this._resetForm);
    }
  }

  static get observedAttributes() {
    return Object.values(OnxButton._obsAttributes);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) {
      return;
    }

    switch (name) {
      case OnxButton._obsAttributes.type:
        this.type = newValue as OnxButtonType;
        break;
      case OnxButton._obsAttributes.variant:
        this.variant = newValue as OnxButtonVariant;
        break;
      case OnxButton._obsAttributes.disabled:
        this.disabled = newValue !== null;
        break;
      case OnxButton._obsAttributes.size:
        this.size = newValue as OnxButtonSize;
        break;
      default:
        break;
    }
  }
}

customElements.define(OnxButton.tagName, OnxButton);

declare global {
  interface HTMLElementTagNameMap {
    [OnxButton.tagName]: OnxButton;
  }
}
