export abstract class SnapshotTestCase extends HTMLElement {
  protected wrapper: HTMLElement;

  constructor() {
    super();
    this.wrapper = document.createElement('div');
    this.wrapper.style.display = 'block';
    this.wrapper.style.width = 'max-content';
    this.wrapper.style.padding = '1rem';
  }
}
