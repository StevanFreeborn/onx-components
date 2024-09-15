class OnxComponent extends HTMLElement {
  static {
    this.fontImports = [
      "https://fonts.googleapis.com/css?family=Roboto+Condensed:300,400,700|Roboto:300,400,500,700|Barlow:300,400,500|Barlow+Condensed:300,400,500|Raleway:300,400,500&display=swap"
    ];
  }
  static {
    this.baseStyles = /* css */
    `
    :host {
      --primary-blue: #194488;
      --primary-light-blue: #4A87E3;
      --primary-orange: #F7941D;
      --primary-black: #000000;
      --primary-white: #FFFFFF;

      --gray-darker-gray: #222222;
      --gray-dark-gray: #555555;
      --gray-gray: #888888;
      --gray-light-gray: #BBBBBB;
      --gray-lighter-gray: #EEEEEE;

      --status-success: #2FCC66;
      --status-warning: #F1C40F;
      --status-elevated-warning: #E67E22;
      --status-error: #E74C3C;

      --state-hover-orange: #FDDFBC;
      --state-hover-blue: #437ACC;
      --state-hover-success: #4B9754;
      --state-hover-error: #D33F30;
      --state-disabled-blue: #C5D5F3;
      --state-selected-blue: #667BA6;
      font-size: 16px;
      font-family: Roboto, Arial, Helvetica, sans-serif;
      font-style: normal;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    button {
      font-family: inherit;
      border: none;
      cursor: pointer;
    }

    svg {
      display: block;
    }

    .typo-b1 {
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1rem;
      letter-spacing: 0.00219rem;
    }

    .typo-b2 {
      font-size: 0.8125rem;
      font-weight: 600;
      letter-spacing: 0.01563rem;
    }

    .typo-b3 {
      font-size: 0.8125rem;
      font-weight: 400;
      letter-spacing: 0.00206rem;
    }

    .typo-b4 {
      font-size: 0.6875rem;
      font-weight: 400;
      letter-spacing: 0.00175rem;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      color: var(--primary-black);
      font-weight: 700;
    }

    h1 {
      font-size: 1.25rem;
      line-height: 1.5rem;
      letter-spacing: 0.00313rem;
    }

    h2 {
      font-size: 1.125rem;
      line-height: 1.5rem;
      letter-spacing: 0.00281rem;
    }

    h3 {
      font-size: 1rem;
      line-height: 1.25rem;
      letter-spacing: 0.0025rem;
    }

    h4 {
      font-size: 0.875rem;
      line-height: 1rem;
      letter-spacing: 0.00219rem;
    }

    h5 {
      font-size: 0.8125rem;
      font-weight: 500;
      line-height: 1.25rem;
      letter-spacing: 0.00206rem;
    }
  `;
  }
  static importFonts() {
    OnxComponent.fontImports.forEach((font) => {
      if (document.querySelector(`link[href="${font}"]`)) {
        return;
      }
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = font;
      document.head.appendChild(link);
    });
  }
  static createBaseStyles() {
    const styleElement = document.createElement("style");
    styleElement.innerHTML = OnxComponent.baseStyles;
    return styleElement;
  }
  renderTemplate() {
    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template;
    return templateElement.content;
  }
  constructor() {
    super();
    OnxComponent.importFonts();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    const css = new CSSStyleSheet();
    css.replaceSync(OnxComponent.baseStyles);
    this.shadowRoot.adoptedStyleSheets.push(css);
    this.shadowRoot.appendChild(this.renderTemplate());
  }
}

class OnxButton extends OnxComponent {
  constructor() {
    super();
    this.template = /* html */
    `
    <style>
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
      .${OnxButton.variants.secondarySmFilled} {
        color: var(--gray-dark-gray);

        /* TODO: Be on look out for this border style/color else where */
        border: 1px solid #ACB0BB; 
      }

      .${OnxButton.variants.secondarySmOutlined}:hover,
      .${OnxButton.variants.secondarySmFilled}:hover {
        background-color: var(--state-hover-orange);
      }

      .${OnxButton.variants.secondarySmOutlined},
      .${OnxButton.variants.secondarySmOutlinedWarning} {
        background-color: transparent;
      }

      .${OnxButton.variants.secondarySmFilled} {
        background-color: var(--gray-lighter-gray);
      }

      .${OnxButton.variants.secondarySmOutlinedWarning} {
        color: var(--status-error);
        border: 1px solid var(--status-error);
      }

      .${OnxButton.variants.secondarySmOutlinedWarning}:hover {
        color: var(--state-hover-error);
        border-color: var(--state-hover-error);
      }
    </style>
    <button
      type="${this.type}"
      class="${this.variant}"
      ${this.disabled ? "disabled" : ""}
    >
      <slot></slot>
    </button>
  `;
    this.internals = this.attachInternals();
  }
  static {
    this.formAssociated = true;
  }
  static {
    this.tagName = "onx-button";
  }
  static {
    this.variants = {
      primaryFilled: "primary-filled",
      primaryFilledSuccess: "primary-filled-success",
      primaryFilledWarning: "primary-filled-warning",
      secondarySmFilled: "secondary-sm-filled",
      secondaryMdFilled: "secondary-md-filled",
      secondaryLgFilled: "secondary-lg-filled",
      secondarySmOutlined: "secondary-sm-outlined",
      secondaryMdOutlined: "secondary-md-outlined",
      secondaryLgOutlined: "secondary-lg-outlined",
      secondarySmOutlinedWarning: "secondary-sm-outlined-warning",
      ghost: "ghost"
    };
  }
  get type() {
    return this.getAttribute("type") || "submit";
  }
  set type(value) {
    this.setAttribute("type", value);
  }
  get variant() {
    return this.getAttribute("variant") || OnxButton.variants.primaryFilled;
  }
  set variant(value) {
    this.setAttribute("variant", value);
  }
  get disabled() {
    return this.hasAttribute("disabled");
  }
  set disabled(value) {
    if (value) {
      this.setAttribute("disabled", "");
      return;
    }
    this.removeAttribute("disabled");
  }
  static defineElement() {
    if (customElements.get(OnxButton.tagName)) {
      console.warn(`${OnxButton.tagName} is already defined`);
      return;
    }
    customElements.define(OnxButton.tagName, OnxButton);
  }
  submitForm() {
    this.internals.form.requestSubmit();
  }
  resetForm() {
    this.internals.form.reset();
  }
  connectedCallback() {
    if (this.type === "submit") {
      this.addEventListener("click", this.submitForm);
    }
    if (this.type === "reset") {
      this.addEventListener("click", this.resetForm);
    }
    super.connectedCallback();
  }
  disconnectedCallback() {
    if (this.type === "submit") {
      this.removeEventListener("click", this.submitForm);
    }
    if (this.type === "reset") {
      this.removeEventListener("click", this.resetForm);
    }
  }
  static {
    this.obsAttributes = {
      type: "type",
      variant: "variant",
      disabled: "disabled"
    };
  }
  static get observedAttributes() {
    return Object.values(OnxButton.obsAttributes);
  }
  attributeChangedCallback(name, oldValue, newValue) {
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
        this.disabled = !!newValue;
        break;
    }
  }
}
OnxButton.defineElement();

export { OnxButton as default };
//# sourceMappingURL=component-C9nIFekV.js.map
