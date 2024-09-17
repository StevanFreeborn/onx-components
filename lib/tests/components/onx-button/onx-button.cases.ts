import '../../../src/components/onx-button/index.js';
import { SnapshotTestCase } from '../../utils.cs/snapshot-test-case.js';
import { getRandomCaseName } from '../../utils.cs/utils.js';
import OnxButton from '../../../src/components/onx-button/component.js';

export class GivenButtonWithPrimaryFillVariant_WhenRendered_ItShouldDisplayProperly extends SnapshotTestCase {
  connectedCallback() {
    const button = new OnxButton();
    button.variant = 'primary-filled';
    button.textContent = 'Primary Filled';

    this.appendChild(button);
  }
}

customElements.define(
  getRandomCaseName(),
  GivenButtonWithPrimaryFillVariant_WhenRendered_ItShouldDisplayProperly
);

export class GivenDisabledButtonWithPrimaryFillVariant_WhenRendered_ItShouldDisplayProperly extends SnapshotTestCase {
  connectedCallback() {
    const button = new OnxButton();
    button.variant = 'primary-filled';
    button.textContent = 'Primary Filled';
    button.disabled = true;

    this.appendChild(button);
  }
}

customElements.define(
  getRandomCaseName(),
  GivenDisabledButtonWithPrimaryFillVariant_WhenRendered_ItShouldDisplayProperly
);

export class GivenButtonTypeIsReset_WhenClicked_ItShouldResetForm extends HTMLElement {
  connectedCallback() {
    const button = new OnxButton();
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
  connectedCallback() {
    const button = new OnxButton();
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
