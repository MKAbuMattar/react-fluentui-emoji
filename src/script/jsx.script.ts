import fs from 'fs';
import fsAsync from 'fs/promises';
import { JSDOM } from 'jsdom';
import svgtojsx from 'svg-to-jsx';
import { RecursiveDirectory, recursiveDirectory } from 'recursive-directory';

type ObjConfig = {
  name: string;
  fullpath: string;
  filepath: string;
  filename: string;
  dirname: string;
};

const generateSvgComponent = async (
  rootDir: string,
  outDir: string,
  isHighContrast: boolean,
) => {
  if (fs.existsSync(`${__dirname}/../../build/${outDir}`)) {
    fs.rmSync(`${__dirname}/../../build/${outDir}`, { recursive: true });
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

  await fsAsync.mkdir(`${__dirname}/../../build/${outDir}`);
  await fsAsync.mkdir(`${__dirname}/../../build/${outDir}/icons`);

  await Promise.all(
    objConfig.map(async (entry) => {
      const name = `${entry.name}`;

      const icon = await fsAsync.readFile(
        `${__dirname}/../../${rootDir}/${entry.filename}`,
      );

      const { document } = await new JSDOM(icon).window;

      const dir = `${__dirname}/../../build/${outDir}/icons`;

      const reactName = `Icon${name}`;

      index.push([reactName, `./icons/${reactName}`]);

      const svg = document.getElementsByTagName('svg')[0];
      svg.removeAttribute('width');
      svg.removeAttribute('height');
      svg.removeAttribute('xmlns:xlink');

      if (isHighContrast) {
        svg.removeAttribute('fill');
        const elements = svg.getElementsByTagName('*');
        for (let i = 0; i < elements.length; i++) {
          const element = elements[i] as SVGElement;
          element.removeAttribute('fill');
          element.style.removeProperty('fill');
          element.style.removeProperty('fill-rule');
          element.style.removeProperty('fill-opacity');
        }
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
    '<svg {...props}',
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

      await fsAsync.writeFile(
        `${__dirname}/../../build/${outDir}/index.js`,
        index.map((e) => `const ${e[0]} = require("${e[1]}")`).join(';\n') +
          ';\n' +
          `module.exports = {${index.map((e) => e[0]).join(',')}}`,
      );
      await fsAsync.writeFile(
        `${__dirname}/../../build/${outDir}/index.d.ts`,
        index
          .map((e) => `export { default as ${e[0]} } from "${e[1]}"`)
          .join(';\n'),
      );
    }),
  );
};

const buildIndex = async (index: [string, string][]) => {
  await fsAsync.writeFile(
    `${__dirname}/../../build/index.js`,
    index.map((e) => `const ${e[0]} = require("${e[1]}")`).join(';\n') +
      ';\n' +
      `module.exports = {${index.map((e) => e[0]).join(',')}}`,
  );
  await fsAsync.writeFile(
    `${__dirname}/../../build/index.d.ts`,
    index
      .map((e) => `export { default as ${e[0]} } from "${e[1]}"`)
      .join(';\n'),
  );
};

(async () => {
  await generateSvgComponent(
    'fluentui-emoji/icons/high-contrast',
    'high-contrast',
    true,
  );

  await generateSvgComponent('fluentui-emoji/icons/flat', 'flat', false);

  await generateSvgComponent('fluentui-emoji/icons/modern', 'modern', false);

  const index: [string, string][] = [
    ['HighContrast', './high-contrast'],
    ['Flat', './flat'],
    ['Modern', './modern'],
  ];

  await buildIndex(index);
})();
