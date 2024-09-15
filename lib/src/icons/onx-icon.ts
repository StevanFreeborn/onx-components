import OnxComponent from '@/components/onx-component';

export default abstract class OnxIcon extends OnxComponent {
  get height() {
    return this.getAttribute('height') || '12';
  }

  set height(value: string) {
    this.setAttribute('height', value);
  }

  get width() {
    return this.getAttribute('width') || '12';
  }

  set width(value: string) {
    this.setAttribute('width', value);
  }

  constructor() {
    super();
  }

  private static obsAttributes = {
    height: 'height',
    width: 'width',
  } as const;

  static get observedAttributes() {
    return Object.values(OnxIcon.obsAttributes);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) {
      return;
    }

    switch (name) {
      case OnxIcon.obsAttributes.height:
        this.height = newValue;
        break;
      case OnxIcon.obsAttributes.width:
        this.width = newValue;
        break;
    }
  }
}
