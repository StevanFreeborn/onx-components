import { expect, test as base, MountResult } from '@sand4rt/experimental-ct-web';
import {
  GivenButtonTypeIsReset_WhenClicked_ItShouldResetForm,
  GivenButtonTypeIsSubmit_WhenClicked_ItShouldSubmitForm,
} from './onx-button.cases';
import OnxButton from '../../../src/components/onx-button/component';
import OnxComponent from '../../../src/components/onx-component';

type Fixtures = {
  customMount: (setup: () => OnxComponent) => Promise<{
    wrapper: MountResult<HTMLElement>;
  }>;
};

const test = base.extend<Fixtures>({
  customMount: async ({ mount }, use) =>
    await use(async (setup: () => OnxComponent) => {
      const component = setup();

      class Wrapper extends HTMLElement {
        constructor() {
          super();
        }

        connectedCallback() {
          this.appendChild(component);
        }
      }

      customElements.define('wrapper', Wrapper);

      const wrapper = await mount(Wrapper);

      return { wrapper };
    }),
});

test.describe('OnxButton', () => {
  test('given button variant is primary-filled, when rendered, it should display properly', async ({
    customMount,
    mount,
  }) => {
    const result = await customMount(() => document.createElement('onx-button'));

    await expect(result.wrapper).toHaveText('Primary Filled');
    await expect(result.wrapper).toHaveAttribute('variant', 'primary-filled');
    await expect(result.wrapper).toHaveScreenshot();
  });

  test('given button type is submit, when clicked, it should submit form', async ({ mount }) => {
    const storyContainer = await mount(GivenButtonTypeIsSubmit_WhenClicked_ItShouldSubmitForm);
    const button = storyContainer.getByRole('button', { name: 'Submit' });
    const form = storyContainer.locator('form');

    await button.click();

    await expect(form).toHaveAttribute('submitted');
  });

  test('given button type is reset, when clicked, it should reset form', async ({ mount }) => {
    const storyContainer = await mount(GivenButtonTypeIsReset_WhenClicked_ItShouldResetForm);
    const button = storyContainer.getByRole('button', { name: 'Reset' });
    const input = storyContainer.locator('input');

    await input.fill('Hello World');
    await button.click();

    await expect(input).toHaveValue('');
  });
});
