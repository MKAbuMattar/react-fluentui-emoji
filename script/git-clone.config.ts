import {exec} from 'node:child_process';

const gitClone = (url: string): void => {
  exec(url, (error, stdout, stderr) => {
    if (error) {
      console.error(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.debug(`stderr: ${stderr}`);
      return;
    }
    console.debug(`stdout: ${stdout}`);
  });
};

(() => {
  console.log('Cloning fluentui-emoji...');
  gitClone(
    'git clone --depth=1 git@github.com:MKAbuMattar/public-fluentui-emoji.git',
  );
})();
