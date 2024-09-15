export default abstract class OnxComponent extends HTMLElement {
  private static fontImports = [
    'https://fonts.googleapis.com/css?family=Roboto+Condensed:300,400,700|Roboto:300,400,500,700|Barlow:300,400,500|Barlow+Condensed:300,400,500|Raleway:300,400,500&display=swap',
  ];
  private static baseStyles = /* css */ `
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

  private static importFonts() {
    OnxComponent.fontImports.forEach(font => {
      if (document.querySelector(`link[href="${font}"]`)) {
        return;
      }

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = font;
      document.head.appendChild(link);
    });
  }

  private static createBaseStyles() {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = OnxComponent.baseStyles;

    return styleElement;
  }

  protected abstract template: string;

  private renderTemplate() {
    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template;
    return templateElement.content;
  }

  constructor() {
    super();

    OnxComponent.importFonts();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const css = new CSSStyleSheet();
    css.replaceSync(OnxComponent.baseStyles);

    this.shadowRoot.adoptedStyleSheets.push(css);
    this.shadowRoot.appendChild(this.renderTemplate());
  }
}
