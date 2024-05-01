import dedent from 'ts-dedent';
import type { Task } from '../task';
import { exec } from '../utils/exec';
import { PORT } from './serve';

export const e2eTestsBuild: Task & { port: number } = {
  description: 'Run e2e tests against a sandbox in prod mode',
  dependsOn: ['serve'],
  junit: true,
  port: PORT,
  async ready() {
    return false;
  },
  async run({ codeDir, junitFilename, key }, { dryRun, debug }) {
    if (process.env.DEBUG) {
      // eslint-disable-next-line no-console
      console.log(dedent`
        Running e2e tests in Playwright's ui mode for chromium only (for brevity sake).
        You can change the browser by changing the --project flag in the e2e-tests task file.
      `);
    }

    const playwrightCommand = process.env.DEBUG
      ? 'bun run playwright test --project=chromium --ui'
      : 'bun run playwright test';

    await exec(
      playwrightCommand,
      {
        env: {
          STORYBOOK_URL: `http://localhost:${this.port}`,
          STORYBOOK_TEMPLATE_NAME: key,
          ...(junitFilename && {
            PLAYWRIGHT_JUNIT_OUTPUT_NAME: junitFilename,
          }),
        },
        cwd: codeDir,
      },
      { dryRun, debug }
    );
  },
};
