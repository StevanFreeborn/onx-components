import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { OnxButton } from '../src/components/onx-button/component.js';
import '../src/components/onx-button/index.js';

const preview: Meta = {
  title: 'Components/onx-button',
  component: 'onx-button',
};

export const Default: StoryObj = {
  args: {
    variant: '',
  },
  argTypes: {
    variant: {
      options: Object.values(OnxButton.variants),
      control: { type: 'select' },
      description: 'The button variant',
      table: {
        defaultValue: { summary: 'primary-filled' },
      },
    },
  },
  render: ({ variant }) => html`<onx-button .variant="${variant}">Button</onx-button>`,
};

export const PrimaryFilled: StoryObj = {
  ...Default,
  args: { variant: OnxButton.variants.primaryFilled },
};

export const PrimaryFilledSuccess: StoryObj = {
  ...Default,
  args: { variant: OnxButton.variants.primaryFilledSuccess },
};

export default preview;
