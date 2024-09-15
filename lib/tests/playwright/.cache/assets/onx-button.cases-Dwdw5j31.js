import './index-DLT8aWvb.js';
import './component-C9nIFekV.js';

const crypto = {};

class TestCase extends HTMLElement {
  constructor() {
    super();
  }
}
class GivenButtonTypeIsReset_WhenClicked_ItShouldResetForm extends TestCase {
  constructor() {
    super();
  }
  connectedCallback() {
    const button = document.createElement("onx-button");
    button.type = "reset";
    button.textContent = "Reset";
    const input = document.createElement("input");
    input.type = "text";
    const form = document.createElement("form");
    form.appendChild(input);
    form.appendChild(button);
    this.appendChild(form);
  }
  defineCase() {
    customElements.define(
      getRandomCaseName(),
      GivenButtonTypeIsReset_WhenClicked_ItShouldResetForm
    );
  }
}
class GivenButtonTypeIsSubmit_WhenClicked_ItShouldSubmitForm extends TestCase {
  constructor() {
    super();
  }
  connectedCallback() {
    const button = document.createElement("onx-button");
    button.textContent = "Submit";
    const form = document.createElement("form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      form.setAttribute("submitted", "");
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

export { GivenButtonTypeIsReset_WhenClicked_ItShouldResetForm, GivenButtonTypeIsSubmit_WhenClicked_ItShouldSubmitForm };
//# sourceMappingURL=onx-button.cases-Dwdw5j31.js.map
