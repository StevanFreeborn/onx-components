import { playwrightLauncher } from '@web/test-runner-playwright';

export default /** @type {import("@web/test-runner").TestRunnerConfig} */ ({
  files: 'dist/test/**/*.test.js',
  nodeResolve: {
    exportConditions: ['browser', 'development'],
  },
  browsers: [
    playwrightLauncher({ product: 'chromium' }),
    playwrightLauncher({ product: 'firefox' }),
    playwrightLauncher({ product: 'webkit' }),
  ],
});
