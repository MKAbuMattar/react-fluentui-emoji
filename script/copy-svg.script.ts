import path from 'node:path';
import fs from 'fs-extra';

(async () => {
  const sourceDir = path.join(process.cwd(), 'private-fluentui-emoji', 'svg');
  const targetDir = path.join(process.cwd(), 'svg');

  fs.ensureDirSync(targetDir);

  await fs.copy(sourceDir, targetDir);
})();
