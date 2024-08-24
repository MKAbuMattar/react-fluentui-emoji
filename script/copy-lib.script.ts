import path from 'node:path';
import fs from 'fs-extra';

(async () => {
  const sourceDir = path.join(process.cwd(), 'lib');
  const targetDir = path.join(
    process.cwd(),
    'packages',
    'react-fluentui-emoji',
    'lib',
  );

  fs.ensureDirSync(targetDir);

  await fs.copy(sourceDir, targetDir);
})();
