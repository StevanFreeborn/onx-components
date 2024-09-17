import OnxComponent from '../onx-component.js';

export default class OnxButton extends OnxComponent {
  private static _variants = {
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
  };

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

  .${OnxButton._variants.primaryFilled},
  .${OnxButton._variants.primaryFilledSuccess},
  .${OnxButton._variants.primaryFilledWarning} {
    color: var(--primary-white);
  }

  .${OnxButton._variants.primaryFilled} {
    background-color: var(--primary-light-blue);
  }

  .${OnxButton._variants.primaryFilled}:hover {
    background-color: var(--state-hover-blue);
  }

  .${OnxButton._variants.primaryFilled}:disabled {
    background-color: var(--state-disabled-blue);
  }

  .${OnxButton._variants.primaryFilledSuccess} {
    background-color: var(--status-success);
  }

  .${OnxButton._variants.primaryFilledSuccess}:hover {
    background-color: var(--state-hover-success);
  }

  .${OnxButton._variants.primaryFilledWarning} {
    background-color: var(--status-error);
  }

  .${OnxButton._variants.primaryFilledWarning}:hover {
    background-color: var(--state-hover-error);
  }

  .${OnxButton._variants.secondarySmOutlined},
  .${OnxButton._variants.secondarySmFilled},
  .${OnxButton._variants.secondaryMdOutlined},
  .${OnxButton._variants.secondaryMdFilled} {
    color: var(--gray-dark-gray);

    /* TODO: Be on look out for this border style/color else where */
    border: 1px solid #ACB0BB; 
  }

  .${OnxButton._variants.secondarySmOutlined}:hover,
  .${OnxButton._variants.secondarySmFilled}:hover,
  .${OnxButton._variants.secondaryMdOutlined}:hover,
  .${OnxButton._variants.secondaryMdFilled}:hover {
    background-color: var(--state-hover-orange);
  }

  .${OnxButton._variants.secondarySmOutlined},
  .${OnxButton._variants.secondaryMdOutlined},
  .${OnxButton._variants.secondarySmOutlinedWarning} {
    background-color: transparent;
  }

  .${OnxButton._variants.secondarySmFilled},
  .${OnxButton._variants.secondaryMdFilled} {
    background-color: var(--gray-lighter-gray);
  }

  .${OnxButton._variants.secondaryMdOutlined},
  .${OnxButton._variants.secondaryMdFilled} {
    padding: 0.125rem 0.625rem;
  }

  .${OnxButton._variants.secondarySmOutlinedWarning} {
    color: var(--status-error);
    border: 1px solid var(--status-error);
  }

  .${OnxButton._variants.secondarySmOutlinedWarning}:hover {
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
  };

  get type(): string {
    return this.getAttribute(OnxButton._obsAttributes.type) || 'submit';
  }

  set type(value: string) {
    const isValid = Object.values(OnxButton.types).includes(value);

    if (isValid === false) {
      console.warn(`Ignored setting because type invalid: ${value}.`);
      return;
    }

    this._button.setAttribute(OnxButton._obsAttributes.type, value);
    this.setAttribute(OnxButton._obsAttributes.type, value);
  }

  get variant(): string {
    return this.getAttribute(OnxButton._obsAttributes.variant) || OnxButton._variants.primaryFilled;
  }

  set variant(value: string) {
    const isValid = Object.values(OnxButton._variants).includes(value);

    if (isValid === false) {
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
        this.type = newValue;
        break;
      case OnxButton._obsAttributes.variant:
        this.variant = newValue;
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
