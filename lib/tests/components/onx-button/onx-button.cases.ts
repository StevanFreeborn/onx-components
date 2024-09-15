import '../../../src/components/onx-button';
import crypto from 'crypto';

abstract class TestCase extends HTMLElement {
  constructor() {
    super();
  }

  abstract defineCase(): void;
}

export class GivenButtonTypeIsReset_WhenClicked_ItShouldResetForm extends TestCase {
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

  defineCase(): void {
    customElements.define(
      getRandomCaseName(),
      GivenButtonTypeIsReset_WhenClicked_ItShouldResetForm
    );
  }
}

export class GivenButtonTypeIsSubmit_WhenClicked_ItShouldSubmitForm extends TestCase {
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

  defineCase() {
    customElements.define(
      getRandomCaseName(),
      GivenButtonTypeIsSubmit_WhenClicked_ItShouldSubmitForm
    );
  }
}

function getRandomCaseName() {
  return `onx-button-case-${crypto.randomUUID()}`;
}
