import { expect, fixture } from '@open-wc/testing';
import { visualDiff } from '@web/test-runner-visual-regression';
import '../../src/components/onx-button/index.js';
import { createScreenshotWrapper } from '../utils/utils.js';

describe('OnxButton', function () {
  it('should pass accessibility audit', async function () {
    const sut = await fixture(/* html */ `<onx-button>Button</onx-button>`);
    await expect(sut).shadowDom.to.be.accessible({
      ignoredRules: ['color-contrast'],
    });
  });

  it('should render primary filled variant by default', async function () {
    const sut = await fixture(createScreenshotWrapper('<onx-button>Button</onx-button>'));
    await visualDiff(sut, 'primary-filled');
  });
});
