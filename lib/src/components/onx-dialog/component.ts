import { OnxIcon } from '../../icons/index.js';
import OnxComponent from '../onx-component.js';

export class OnxDialog extends OnxComponent {
  static readonly tagName = 'onx-dialog';

  private static readonly _obsAttributes = {
    open: 'open',
    variant: 'variant',
  };

  private static readonly _classNames = {
    header: 'header',
    titleContainer: 'title-container',
    closeButton: 'close-button',
    body: 'body',
    footer: 'footer',
  };

  static readonly variants = {
    primary: 'primary',
    success: 'success',
    warning: 'warning',
  };

  private static styles = /* css */ `
    dialog {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 0.3125rem;
      background-color: var(--primary-white);
      box-shadow: var(--box-shadow);
      border: none;
      min-width: 25rem;
    }

    dialog[open] {
      display: flex;
      flex-direction: column;
    }

    .${OnxDialog._classNames.header},
    .${OnxDialog._classNames.body},
    .${OnxDialog._classNames.footer} {
      display: flex;
      max-width: 100%;
    }

    .${OnxDialog._classNames.header} {
      justify-content: space-between;
      padding: 1rem;
      border-bottom-width: 0.125rem;
      border-bottom-style: solid;
    }

    .${OnxDialog._classNames.titleContainer} {
      display: flex;
      gap: 0.25rem;
      align-items: center;
    }

    .${OnxDialog._classNames.body} {
      padding: 0.625rem 1rem;
      color: var(--Gray-Darker-Gray, #222);
      overflow: auto;
    }

    .${OnxDialog._classNames.footer} {
      padding: 0.625rem; 1rem;
      gap: 0.625rem;
      align-items: center;
      justify-content: flex-end;
      border: 0.0625rem solid var(--gray-light-gray);
    }

    .${OnxDialog.variants.primary} .${OnxDialog._classNames.header} {
      border-bottom-color: var(--primary-light-blue);
    }

    .${OnxDialog.variants.success} .${OnxDialog._classNames.header} {
      border-bottom-color: var(--status-success);
    }

    .${OnxDialog.variants.warning} .${OnxDialog._classNames.header} {
      border-bottom-color: var(--status-error);
    }

    .${OnxDialog._classNames.closeButton} {
      color: var(--gray-gray);
      background-color: transparent;
    }

    .${OnxDialog._classNames.closeButton}:hover {
      color: var(--primary-light-blue);
    }

    .${OnxDialog.variants.primary} ::slotted([slot='title-icon']) {
      color: var(--primary-light-blue);
    }

    .${OnxDialog.variants.success} ::slotted([slot='title-icon']) {
      color: var(--status-success);
    }

    .${OnxDialog.variants.warning} ::slotted([slot='title-icon']) {
      color: var(--status-error);
    }
  `;

  get open() {
    return this.hasAttribute(OnxDialog._obsAttributes.open);
  }

  set open(value: boolean) {
    if (value) {
      this.setAttribute(OnxDialog._obsAttributes.open, '');
    } else {
      this.removeAttribute(OnxDialog._obsAttributes.open);
    }
  }

  get variant() {
    return this.getAttribute(OnxDialog._obsAttributes.variant);
  }

  set variant(value: string | null) {
    if (value) {
      this.setAttribute(OnxDialog._obsAttributes.variant, value);
      this._headerElement.classList.replace(this.variant ?? OnxDialog.variants.primary, value);
    }
  }

  private readonly _styleElement = document.createElement('style');

  private readonly _dialogElement = document.createElement('dialog');

  private readonly _dialogTitleContainer = document.createElement('div');

  private readonly _dialogTitleElement = document.createElement('h4');

  private readonly _dialogTitleSlotElement = document.createElement('slot');

  private readonly _dialogTitleIconSlotElement = document.createElement('slot');

  private readonly _closeButtonElement = document.createElement('button');

  private readonly _closeButtonIcon = new OnxIcon();

  private readonly _headerElement = document.createElement('div');

  private readonly _bodyElement = document.createElement('div');

  private readonly _bodySlotElement = document.createElement('slot');

  private readonly _footerElement = document.createElement('div');

