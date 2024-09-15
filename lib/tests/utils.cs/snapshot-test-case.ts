export abstract class SnapshotTestCase extends HTMLElement {
  constructor() {
    super();
  }

  abstract createElementUnderTest(): HTMLElement;

  connectedCallback() {
    this.style.display = 'block';
    this.style.width = 'max-content';
    this.style.padding = '1rem';

    this.appendChild(this.createElementUnderTest());
  }
}
