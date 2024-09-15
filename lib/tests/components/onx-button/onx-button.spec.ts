import { expect, test } from '@sand4rt/experimental-ct-web';
import {
  GivenButtonTypeIsReset_WhenClicked_ItShouldResetForm,
  GivenButtonTypeIsSubmit_WhenClicked_ItShouldSubmitForm,
  GivenButtonWithPrimaryFillVariant_WhenRendered_ItShouldDisplayProperly,
} from './onx-button.cases';

test.describe('OnxButton', () => {
  test('given button variant is primary-filled, when rendered, it should display properly', async ({
    mount,
  }) => {
    const result = await mount(
      GivenButtonWithPrimaryFillVariant_WhenRendered_ItShouldDisplayProperly
    );
    const button = result.locator('onx-button');

    await expect(button).toHaveText('Primary Filled');
    await expect(button).toHaveAttribute('variant', 'primary-filled');
    await expect(result).toHaveScreenshot();
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
