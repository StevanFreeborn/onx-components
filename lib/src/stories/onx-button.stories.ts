import type { Meta, StoryObj } from '@storybook/web-components';
import '../../src/components/onx-button/index.js';
import OnxButton, { OnxButtonVariant } from '../../src/components/onx-button/component.js';

const meta: Meta = {
  title: 'onx-button',
  component: 'onx-button',
};

type ArgType = {
  variant: OnxButtonVariant;
};

type Story = StoryObj<ArgType>;

export const PrimaryFilled: Story = {
  args: {
    variant: OnxButton.variants.primaryFilled,
  },
  render: ({ variant }) => `<onx-button variant="${variant}">Primary Filled</onx-button>`,
};

export default meta;
