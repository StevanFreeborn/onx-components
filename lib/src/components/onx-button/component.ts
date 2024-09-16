import OnxComponent from '../onx-component';

export default class OnxButton extends OnxComponent {
  static formAssociated = true;
  private internals: ElementInternals;

  static tagName = 'onx-button' as const;
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
    ghost: 'ghost',
  };

  private static styles = /* css */ `
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

  static types = {
    submit: 'submit',
    reset: 'reset',
    button: 'button',
  };

  private button = document.createElement('button');

  get type(): string {
    return this.getAttribute('type') || 'submit';
  }

  set type(value: string) {
    const isValid = Object.values(OnxButton.types).includes(value);

    if (isValid === false) {
      console.warn(`Ignored setting because type invalid: ${value}.`);
      return;
    }

    this.button.setAttribute('type', value);
    this.setAttribute('type', value);
  }

  get variant(): string {
    return this.getAttribute('variant') || OnxButton.variants.primaryFilled;
  }

  set variant(value: string) {
    const isValid = Object.values(OnxButton.variants).includes(value);

    if (isValid === false) {
      console.warn(`Ignored setting because variant invalid: ${value}.`);
      return;
    }

    this.button.classList.replace(this.variant, value);
    this.setAttribute('variant', value);
  }

  get disabled(): boolean {
    return this.hasAttribute('disabled');
  }

  set disabled(value: boolean) {
    if (value) {
      this.setAttribute('disabled', '');
      this.button.setAttribute('disabled', '');
      return;
    }

    this.removeAttribute('disabled');
    this.button.removeAttribute('disabled');
  }

  static defineElement() {
    if (customElements.get(OnxButton.tagName)) {
      console.warn(`${OnxButton.tagName} is already defined`);
      return;
    }

    customElements.define(OnxButton.tagName, OnxButton);
  }

  private submitForm() {
    this.internals.form?.requestSubmit();
  }

  private resetForm() {
    this.internals.form?.reset();
  }

  constructor() {
    super();

    this.button.classList.add(this.variant);
    this.button.setAttribute('type', this.type);

    if (this.disabled) {
      this.button.setAttribute('disabled', '');
    }

    this.internals = this.attachInternals();
  }

  protected render() {
    const slot = document.createElement('slot');
    this.button.appendChild(slot);

    const styles = document.createElement('style');
    styles.textContent = OnxButton.styles;

    this.shadowRoot?.appendChild(styles);
    this.shadowRoot?.appendChild(this.button);

    console.log('rendered');
  }

  connectedCallback() {
    if (this.type === 'submit') {
      this.addEventListener('click', this.submitForm);
    }

    if (this.type === 'reset') {
      this.addEventListener('click', this.resetForm);
    }

    super.connectedCallback();
  }

  disconnectedCallback() {
    if (this.type === 'submit') {
      this.removeEventListener('click', this.submitForm);
    }

    if (this.type === 'reset') {
      this.removeEventListener('click', this.resetForm);
    }
  }

  private static obsAttributes = {
    type: 'type',
    variant: 'variant',
    disabled: 'disabled',
  };

  static get observedAttributes() {
    return Object.values(OnxButton.obsAttributes);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) {
      return;
    }

    switch (name) {
      case OnxButton.obsAttributes.type:
        this.type = newValue;
        break;
      case OnxButton.obsAttributes.variant:
        this.variant = newValue;
        break;
      case OnxButton.obsAttributes.disabled:
        this.disabled = newValue !== null;
        break;
    }
  }
}

OnxButton.defineElement();

declare global {
  interface HTMLElementTagNameMap {
    [OnxButton.tagName]: OnxButton;
  }
}
