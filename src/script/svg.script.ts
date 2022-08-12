import fs from 'fs-extra';
import path from 'path';
import walk from 'walkdir';

(async () => {
  const SPECIAL_CHARS_PATTERN = /[`~!@#$%^&*()|+\=?;:'",<>\{\}\[\]\\\/]/gi;

  const gitIconPath = path.join(__dirname, '../../fluentui-emoji');

  const svgIcons = (
    await walk.async(path.join(gitIconPath, 'assets'), {
      no_recurse: false,
    })
  )
    .filter((p) => p.endsWith('.svg'))
    .map((p) => {
      const name = p
        ?.split('/')
        ?.pop()
        ?.replaceAll('_', '-')
        ?.replace(SPECIAL_CHARS_PATTERN, '');
      return {
        name,
        path: p,
      };
    });

  const iconPath = path.join(__dirname, '../../svg');
  fs.rmSync(iconPath, { recursive: true, force: true });
  await Promise.all(
    svgIcons.map(async (icon) => {
      await fs.copy(icon.path, path.join(iconPath, icon.name));
    }),
  );
})();
