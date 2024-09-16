export abstract class SnapshotTestCase extends HTMLElement {
  constructor() {
    super();

    this.style.display = 'block';
    this.style.width = 'max-content';
    this.style.padding = '1rem';
  }
}
