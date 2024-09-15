import '../../../src/components/onx-button';
import { SnapshotTestCase } from '../../utils.cs/snapshot-test-case';
import '../../../src/components/onx-component';
import { getRandomCaseName } from '../../utils.cs/utils';

export class GivenButtonWithPrimaryFillVariant_WhenRendered_ItShouldDisplayProperly extends SnapshotTestCase {
  constructor() {
    super();
  }

  createElementUnderTest() {
    const button = document.createElement('onx-button');
    button.variant = 'primary-filled';
    button.textContent = 'Primary Filled';
    return button;
  }
}

customElements.define(
  getRandomCaseName(),
  GivenButtonWithPrimaryFillVariant_WhenRendered_ItShouldDisplayProperly
);

export class GivenButtonTypeIsReset_WhenClicked_ItShouldResetForm extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const button = document.createElement('onx-button');
    button.type = 'reset';
    button.textContent = 'Reset';

    const input = document.createElement('input');
    input.type = 'text';

    const form = document.createElement('form');

    form.appendChild(input);
    form.appendChild(button);
    this.appendChild(form);
  }
}

customElements.define(getRandomCaseName(), GivenButtonTypeIsReset_WhenClicked_ItShouldResetForm);

export class GivenButtonTypeIsSubmit_WhenClicked_ItShouldSubmitForm extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const button = document.createElement('onx-button');
    button.textContent = 'Submit';

    const form = document.createElement('form');

    form.addEventListener('submit', event => {
      event.preventDefault();
      form.setAttribute('submitted', '');
    });

    form.appendChild(button);
    this.appendChild(form);
  }
}

customElements.define(getRandomCaseName(), GivenButtonTypeIsSubmit_WhenClicked_ItShouldSubmitForm);
