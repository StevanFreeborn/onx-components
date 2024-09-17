import OnxComponent from '../onx-component.js';

export type OnxButtonVariant = (typeof OnxButton.variants)[keyof typeof OnxButton.variants];
export type OnxButtonType = (typeof OnxButton.types)[keyof typeof OnxButton.types];

export class OnxButton extends OnxComponent {
  static variants = {
    primaryFilled: 'primary-filled',
    primaryFilledSuccess: 'primary-filled-success',
    primaryFilledWarning: 'primary-filled-warning',

    secondarySmFilled: 'secondary-sm-filled',
    secondaryMdFilled: 'secondary-md-filled',
    secondaryLgFilled: 'secondary-lg-filled',

    secondarySmOutlined: 'secondary-sm-outlined',
    secondaryMdOutlined: 'secondary-md-outlined',
    secondaryLgOutlined: 'secondary-lg-outlined',

    secondarySmOutlinedWarning: 'secondary-sm-outlined-warning',
    link: 'link',
  } as const;

  private static _styles = /* css */ `
  button {
    display: inline-flex;
    padding: 0rem 0.625rem;
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

  .${OnxButton.variants.secondarySmOutlined},
  .${OnxButton.variants.secondarySmFilled},
  .${OnxButton.variants.secondaryMdOutlined},
  .${OnxButton.variants.secondaryMdFilled} {
    color: var(--gray-dark-gray);

    /* TODO: Be on look out for this border style/color else where */
    border: 1px solid #ACB0BB;
  }

  .${OnxButton.variants.secondarySmOutlined}:hover,
  .${OnxButton.variants.secondarySmFilled}:hover,
  .${OnxButton.variants.secondaryMdOutlined}:hover,
  .${OnxButton.variants.secondaryMdFilled}:hover {
    background-color: var(--state-hover-orange);
  }

  .${OnxButton.variants.secondarySmOutlined},
  .${OnxButton.variants.secondaryMdOutlined},
  .${OnxButton.variants.secondarySmOutlinedWarning} {
    background-color: transparent;
  }

  .${OnxButton.variants.secondarySmFilled},
  .${OnxButton.variants.secondaryMdFilled} {
    background-color: var(--gray-lighter-gray);
  }

  .${OnxButton.variants.secondaryMdOutlined},
  .${OnxButton.variants.secondaryMdFilled} {
    padding: 0.125rem 0.625rem;
  }

  .${OnxButton.variants.secondarySmOutlinedWarning} {
    color: var(--status-error);
    border: 1px solid var(--status-error);
  }

  .${OnxButton.variants.secondarySmOutlinedWarning}:hover {
    color: var(--state-hover-error);
    border-color: var(--state-hover-error);
  }
`;

  private static _obsAttributes = {
    type: 'type',
    variant: 'variant',
    disabled: 'disabled',
  };

  private _button = document.createElement('button');

  private _internals: ElementInternals;

  static formAssociated = true;

  static tagName = 'onx-button' as const;

  static types = {
    submit: 'submit',
    reset: 'reset',
    button: 'button',
  } as const;

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

  private _submitForm() {
    this._internals.form?.requestSubmit();
  }

  private _resetForm() {
    this._internals.form?.reset();
  }

  constructor() {
    super();

    this._button.classList.add(this.variant);
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
