import fsAsync from 'node:fs/promises';
import fs from 'fs-extra';
import {JSDOM} from 'jsdom';
import {type RecursiveDirectory, recursiveDirectory} from 'recursive-directory';
import svgtojsx from 'svg-to-jsx';

type ObjConfig = {
  name: string;
  fullpath: string;
  filepath: string;
  filename: string;
  dirname: string;
};

const root = process.cwd();

const generateSvgComponent = async (
  rootDir: string,
  outDir: string,
  prefix: string,
  isHighContrast: boolean,
) => {
  const buildDir = `${root}/build/${outDir}`;
  const iconsDir = `${buildDir}/icons`;

  // Ensure the build directory exists
  await fs.ensureDir(buildDir);
  await fs.ensureDir(iconsDir);

  // Remove the existing directory if it exists
  if (await fs.pathExists(iconsDir)) {
    await fs.rm(iconsDir, {recursive: true, force: true});
    await fs.ensureDir(iconsDir);
  }

  const index: [string, string][] = [];
  const objConfig: ObjConfig[] = [];

  const config: RecursiveDirectory = (await recursiveDirectory(
    rootDir,
    true,
  )) as RecursiveDirectory;

  config.forEach((item) => {
    objConfig.push({
      name: item.filename
        .split('-')
        .map((el) => el.charAt(0).toUpperCase() + el.slice(1))
        .join('')
        .replace(/.svg/g, ''),
      fullpath: item.fullpath,
      filepath: item.filepath,
      filename: item.filename,
      dirname: item.dirname,
    });
  });

  await Promise.all(
    objConfig.map(async (entry) => {
      const name = `${entry.name}`;
      const icon = await fsAsync.readFile(entry.fullpath, 'utf8');
      const {document} = new JSDOM(icon).window;

      const dir = `${buildDir}/icons`;
      const reactName = `${prefix}${name}`;

      index.push([reactName, `./icons/${reactName}`]);

      const svg = document.querySelector('svg');
      if (!svg) return; // Skip if no SVG element is found

      svg.removeAttribute('width');
      svg.removeAttribute('height');
      svg.removeAttribute('xmlns:xlink');

      if (isHighContrast) {
        svg.removeAttribute('fill');
        svg.querySelectorAll('*').forEach((element: SVGElement) => {
          element.removeAttribute('fill');
          element.style.removeProperty('fill');
          element.style.removeProperty('fill-rule');
          element.style.removeProperty('fill-opacity');
        });
      }

      const svgTemplate = `const React = require("react");
module.exports = function ${reactName}({size = "1rem", ${
        isHighContrast ? `color = "#212121",` : ''
      } ...props}){
  props = {
    ...props,
    style: {
      ...(props.style ? props.style : {}),
      width: size,
      height: size,${
        isHighContrast
          ? `
      ...(color ? { fill: color } : {} )`
          : ''
      }
    }
  }
  return (${(await svgtojsx(svg.outerHTML)).replace(
    '<svg',
    '<svg {...props} viewBox="0 0 32 32"',
  )});
}`;

      await fsAsync.writeFile(`${dir}/${reactName}.js`, svgTemplate);

      const definitions = `import React from "react";
interface Props extends React.SVGProps<SVGElement> {
  size?: number | string;
}
declare const ${reactName}: React.FunctionComponent<Props>;
export default ${reactName};`;

      await fsAsync.writeFile(`${dir}/${reactName}.d.ts`, definitions);
    }),
  );

  await fsAsync.writeFile(
    `${buildDir}/index.js`,
    // biome-ignore lint/style/useTemplate: <explanation>
    index
      .map(([name, path]) => `const ${name} = require("${path}")`)
      .join(';\n') +
      ';\n' +
      `module.exports = {${index.map(([name]) => name).join(',')}}`,
  );

  await fsAsync.writeFile(
    `${buildDir}/index.d.ts`,
    index
      .map(([name, path]) => `export { default as ${name} } from "${path}"`)
      .join(';\n'),
  );
};

const buildIndex = async (index: [string, string][]) => {
  await fsAsync.writeFile(
    `${root}/build/index.js`,
    // biome-ignore lint/style/useTemplate: <explanation>
    index
      .map(([name, path]) => `const ${name} = require("${path}")`)
      .join(';\n') +
      ';\n' +
      `module.exports = {${index.map(([name]) => name).join(',')}}`,
  );

  await fsAsync.writeFile(
    `${root}/build/index.d.ts`,
    index
      .map(([name, path]) => `export { default as ${name} } from "${path}"`)
      .join(';\n'),
  );
};

(async () => {
  await generateSvgComponent('icons/flat', 'flat', 'IconF', false);
  await generateSvgComponent(
    'icons/high-contrast',
    'high-contrast',
    'IconHC',
    true,
  );
  await generateSvgComponent('icons/modern', 'modern', 'IconM', false);

  const index: [string, string][] = [
    ['Flat', './flat'],
    ['HighContrast', './high-contrast'],
    ['Modern', './modern'],
  ];

  await buildIndex(index);
})();
