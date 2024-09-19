import OnxComponent from '../onx-component.js';

export class OnxDialog extends OnxComponent {
  static readonly tagName = 'onx-dialog';

  protected render(): void {
    throw new Error('Method not implemented.');
  }
}

customElements.define(OnxDialog.tagName, OnxDialog);

declare global {
  interface HTMLElementTagNameMap {
    [OnxDialog.tagName]: OnxDialog;
  }
}