  private readonly _cancelButtonSlotElement = document.createElement('slot');

  private readonly _confirmButtonSlotElement = document.createElement('slot');

  private _closeDialog() {
    this._dialogElement.close();
    this.open = false;
    this.dispatchEvent(new OnxDialogCloseEvent());
  }

  private _cancelDialog() {
    this._closeDialog();
    this.dispatchEvent(new OnxDialogCancelEvent());
  }

  private _confirmDialog() {
    this._closeDialog();
    this.dispatchEvent(new OnxDialogConfirmEvent());
  }

  close() {
    this._closeDialog();
  }

  show() {
    this._dialogElement.showModal();
    this.open = true;
    this.dispatchEvent(new OnxDialogOpenEvent());
  }

  protected render(): void {
    if (this.shadowRoot === null) {
      return;
    }

    this._closeDialog = this._closeDialog.bind(this);
    this._cancelDialog = this._cancelDialog.bind(this);
    this._confirmDialog = this._confirmDialog.bind(this);

    this._dialogTitleContainer.classList.add(OnxDialog._classNames.titleContainer);
    this._headerElement.classList.add(OnxDialog._classNames.header);
    this._bodyElement.classList.add(OnxDialog._classNames.body);
    this._bodyElement.classList.add('typo-b3');
    this._footerElement.classList.add(OnxDialog._classNames.footer);
    this._dialogElement.classList.add(this.variant ?? OnxDialog.variants.primary);

    this._styleElement.textContent = OnxDialog.styles;

    this._closeButtonIcon.name = 'close';
    this._closeButtonElement.classList.add(OnxDialog._classNames.closeButton);
    this._closeButtonElement.appendChild(this._closeButtonIcon);
    this._closeButtonElement.addEventListener('click', this._closeDialog);

    this._dialogTitleIconSlotElement.name = 'title-icon';
    this._dialogTitleSlotElement.name = 'title';
    this._dialogTitleElement.appendChild(this._dialogTitleSlotElement);
    this._dialogTitleContainer.appendChild(this._dialogTitleIconSlotElement);
    this._dialogTitleContainer.appendChild(this._dialogTitleElement);
    this._headerElement.appendChild(this._dialogTitleContainer);
    this._headerElement.appendChild(this._closeButtonElement);

    this._bodySlotElement.name = 'body';
    this._bodyElement.appendChild(this._bodySlotElement);

    this._confirmButtonSlotElement.name = 'confirm-button';
    this._confirmButtonSlotElement.addEventListener('click', this._confirmDialog);
    this._footerElement.appendChild(this._confirmButtonSlotElement);

    this._cancelButtonSlotElement.name = 'cancel-button';
    this._cancelButtonSlotElement.addEventListener('click', this._cancelDialog);
    this._footerElement.appendChild(this._cancelButtonSlotElement);

    this._dialogElement.open = this.open;
    this._dialogElement.appendChild(this._headerElement);
    this._dialogElement.appendChild(this._bodyElement);
    this._dialogElement.appendChild(this._footerElement);

    this.shadowRoot.appendChild(this._styleElement);
    this.shadowRoot.appendChild(this._dialogElement);
  }

  static get observedAttributes() {
    return Object.values(OnxDialog._obsAttributes);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) {
      return;
    }

    switch (name) {
      case OnxDialog._obsAttributes.open:
        this.open = newValue !== null;
        break;
      case OnxDialog._obsAttributes.variant:
        this.variant = newValue;
        break;
      default:
        break;
    }
  }
}

customElements.define(OnxDialog.tagName, OnxDialog);

declare global {
  interface HTMLElementTagNameMap {
    [OnxDialog.tagName]: OnxDialog;
  }
}

export class OnxDialogCloseEvent extends Event {
  constructor() {
    super('onx-dialog-close');
  }
}

export class OnxDialogOpenEvent extends Event {
  constructor() {
    super('onx-dialog-open');
  }
}

export class OnxDialogCancelEvent extends Event {
  constructor() {
    super('onx-dialog-cancel');
  }
}

export class OnxDialogConfirmEvent extends Event {
  constructor() {
    super('onx-dialog-confirm');
  }
}
