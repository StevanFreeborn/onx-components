import { Meta, StoryObj } from '@storybook/web-components';
import '../src/icons/onx-icon.js';
import iconMap from '../src/icons/icons/index.js';

const preview: Meta = {
  title: 'Components/onx-icon',
  component: 'onx-icon',
};

type Args = {
  name: string;
};

type Story = StoryObj<Args>;

export const Default: Story = {
  args: {
    name: '',
  },
  argTypes: {
    name: {
      options: Object.keys(iconMap),
      control: { type: 'select' },
      description: 'The icon name',
      table: {
        defaultValue: { summary: '' },
      },
    },
  },
};

export default preview;
