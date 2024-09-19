import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  stories: ['../dist/**/*.mdx', '../dist/**/*.stories.js'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@chromatic-com/storybook'],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  viteFinal: config => {
    config.root = process.cwd();
    config.server = {
      ...config.server,
      watch: {
        usePolling: true,
        interval: 100,
      },
    };

    return config;
  },
};

export default config;
