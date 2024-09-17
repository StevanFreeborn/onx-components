import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  stories: ['../dist/src/**/*.mdx', '../dist/src/**/*.stories.js'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@chromatic-com/storybook'],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
};
export default config;
