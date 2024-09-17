export abstract class SnapshotTestCase extends HTMLElement {
  connectedCallback() {
    this.style.display = 'block';
    this.style.width = 'max-content';
    this.style.padding = '1rem';
  }
}
