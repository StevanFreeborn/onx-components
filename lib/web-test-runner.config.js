import { playwrightLauncher } from '@web/test-runner-playwright';
import { visualRegressionPlugin } from '@web/test-runner-visual-regression/plugin';

const filteredLogs = ['Running in dev mode', 'Lit is in dev mode'];

export default /** @type {import("@web/test-runner").TestRunnerConfig} */ ({
  files: 'dist/tests/**/*.spec.js',
  nodeResolve: {
    exportConditions: ['browser', 'development'],
  },
  browsers: [
    playwrightLauncher({ product: 'chromium' }),
    playwrightLauncher({ product: 'firefox' }),
    playwrightLauncher({ product: 'webkit' }),
  ],
  filterBrowserLogs(log) {
    for (const arg of log.args) {
      if (typeof arg === 'string' && filteredLogs.some(l => arg.includes(l))) {
        return false;
      }
    }
    return true;
  },
  coverage: true,
  coverageConfig: {
    report: true,
    reportDir: 'coverage',
    excludes: ['**/node_modules/**', '**/tests/**', '**/stories/**'],
  },
  plugins: [
    visualRegressionPlugin({
      update: process.argv.includes('--update-visual-baseline'),
      saveDiffs: process.argv.includes('--save-visual-diffs'),
      saveFailedTests: process.argv.includes('--save-visual-failed-tests'),
    }),
  ],
});
