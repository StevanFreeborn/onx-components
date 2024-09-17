import OnxComponent from '../components/onx-component.js';

export default abstract class OnxIcon extends OnxComponent {
  private static _obsAttributes = {
    height: 'height',
    width: 'width',
  };

  get height() {
    return this.getAttribute(OnxIcon._obsAttributes.height) || '12';
  }

  set height(value: string) {
    this.svg.setAttribute(OnxIcon._obsAttributes.height, value);
    this.setAttribute(OnxIcon._obsAttributes.height, value);
  }

  get width() {
    return this.getAttribute(OnxIcon._obsAttributes.width) || '12';
  }

  set width(value: string) {
    this.svg.setAttribute(OnxIcon._obsAttributes.width, value);
    this.setAttribute(OnxIcon._obsAttributes.width, value);
  }

  protected abstract svg: SVGElement;

  protected render() {
    this.shadowRoot?.appendChild(this.svg);
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
      default:
        break;
    }
  }
}
