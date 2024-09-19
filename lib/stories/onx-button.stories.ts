import type { Meta, StoryObj } from '@storybook/web-components';
import {
  OnxButton,
  OnxButtonSize,
  OnxButtonType,
  OnxButtonVariant,
} from '../src/components/onx-button/component.js';
import '../src/components/onx-button/index.js';
import '../src/icons/index.js';

const preview: Meta = {
  title: 'Components/onx-button',
  component: 'onx-button',
};

export default preview;

type Args = {
  variant: OnxButtonVariant;
  disabled: boolean;
  type: OnxButtonType;
  size: OnxButtonSize;
  slot: string;
};

type Story = StoryObj<Args>;

export const Default: Story = {
  args: {
    variant: OnxButton.variants.primaryFilled,
    disabled: false,
    type: OnxButton.types.submit,
    size: OnxButton.sizes.sm,
    slot: 'Submit',
  },
  argTypes: {
    variant: {
      options: Object.values(OnxButton.variants),
      control: { type: 'select' },
      description: 'The button variant',
      table: {
        defaultValue: { summary: OnxButton.variants.primaryFilled },
      },
    },
    disabled: {
      options: Object.values(OnxButton.variants),
      control: { type: 'boolean' },
      description: 'Whether the button is disabled or not',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    type: {
      options: Object.values(OnxButton.types),
      control: { type: 'select' },
      description: 'The button type',
      table: {
        defaultValue: { summary: OnxButton.types.submit },
      },
    },
    size: {
      options: Object.values(OnxButton.sizes),
      control: { type: 'select' },
      description: 'The button size',
      table: {
        defaultValue: { summary: OnxButton.sizes.sm },
      },
    },
    slot: {
      control: { type: 'text' },
      description: 'The button slot content',
      table: {
        defaultValue: { summary: '' },
      },
    },
  },
  render: ({ variant, disabled, type, size, slot }) => {
    const button = new OnxButton();
    button.variant = variant;
    button.disabled = disabled;
    button.type = type;
    button.size = size;
    button.innerHTML = slot;
    return button;
  },
};

export const PrimaryFilled: Story = {
  ...Default,
  args: {
    variant: OnxButton.variants.primaryFilled,
    slot: /* html */ `<onx-icon name="check-circle" height="12" width="12"></onx-icon>Submit`,
  },
};

export const PrimaryFilledSuccess: Story = {
  ...Default,
  args: {
    variant: OnxButton.variants.primaryFilledSuccess,
    slot: /* html */ `Submit<onx-icon name="check-circle" height="12" width="12"></onx-icon>`,
  },
};

export const PrimaryFilledWarning: Story = {
  ...Default,
  args: {
    variant: OnxButton.variants.primaryFilledWarning,
    slot: /* html */ `<onx-icon name="trash" height="12" width="12"></onx-icon>Submit`,
  },
};

export const SecondarySmallFilled: Story = {
  ...Default,
  args: {
    variant: OnxButton.variants.secondaryFilled,
    size: OnxButton.sizes.sm,
    slot: /* html */ `<onx-icon name="trash" height="12" width="12"></onx-icon>Create New`,
  },
};

export const SecondaryMediumFilled: Story = {
  ...Default,
  args: {
    variant: OnxButton.variants.secondaryFilled,
    size: OnxButton.sizes.md,
    slot: /* html */ `<onx-icon name="add" height="12" width="12"></onx-icon>Add Page<onx-icon name="caret-down" height="12" width="12"></onx-icon>`,
  },
};

export const SecondaryLargeFilled: Story = {
  ...Default,
  args: {
    variant: OnxButton.variants.secondaryFilled,
    size: OnxButton.sizes.lg,
    slot: /* html */ `<onx-icon name="download"></onx-icon>Download All<onx-icon></onx-icon>`,
  },
};

export const SecondarySmallOutlined: Story = {
  ...Default,
  args: {
    variant: OnxButton.variants.secondaryOutlined,
    size: OnxButton.sizes.sm,
    slot: /* html */ `<onx-icon name="create"></onx-icon>Create Page`,
  },
};

export const SecondaryMediumOutlined: Story = {
  ...Default,
  args: {
    variant: OnxButton.variants.secondaryOutlined,
    size: OnxButton.sizes.md,
    slot: /* html */ `<onx-icon name="add" height="12" width="12"></onx-icon>Add Page`,
  },
};

export const SecondaryLargeOutlined: Story = {
  ...Default,
  args: {
    variant: OnxButton.variants.secondaryOutlined,
    size: OnxButton.sizes.lg,
    slot: /* html */ `<onx-icon name="download"></onx-icon>Download All`,
  },
};

export const SecondarySmallOutlinedWarning: Story = {
  ...Default,
  args: {
    variant: OnxButton.variants.secondaryOutlinedWarning,
    size: OnxButton.sizes.sm,
    slot: 'Delete',
  },
};

export const Link: Story = {
  ...Default,
  args: {
    variant: OnxButton.variants.link,
    slot: /* html */ `<onx-icon name="create" height="13" width="13" inline></onx-icon>Add Layout`,
  },
};

export const SubmitForm: Story = {
  ...Default,
  args: {
    type: OnxButton.types.submit,
    slot: 'Submit',
  },
  render: args => {
    const container = document.createElement('div');
    container.innerHTML = /* html */ `
      <form>
        <label for="name">Name:</label>
        <input id="name" name="name" type="text" placeholder="Enter your name" />
        <onx-button type="${args.type}">
          ${args.slot}
        </onx-button>
      </form>
    `;

    const form = container.querySelector('form');

    form?.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(form);
      // eslint-disable-next-line no-alert
      alert(`Hello, ${formData.get('name')}!`);
    });

    return container;
  },
};

export const ResetForm: Story = {
  ...Default,
  args: {
    type: OnxButton.types.reset,
    variant: OnxButton.variants.secondaryOutlinedWarning,
    slot: 'Reset',
  },
  render: args => {
    const container = document.createElement('div');
    container.innerHTML = /* html */ `
      <form>
        <label for="name">Name:</label>
        <input id="name" name="name" type="text" placeholder="Enter your name" />
        <onx-button type="${args.type}" variant="${args.variant}">
          ${args.slot}
        </onx-button>
      </form>
    `;

    const form = container.querySelector('form');

    form?.addEventListener('reset', () => {
      // eslint-disable-next-line no-alert
      alert('Form will now be reset');
    });

    return container;
  },
};
